import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

/**
 * Layout raíz: idioma español (público objetivo: familiares y voluntarios
 * de la catástrofe del terremoto de Venezuela 2026).
 */
export const metadata: Metadata = {
  title: "Reencuentro — personas desaparecidas y encontradas",
  description:
    "Base de datos universal y pública de personas desaparecidas y encontradas tras el terremoto de Venezuela de junio de 2026. Busca, reporta y reencuentra.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
