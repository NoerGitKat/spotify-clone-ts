"use client";

import { Button, Header } from "@/components";
import { useAccount, useSubscribeStore, useUser } from "@/hooks";

export default async function Account(): Promise<JSX.Element> {
  const { redirectToCustomerPortal } = useAccount();
  const { onOpen } = useSubscribeStore();
  const { subscription } = useUser();

  return (
    <main className="bg-neutral-900 rounded-lg h-full w-full overflow-hdden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <section className="flex flex-col md:flex-row items-center gap-x-5">
          <h1 className="text-white text-3xl font-semibold">Account</h1>
        </section>
      </Header>
      <section className="mb-7 px-6">
        {!subscription ? (
          <aside className="flex flex-col gap-y-4">
            <p>No active plan.</p>
            <Button onClick={onOpen} className="w-[300px]">
              Subscribe
            </Button>
          </aside>
        ) : (
          <aside className="flex flex-col gap-y-4">
            <p>
              You are currently on the
              <b>
                {
                  // @ts-ignore
                  subscription?.prices?.products?.name
                }
              </b>
              plan.
            </p>
            <Button onClick={redirectToCustomerPortal} className="w-[300px]">
              Open customer portal
            </Button>
          </aside>
        )}
      </section>
    </main>
  );
}
