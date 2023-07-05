/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ieexjdqyimzmvdbohrxq.supabase.co"
      }
    ]
  }
};

module.exports = nextConfig;
