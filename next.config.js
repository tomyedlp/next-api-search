/** @type {import('next').NextConfig} */
const nextConfig = {
        reactStrictMode: false,
        images: {
            remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.rawg.io',
            },
            {
                protocol: 'http',
                hostname: process.env.WP_IMAGES_URL
            }
            ],
        }
    }

module.exports = nextConfig
