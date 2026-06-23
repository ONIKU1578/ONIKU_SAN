import type { Metadata } from 'next';
import './globals.css';

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
      <body>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <footer className="border-t bg-card/50 backdrop-blur-sm py-12">
            <div className="container">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="font-semibold text-foreground mb-2">B_Hall</p>
                  <p className="text-sm text-muted-foreground">
                    バックオフィス業務を設計・運用・改善する外部管理部サービス
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-sm text-muted-foreground">運営：株式会社Backlly</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    © 2024 株式会社Backlly. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
