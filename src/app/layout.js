import "./globals.css";
import { inter } from "@/components/ui/fonts";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: {
    default: "Philatopia – Explore the World of Stamps",
    template: "%s | Philatopia",
  },
  description:
    "Join Philatopia and share your stamp collection with collectors around the globe.",
  metadataBase: new URL("https://www.philatopia.com"),
  openGraph: {
    title: "Philatopia – Explore the World of Stamps",
    description:
      "Join Philatopia and share your stamp collection with collectors around the globe.",
    url: "https://www.philatopia.com",
    siteName: "Philatopia",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Philatopia Stamp Gallery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Philatopia – Explore the World of Stamps",
    description: "Share and explore stamp collections from around the world.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
