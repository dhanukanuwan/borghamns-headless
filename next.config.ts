import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    'output': 'export',
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
    },
    images: { unoptimized: true }
}

module.exports = nextConfig
