# Agent Sample

This is a sample repository for AI agent development.

## Getting Started

This repository contains sample code and configurations for working with AI agents.

## 利用可能なスラッシュコマンド

このリポジトリには、開発効率を向上させるための専用スラッシュコマンドが用意されています。

### `/docs-update` - ドキュメント更新コマンド

ドキュメントの更新・作成を自動化します。

**使用例:**
```text
/docs-update README.mdにインストール手順を追加して
/docs-update API仕様書を作成
/docs-update 設定ガイドを更新
```

**主な機能:**
- 既存ドキュメントの構造を保持した更新
- マークダウン形式の標準に準拠
- 適切なコミットメッセージの生成
- 品質チェック機能

### `/issue` - GitHub Issue作成コマンド

GitHub Issue作成を専門的に支援します。

**使用例:**
```text
/issue ログインでエラーが発生する
/issue 新しい検索機能を追加したい
```

### `/pr` - PR作成コマンド

PR作成ワークフローを自動化します。

**使用例:**
```text
/pr 変更をPRにまとめて
```

## 設定ファイル

- `.copilot/commands.json` - スラッシュコマンド定義
- `.github/prompts/` - 各コマンドのプロンプトファイル
- `.vscode/settings.json` - VS Code設定
