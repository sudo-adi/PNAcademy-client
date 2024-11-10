import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ThemeDataProvider from "@/lib/context/theme-data-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PNAcademy",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <ThemeDataProvider>{children}</ThemeDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
