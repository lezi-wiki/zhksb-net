const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    productionBrowserSourceMaps: true,
    images: {
        domains: ["img.shields.io"],
    },
};

module.exports = nextConfig;
