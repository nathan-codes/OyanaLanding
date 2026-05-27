import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're on the list | Oyana",
  description:
    "Thanks for requesting early access. We'll reach out when your invite is ready.",
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
