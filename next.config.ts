import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
