/** @type {import('next').NextConfig} */


// next.config.mjs
export default {
    async rewrites() {
      return [
        {
          source: '/api/:path*',  // Proxy API requests
          destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,  // Your backend URL
        },
      ];
    },
  };
  