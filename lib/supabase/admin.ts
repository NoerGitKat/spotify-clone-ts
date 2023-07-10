import { Price, Product } from "@/types/global";
import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { stripe, toDateTime } from "../stripe";

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

const upsertProduct = async ({
  id,
  active,
  name,
  description,
  images,
  metadata
}: Stripe.Product) => {
  const product: Product = {
    id,
    active,
    name,
    description: description || undefined,
    image: images?.[0] || undefined,
    metadata
  };

  const { error } = await supabaseAdmin.from("products").upsert([product]);

  if (error) throw new Error(error.message);

  console.log(`Product upserted: ${id}`);
};

const upsertPrice = async ({
  id,
  product,
  active,
  currency,
  nickname,
  type,
  unit_amount,
  recurring,
  metadata
}: Stripe.Price) => {
  const price: Price = {
    id,
    product_id: typeof product === "string" ? product : "",
    active,
    currency,
    description: nickname || undefined,
    type,
    unit_amount: unit_amount || undefined,
    interval: recurring?.interval,
    interval_count: recurring?.interval_count,
    trial_period_days: recurring?.trial_period_days,
    metadata: metadata
  };

  const { error } = await supabaseAdmin.from("prices").upsert([price]);

  if (error) throw new Error(error.message);

  console.log(`Price upserted: ${id}`);
};

const createOrRetrieveCustomer = async ({
  email,
  uuid
}: {
  email: string;
  uuid: string;
}) => {
  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("stripe_customer_id")
    .eq("id", uuid)
    .single();

  if (error || !data?.stripe_customer_id) {
    const customerData: { metadata: { supabaseUUID: string }; email?: string } =
      {
        metadata: {
          supabaseUUID: uuid
        }
      };

    if (email) customerData.email = email;

    const customer = await stripe.customers.create(customerData);

    const { error: supabaseError } = await supabaseAdmin
      .from("customers")
      .insert([{ id: uuid, stripe_customer_id: customer.id }]);

    if (supabaseError) throw new Error(supabaseError.message);

    console.log(`New customer upserted for ${uuid}.`);
    return customer.id;
  }

  return data.stripe_customer_id;
};

const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  // TODO: check this assertion
  const customer = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return false;
  //@ts-ignore
  await stripe.customers.update(customer, { name, phone, address });

  try {
    const { error } = await supabaseAdmin
      .from("users")
      .update({
        billing_address: { ...address },
        payment_method: { ...payment_method[payment_method.type] }
      })
      .eq("id", uuid);

    if (error) throw new Error(error.message);
  } catch (error) {
    console.log(`In copyBillingDetailsToCustomer: ${error}`);
  }
};

const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  // Get customer's UUID from mapping table.
  const { data: customerData, error: customerError } = await supabaseAdmin
    .from("customers")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();

  if (customerError) throw new Error(customerError.message);
  if (!customerData) throw new Error("No customer data!");

  const { id: uuid } = customerData;

  const subscription: Stripe.Response<Stripe.Subscription> =
    await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["default_payment_method"]
    });
  // Upsert the latest status of the subscription object.
  const subscriptionData: Database["public"]["Tables"]["subscriptions"]["Insert"] =
    {
      id: subscription.id,
      user_id: uuid,
      metadata: subscription.metadata,
      // @ts-ignore
      status: subscription.status,
      price_id: subscription.items.data[0].price.id,
      //TODO check quantity on subscription
      // @ts-ignore
      quantity: subscription.quantity,
      cancel_at_period_end: subscription.cancel_at_period_end,
      cancel_at: subscription.cancel_at
        ? toDateTime(subscription.cancel_at).toISOString()
        : null,
      canceled_at: subscription.canceled_at
        ? toDateTime(subscription.canceled_at).toISOString()
        : null,
      current_period_start: toDateTime(
        subscription.current_period_start
      ).toISOString(),
      current_period_end: toDateTime(
        subscription.current_period_end
      ).toISOString(),
      created: toDateTime(subscription.created).toISOString(),
      ended_at: subscription.ended_at
        ? toDateTime(subscription.ended_at).toISOString()
        : null,
      trial_start: subscription.trial_start
        ? toDateTime(subscription.trial_start).toISOString()
        : null,
      trial_end: subscription.trial_end
        ? toDateTime(subscription.trial_end).toISOString()
        : null
    };

  const { error } = await supabaseAdmin
    .from("subscriptions")
    .upsert([subscriptionData]);
  if (error) throw error;
  console.log(
    `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
  );

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid)
    //@ts-ignore
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod
    );
};

export {
  upsertProduct,
  upsertPrice,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange
};
