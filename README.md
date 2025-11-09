# Agent Sample

[![GitHub last commit](https://img.shields.io/github/last-commit/h-fukuda-a/agent_sample)](https://github.com/h-fukuda-a/agent_sample/commits)
[![GitHub commits](https://img.shields.io/badge/commits-13-blue)](https://github.com/h-fukuda-a/agent_sample/commits)
[![GitHub contributors](https://img.shields.io/badge/contributors-1-orange)](https://github.com/h-fukuda-a/agent_sample/graphs/contributors)

AIエージェント開発のためのサンプルリポジトリです。効率的な開発ワークフローとドキュメント管理のためのツールとテンプレートを提供します。

## 🚀 Getting Started

このリポジトリには、AIエージェントとの作業効率を向上させるサンプルコードと設定が含まれています。

### 主な特徴

- **📝 スラッシュコマンド**: 専門化されたプロンプトによる効率的な作業
- **🛠️ Issueテンプレート**: 構造化されたバグレポートと機能要求
- **⚡ 自動化ワークフロー**: GitHub Actionsによる自動更新
- **🎯 品質保証**: Markdownlint準拠とプロンプトエンジニアリング

## 📋 利用可能なスラッシュコマンド

このリポジトリには、開発効率を向上させるための専用スラッシュコマンドが用意されています。

### `/docs-update` - ドキュメントの更新・作成を自動化

ドキュメントの更新・作成を自動化し、適切な形式で文書を更新する

**使用例:**
```text
/docs-update README.mdにインストール手順を追加して
/docs-update API仕様書を作成
/docs-update 設定ガイドを更新
```

**主な機能:**
- コア原則
- 実行フロー

### `/issue-create` - GitHub Issue作成の専門支援

GitHub MCP経由でIssueを自動作成する

**使用例:**
```text
/issue-create README.mdにインストール手順を追加して
/issue-create API仕様書を作成
/issue-create 設定ガイドを更新
```

**主な機能:**
- 実行フロー
- 🎯 機能の概要

### `/pr-create` - PR作成ワークフローの自動化

Gitワークフローを自動化し、適切なブランチ作成、コミット、PRを一括で作成する

**使用例:**
```text
/pr-create README.mdにインストール手順を追加して
/pr-create API仕様書を作成
/pr-create 設定ガイドを更新
```

**主な機能:**
- 重要な原則
- 実行フロー

## 📝 Issueテンプレート

以下のテンプレートを使用して、効率的に課題や要求を報告できます：

| テンプレート | 説明 | セクション数 |
|-------------|------|-------------|
| **🐛 バグレポート** | バグや問題を報告する | 11 |
| **✨ 機能要求** | 新機能や改善を提案する | 9 |
| **🎯 プロンプト改善** | AIプロンプトの品質向上や最適化を提案する | 8 |
| **❓ 質問・サポート** | 使い方や技術的な質問をする | 8 |

## 🗂️ プロジェクト構造

```
agent_sample/
├── .copilot/
│   └── commands.json          # スラッシュコマンド定義
├── .github/
│   ├── ISSUE_TEMPLATE/        # Issueテンプレート
│   ├── prompts/               # プロンプトファイル
│   ├── workflows/             # GitHub Actions
│   └── agents/                # エージェント設定
├── .vscode/
│   └── settings.json          # VS Code設定
└── README.md                  # このファイル
```

## ⚙️ 設定ファイル

- `.copilot/commands.json` - スラッシュコマンド定義
- `.github/prompts/` - 各コマンドのプロンプトファイル
- `.github/workflows/` - 自動化ワークフロー
- `.vscode/settings.json` - VS Code設定

## 🤝 Contributing

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## 📊 統計情報

- **最終更新**: 2025-11-09
- **総コミット数**: 13
- **コントリビューター数**: 1

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

---

*このREADME.mdは自動生成されています。最終更新: 2025-11-09*
