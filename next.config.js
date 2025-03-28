/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        sqlite3: false,
      };
    }
    // Exclude PostgreSQL and other unused dialects
    config.resolve.alias = {
      ...config.resolve.alias,
      'pg-hstore': false,
      'pg': false,
      'mysql2': false,
      'mariadb': false,
      'mssql': false,
    };
    return config;
  },
}

module.exports = nextConfig