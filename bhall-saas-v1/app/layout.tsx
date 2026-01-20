import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'B_Hall - 外部管理部サービス',
  description: 'バックオフィス業務を設計・運用・改善する外部管理部サービス',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <footer className="border-t bg-background py-6">
            <div className="container text-center text-sm text-muted-foreground">
              <p>運営：株式会社Backlly</p>
              <p className="mt-2">© 2024 株式会社Backlly. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
