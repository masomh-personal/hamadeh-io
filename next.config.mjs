/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: false,
    },
    // ESLint config removed - Next.js 16 no longer supports it
    // Using Biome for linting/formatting instead
    turbopack: {
        root: process.cwd(),
    },
};

export default nextConfig;
