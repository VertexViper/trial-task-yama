/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                // Add other Node modules here if necessary
            };
        }
        return config;
    },
};

export default nextConfig;
