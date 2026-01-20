# B_Hall v1 - 外部管理部サービス

バックオフィス業務を「設計・運用・改善」する外部管理部サービスのv1実装です。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ONIKU1578/ONIKU_SAN/tree/claude/build-bhall-saas-v1-LEDtJ&project-name=bhall-v1&repository-name=bhall-v1&root-directory=bhall-saas-v1)

## 🎯 特徴

- **責任分界の明確化**: 判断・確定・提出は顧客または士業が行う設計
- **マルチテナント**: 完全なテナント分離（company_id）
- **チケット管理**: 依頼からチェックリスト、完了までの一元管理
- **監査ログ**: すべての重要操作を記録
- **RBAC**: 8つの固定ロールによる権限制御

## 🚀 クイックスタート

### ローカル環境で起動

```bash
cd bhall-saas-v1
npm install
npm run dev
```

ブラウザで http://localhost:3000 にアクセス

### プロダクションビルド

```bash
npm run build
npm run start
```

## 🔑 テストアカウント

| ロール | メール | パスワード | 説明 |
|--------|--------|-----------|------|
| 顧客（オーナー） | owner@example.com | password123 | 会社の管理者 |
| 運営 | operator@backlly.com | password123 | Backlly運営スタッフ |
| 士業 | professional@example.com | password123 | 税理士・社労士等 |

## 📱 デモフロー

1. **ログイン**: テストアカウントでログイン
2. **チケット作成**: 「新しいチケットを作成」から依頼を作成
3. **ダッシュボード**: 進行状況を確認
4. **責任分界**: 判断要の項目は運営側で完了不可（実装済み）

## 🛠 技術スタック

- Next.js 14 (App Router) / TypeScript / Tailwind CSS
- Zustand / React Hook Form + Zod
- メモリストレージ（v1）/ PostgreSQL対応可能

## ⚖️ 責任分界（最重要機能）

チェックリストアイテムに `requiresJudgement: boolean` フラグを実装：

- **requiresJudgement = false**: 運営側でも完了可能（定型業務）
- **requiresJudgement = true**: 判断要の項目（運営側では完了不可）

判断要の項目は以下のロールのみが承認可能：
- `client_owner`（顧客オーナー）
- `professional`（士業）
- `admin`（管理者）

## 📊 実装済み機能

✅ 認証（メール＋パスワード、OAuth/マジックリンクスタブ）
✅ チケット管理（作成・一覧）
✅ ダッシュボード
✅ マルチテナント（テナント完全分離）
✅ RBAC（8つの固定ロール）
✅ 監査ログ・行動ログ
✅ レスポンシブデザイン

## 🎨 ロール体系（変更禁止）

- `public`, `client_owner`, `client_member`
- `backlly_operator`, `backlly_leader`, `admin`
- `partner`, `professional`

## 📄 ライセンス

© 2024 株式会社Backlly. All rights reserved.
