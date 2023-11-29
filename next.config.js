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
                hostname: 'practica-inmobiliaria.local'
            }
            ],
        }
    }

module.exports = nextConfig
