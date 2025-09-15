import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oyana — Turn Watch Data Into Watch Time",
  description:
    "Oyana analyzes YouTube retention and delivers editor-ready, time-stamped fixes to boost watch time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
