/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    productionBrowserSourceMaps: true,
    generateEtags: true,
    compress: true,
    poweredByHeader: false,
};

module.exports = nextConfig;
