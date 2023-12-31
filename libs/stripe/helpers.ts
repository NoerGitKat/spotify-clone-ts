import { Price } from "@/types/global";

export const getURL = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000";

  url = url.includes("http") ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;

  return url;
};

export const postPrice = async ({
  url,
  data
}: {
  url: string;
  data?: { price: Price };
}) => {
  console.log("POST Request:", url, data);

  const res: Response = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error(res.statusText);

  return res.json();
};

export const toDateTime = (seconds: number) => {
  const time = new Date();
  time.setSeconds(seconds);
  return time;
};
