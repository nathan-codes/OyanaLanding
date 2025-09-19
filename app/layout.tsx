import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

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
        <Toaster
          position="top-right"
          expand={true}
          richColors={true}
          closeButton={true}
          className="z-[9999]"
          toastOptions={{
            style: {
              background: "#09090b",
              color: "#ffffff",
              border: "1px solid #27272a",
            },
            success: {
              style: {
                background: "#09090b",
                color: "#a3e635",
                border: "1px solid #a3e635",
              },
            },
            error: {
              style: {
                background: "#09090b",
                color: "#ef4444",
                border: "1px solid #ef4444",
              },
            },
            loading: {
              style: {
                background: "#09090b",
                color: "#a3e635",
                border: "1px solid #a3e635",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
