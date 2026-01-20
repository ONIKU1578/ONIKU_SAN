# B_Hall v1 - 外部管理部サービス

バックオフィス業務を「設計・運用・改善」する外部管理部サービスのv1実装です。

## 特徴

- **責任分界の明確化**: 判断・確定・提出は顧客または士業が行う設計
- **マルチテナント**: 完全なテナント分離
- **チケット管理**: 依頼からチェックリスト、完了までの一元管理
- **監査ログ**: すべての重要操作を記録

## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (状態管理)
- React Hook Form + Zod (フォーム・バリデーション)

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで http://localhost:3000 にアクセス

## テストアカウント

- 顧客: owner@example.com / password123
- 運営: operator@backlly.com / password123
- 士業: professional@example.com / password123

## ディレクトリ構造

```
bhall-saas-v1/
├── app/              # Next.js App Router
├── components/       # Reactコンポーネント
├── lib/              # ビジネスロジック
├── store/            # Zustand ストア
└── styles/           # グローバルCSS
```

## ロール体系（変更禁止）

- `public`: 一般ユーザー
- `client_owner`: 顧客（オーナー）
- `client_member`: 顧客（メンバー）
- `backlly_operator`: Backlly Operator（運営）
- `backlly_leader`: Backlly Leader（運営リーダー）
- `admin`: 管理者
- `partner`: パートナー
- `professional`: 士業（プロフェッショナル）

## 責任分界（最重要）

チェックリストアイテムに `requiresJudgement` フラグがある場合、
運営側（backlly_operator/backlly_leader）は完了にできません。
顧客（client_owner）または士業（professional）のみが承認可能です。

## ライセンス

© 2024 株式会社Backlly. All rights reserved.
