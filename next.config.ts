import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.webm": {
        loaders: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "static/media",
              publicPath: "/_next/static/media",
            },
          },
        ],
      },
    },
  },
};

export default nextConfig;
