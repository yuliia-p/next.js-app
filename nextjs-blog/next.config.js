// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent 'fs' module from being bundled on the client-side
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
};
