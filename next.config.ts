import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Evita que o Next adote a pasta-pai como raiz por haver outro package-lock.json lá.
  outputFileTracingRoot: __dirname,
  images: {
    // Os PNGs finais ficam em /public/images — nenhum domínio remoto é necessário.
    // Se for usar um CDN, adicione-o aqui em `remotePatterns`.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
