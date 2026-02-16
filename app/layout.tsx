import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Caio Fochetto - Creator Economy & Marketing de Influência",
  description: "VP de Marketing de Influência e Conteúdo. Especialista em estratégias de creator economy e influencer marketing com foco em performance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
