import Header from "@/components/header";
import { spaceGrotesk } from "@/lib/fonts";
import { metadata } from "@/lib/metadata";
import Providers from "@/providers";
import "./globals.css";

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className}`}>
        <Providers>
          <div className="min-h-screen bg-background">
            <div className="w-full ~min-[20rem]/2xl:~max-w-[20rem]/[96rem] mx-auto px-4 py-4">
              <Header />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
