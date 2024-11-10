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
      <head>
        {
          // process.env.NEXT_ENV === "prod"
          true && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
              // Disable right click
              document.addEventListener('contextmenu', (e) => e.preventDefault());

              // Disable keyboard shortcuts
              document.addEventListener('keydown', (e) => {
                // Prevent F12
                if (e.key === 'F12' || e.keyCode === 123) {
                  e.preventDefault();
                  return false;
                }

                // Windows: Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
                if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
                  e.preventDefault();
                  return false;
                }

                // Windows: Prevent Ctrl+U
                if (e.ctrlKey && (e.key === 'U' || e.keyCode === 85)) {
                  e.preventDefault();
                  return false;
                }

                // Mac: Prevent Command+Option+I, Command+Option+J, Command+Option+C
                if ((e.metaKey || e.cmdKey) && e.altKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
                  e.preventDefault();
                  return false;
                }

                // Mac: Prevent Command+Option+U
                if ((e.metaKey || e.cmdKey) && e.altKey && (e.key === 'U' || e.keyCode === 85)) {
                  e.preventDefault();
                  return false;
                }

                // Mac: Prevent Command+Shift+C
                if ((e.metaKey || e.cmdKey) && e.shiftKey && (e.key === 'C' || e.keyCode === 67)) {
                  e.preventDefault();
                  return false;
                }

                // Additional Mac shortcuts prevention
                if ((e.metaKey || e.cmdKey) && (
                  e.key === 'S' ||     // Prevent Command+S
                  e.key === 'P' ||     // Prevent Command+P
                  e.key === 'K' ||     // Prevent Command+K
                  e.key === 'A' ||     // Prevent Command+A
                  e.keyCode === 83 ||  // S
                  e.keyCode === 80 ||  // P
                  e.keyCode === 75 ||  // K
                  e.keyCode === 65     // A
                )) {
                  e.preventDefault();
                  return false;
                }

                // Prevent most Function keys
                if (e.key.match(/^F\d+$/) && e.key !== 'F5') {
                  e.preventDefault();
                  return false;
                }
              });

              // Additional prevention for DevTools
              document.addEventListener('keypress', function(e) {
                if ((e.metaKey || e.cmdKey) && e.altKey && (e.key === 'j' || e.key === 'J' || e.keyCode === 74)) {
                  e.preventDefault();
                  return false;
                }
              });

              // Disable drag and drop
              document.addEventListener('dragstart', (e) => e.preventDefault());
              document.addEventListener('drop', (e) => e.preventDefault());

              // Disable text selection
              document.addEventListener('selectstart', (e) => e.preventDefault());

              // Additional DevTools detection and prevention
              setInterval(function(){
                const devtools = /./;
                devtools.toString = function() {
                  this.opened = true;
                }
                console.log('%c', devtools);
              }, 1000);

              // Disable save page
              document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.keyCode === 83)) {
                  e.preventDefault();
                  return false;
                }
              });

              // Additional prevention for all variants
              window.addEventListener('keydown', function(e) {
                if (
                  (e.metaKey && e.altKey) ||
                  (e.ctrlKey && e.shiftKey)
                ) {
                  e.preventDefault();
                  return false;
                }
              }, true);
            `,
              }}
            />
          )
        }
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeDataProvider>
            {children}
            <Toaster />
          </ThemeDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
