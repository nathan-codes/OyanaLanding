import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Oyana — Turn Watch Data Into Watch Time",
  description:
    "Oyana analyzes YouTube retention and delivers editor-ready, time-stamped fixes to boost watch time.",
  icons: {
    icon: "/images/OyanaFinalLogo.svg",
    shortcut: "/images/OyanaFinalLogo.svg",
    apple: "/images/OyanaFinalLogo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Privacy-friendly analytics by Plausible */}
        <script
          async
          src="https://plausible.io/js/pa-26--rQWFQ8pTcu1Y08z3t.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
              plausible.init()
            `,
          }}
        />
      </head>
      <body className="bg-black text-white antialiased overflow-x-hidden">
        {children}
        <Toaster
          position="top-right"
          expand={true}
          richColors={true}
          closeButton={true}
          className="z-[9999]"
          toastOptions={{
            style: {
              background: "#0b0f14",
              color: "#ffffff",
              border: "1px solid rgba(0,151,117,0.35)",
            },
          }}
        />
      </body>
    </html>
  );
}
