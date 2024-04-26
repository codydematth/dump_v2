/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/db3oikvrl/image/upload/**',
      },
    ],
  },
};

export default nextConfig;
