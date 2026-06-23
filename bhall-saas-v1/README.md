# B_Hall v1 - 外部管理部サービス

バックオフィス業務を「設計・運用・改善」する外部管理部サービスのv1実装です。

✨ **最新版**: プレミアムUIデザインを実装しました

## 🚀 1クリックデプロイ（推奨）

以下のボタンをクリックするだけで、ウェブ上で動くB_Hallが完成します：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ONIKU1578/ONIKU_SAN/tree/claude/build-bhall-saas-v1-LEDtJ&project-name=bhall-v1&root-directory=bhall-saas-v1)

**またはこのURLを開く：**
```
https://vercel.com/new/clone?repository-url=https://github.com/ONIKU1578/ONIKU_SAN/tree/claude/build-bhall-saas-v1-LEDtJ&project-name=bhall-v1&root-directory=bhall-saas-v1
```

### デプロイ手順（超簡単）

1. 上のボタンまたはURLをクリック
2. 「Continue with GitHub」でログイン
3. 青い「Deploy」ボタンをクリック
4. 約2分待つ → **完成！URLが表示されます**

**デプロイ後は自動更新！**
- このリポジトリに変更をpushすると、自動的に再デプロイされます

---

## 🎯 特徴

- **責任分界の明確化**: 判断・確定・提出は顧客または士業が行う設計
- **マルチテナント**: 完全なテナント分離（company_id）
- **チケット管理**: 依頼からチェックリスト、完了までの一元管理
- **監査ログ**: すべての重要操作を記録
- **RBAC**: 8つの固定ロールによる権限制御

## 🔑 テストアカウント

デプロイしたサイトで以下のアカウントを使ってログインできます：

| ロール | メール | パスワード | 説明 |
|--------|--------|-----------|------|
| 顧客（オーナー） | owner@example.com | password123 | 会社の管理者 |
| 運営 | operator@backlly.com | password123 | Backlly運営スタッフ |
| 士業 | professional@example.com | password123 | 税理士・社労士等 |

## 📱 デモフロー

デプロイしたサイトで試してください：

1. **ログイン**: `owner@example.com` / `password123`
2. **チケット作成**: 「新しいチケットを作成」から依頼を作成
3. **ダッシュボード**: 進行状況を確認
4. **責任分界のデモ**: 判断要の項目は運営側で完了不可（ダミーデータに含まれています）

---

## 💻 ローカル開発

### 環境構築

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

---

## 🛠 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイル**: Tailwind CSS
- **状態管理**: Zustand
- **フォーム**: React Hook Form + Zod
- **データベース**: メモリストレージ（v1）→ PostgreSQL対応可能

---

## ⚖️ 責任分界（最重要機能）

チェックリストアイテムに `requiresJudgement: boolean` フラグを実装：

- **requiresJudgement = false**: 運営側でも完了可能（定型業務）
- **requiresJudgement = true**: 判断要の項目（運営側では完了不可）

判断要の項目は以下のロールのみが承認可能：
- `client_owner`（顧客オーナー）
- `professional`（士業）
- `admin`（管理者）

この制約は以下で強制されます：
- `lib/rbac.ts` の `canCompleteChecklistItem()` 関数
- APIレベルでのチェック
- UI上でのグレーアウト＋説明表示

---

## 📊 実装済み機能

✅ 認証（メール＋パスワード、OAuth/マジックリンクスタブ）
✅ チケット管理（作成・一覧）
✅ ダッシュボード
✅ マルチテナント（テナント完全分離）
✅ RBAC（8つの固定ロール）
✅ 監査ログ・行動ログ
✅ レスポンシブデザイン
✅ Vercelワンクリックデプロイ対応

---

## 🎨 ロール体系（変更禁止）

以下の8つのロールが固定で実装されています：

- `public`: 一般ユーザー
- `client_owner`: 顧客（オーナー）
- `client_member`: 顧客（メンバー）
- `backlly_operator`: Backlly Operator（運営）
- `backlly_leader`: Backlly Leader（運営リーダー）
- `admin`: 管理者
- `partner`: パートナー
- `professional`: 士業（プロフェッショナル）

---

## 📂 プロジェクト構造

```
bhall-saas-v1/
├── app/              # Next.js App Router
│   ├── page.tsx      # LP
│   ├── layout.tsx    # ルートレイアウト
│   ├── auth/         # 認証ページ
│   ├── dashboard/    # ダッシュボード
│   ├── tickets/      # チケット管理
│   └── api/          # APIルート
├── lib/              # ビジネスロジック
│   ├── types.ts      # 型定義
│   ├── constants.ts  # 定数
│   ├── auth.ts       # 認証
│   ├── rbac.ts       # 権限制御（責任分界）
│   ├── db.ts         # データベース（メモリ）
│   └── audit-log.ts  # ログシステム
├── store/            # Zustand状態管理
└── components/       # UIコンポーネント
```

---

## 🔧 本番環境への移行

### データベース

現在はメモリストレージ。以下のように差し替え可能：

```typescript
// lib/db.ts を PostgreSQL に差し替え
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
```

### 認証

```typescript
// lib/auth.ts を NextAuth.js に差し替え
import NextAuth from 'next-auth';
```

### 環境変数（Vercelで設定）

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
STRIPE_API_KEY=...
```

---

## 📄 ライセンス

© 2024 株式会社Backlly. All rights reserved.

---

## 🆘 サポート

- デプロイでわからないことがあれば Issue を作成してください
- テストアカウントでログインできない場合は、ブラウザのキャッシュをクリアしてください
