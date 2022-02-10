const isProd = process.env.NODE_ENV === "production";
const STATIC_URL = "https://zhksb-assets.s.ahdark.com";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    assetPrefix: isProd ? STATIC_URL : "",
    swcMinify: true,
};

module.exports = nextConfig;
