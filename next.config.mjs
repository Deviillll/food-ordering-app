/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     domains: ["images.unsplash.com", "res.cloudinary.com", "placehold.co"],
    // },
    // Remove the line since there are no remote patterns to specify
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            
          },
          {
            protocol: 'https',
            hostname: 'placehold.co',
            port: '',
            
          },
        ],
      },
      eslint: {
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
