import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexFlow",
  description: "Workflow builder application using Reactflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <header className="flex-none w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Navbar />
            </header>

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
              {children}
            </main>

            <footer className="flex-none w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
              <Footer />
            </footer>
          </div>

          <Toaster />
        </ThemeProvider>      </body>
    </html>
  );
}
