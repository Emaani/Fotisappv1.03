/** @type {import('next').NextConfig} */


// next.config.mjs
export default {
    async rewrites() {
      return [
        {
          source: '/api/auth/login',  // Proxy API requests
          destination: `${process.env.NEXT_PUBLIC_API_URL}/:http://localhost:3000/api*`,  // Your backend URL
        },
      ];
    },
  };
  
