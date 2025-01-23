import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
    },
    images: { unoptimized: true },
    staticPageGenerationTimeout: 1000,
}

module.exports = nextConfig
