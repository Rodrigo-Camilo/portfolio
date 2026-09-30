import "./globals.css";

/** @type {import("next").Metadata} */
export const metadata = {
  title: {
    default: "Rodrigo Camilo — Desenvolvedor Full Stack",
    template: "%s | Rodrigo Camilo",
  },
  description:
    "Portfólio de Rodrigo Camilo Paixão, desenvolvedor Full Stack especializado em React, Next.js, Node.js, TypeScript e Firebase.",
  keywords: [
    "Rodrigo Camilo",
    "Desenvolvedor Full Stack",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Firebase",
  ],
  authors: [{ name: "Rodrigo Camilo Paixão" }],
  creator: "Rodrigo Camilo Paixão",
  robots: { index: true, follow: true },
};

export const viewport = {
  colorScheme: "dark",
  themeColor: "#090b10",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
