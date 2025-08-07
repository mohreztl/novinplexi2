
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import withBundleAnalyzer from "@next/bundle-analyzer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pedantic-rubin-qm8c7f3qt.storage.c2.liara.space",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "nikoodecor.storage.c2.liara.space",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
   
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  webpack: (config) => {
    config.resolve.alias["@"] = resolve(__dirname);
    config.resolve.alias["@/utils"] = resolve(__dirname, "utils");
    config.resolve.alias["@/utils/models"] = resolve(
      __dirname,
      "utils",
      "models"
    );
    return config;
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);