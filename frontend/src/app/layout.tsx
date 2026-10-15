import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans,
  Playfair_Display,
  Inter,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppHeader } from "@/components/layout/app-header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppFooter } from "@/components/layout/app-footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { FloatingSupport } from "@/components/layout/floating-support";

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Honor of kings - wiki",
  description: "hok wikipedia and functional matchups",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        playfairDisplayHeading.variable,
      )}
    >
      <body className="hok-page">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="hok-theme"
          disableTransitionOnChange
        >
          <AnimatedBackground />

          <TooltipProvider>
            <AppHeader />

            <main className="hok-page__main">{children}</main>

            <AppFooter />
            <FloatingSupport href="https://www.facebook.com/ynugi/" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
