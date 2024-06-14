import type { Metadata } from "next";
import { Space_Grotesk as FontSans } from "next/font/google";
import { Section, Container } from "@/components/craft";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";

import Logo from "@/public/logo.svg";
import Balancer from "react-wrap-balancer";

import "./globals.css";

import { Button } from "@/components/ui/button";
// import { NavMenu } from "@/components/nav/nav-menu";
// import { MobileNav } from "@/components/nav/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";

import Name from "@/public/name.svg";
import Icon from "@/public/icon.svg";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://router.so"),
  title: "Router.so | Form Handling and Lead Routing for Developers",
  description:
    "Router.so is a form handling and lead routing service for developers. It allows you to simply determine schema, generate an endpoint, create a form, and route leads.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

const Nav = ({ className, children, id }: NavProps) => {
  return (
    <nav
      className={cn("sticky z-50 top-0 bg-background", "border-b", className)}
      id={id}
    >
      <div
        id="nav-container"
        className="max-w-5xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
      >
        <Link href="https://app.router.so" className="dark:invert">
          <div className="flex group gap-4 items-center justify-center">
            <Image
              className="group-hover:animate-spin"
              src={Icon}
              width={24}
              height={24}
              alt="Router.so Icon"
            />
            <Image
              className="pb-1"
              src={Name}
              width={148}
              height={24}
              alt="Router.so Wordmark"
            />
          </div>
        </Link>
        {children}
        <div className="flex items-center gap-2">
          {/* <NavMenu /> */}
          <ThemeToggle />
          <Button asChild className="hidden sm:flex">
            <Link href="https://app.router.so">Get Started</Link>
          </Button>
          {/* <MobileNav /> */}
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="not-prose border-t">
      <Section>
        <Container className="grid gap-6">
          <div className="grid gap-6">
            <Link href="/">
              <h3 className="sr-only">brijr/components</h3>
              <Image
                src={Logo}
                alt="Logo"
                width={120}
                height={27.27}
                className="dark:invert hover:opacity-75 transition-all"
              ></Image>
            </Link>
            <p>
              <Balancer>
                We built Router.so to help developers build forms faster and
                capture leads easier.
              </Balancer>
            </p>
            {/* <div className="flex flex-col md:flex-row mb-6 md:mb-0 gap-4 underline underline-offset-4 text-sm text-muted-foreground">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-of-service">Terms of Service</Link>
              <Link href="/cookie-policy">Cookie Policy</Link>
            </div> */}
            <p className="text-muted-foreground">
              © <a href="https://9d8.dev">9d8</a>. All rights reserved.
              2024-present.
            </p>
          </div>
        </Container>
      </Section>
    </footer>
  );
};
