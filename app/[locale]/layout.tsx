import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/components/theme-provider";
import { getDictionary } from "@/lib/dictionaries";
import { locales } from "@/lib/dictionaries";
import type { Locale } from "@/lib/dictionaries";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_URL = "https://www.caiofochetto.com";

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  const title =
    locale === "pt"
      ? "Caio Fochetto | Creator Economy & Marketing"
      : "Caio Fochetto | Creator Economy & Marketing";

  const description =
    locale === "pt"
      ? "15+ anos conectando marca, cultura e performance atraves de creators e dados."
      : "15+ years connecting brand, culture, and performance through creators and data.";

  return {
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: { "pt-BR": "/pt", "en-US": "/en" },
    },
    title: { default: title, template: `%s | Caio Fochetto` },
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: "Caio Fochetto",
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = saved || (prefersDark ? 'dark' : 'light');
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Caio Fochetto",
              url: SITE_URL,
              jobTitle: "Creator Economy & Performance Marketing Leader",
              knowsAbout: [
                "Creator Economy",
                "Influencer Marketing",
                "Performance Marketing",
                "Digital Strategy",
              ],
              sameAs: ["https://www.linkedin.com/in/caiofochetto/"],
            }),
          }}
        />
        <I18nProvider locale={locale as Locale}>
          <ThemeProvider>{children}</ThemeProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
