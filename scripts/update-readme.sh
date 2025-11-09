#!/bin/bash

# README.md手動更新スクリプト
# 使用方法: ./scripts/update-readme.sh

set -e

echo "🔄 README.mdを手動更新中..."

# Node.jsの存在確認
if ! command -v node &> /dev/null; then
    echo "❌ Node.jsが見つかりません。Node.jsをインストールしてください。"
    exit 1
fi

# 更新スクリプトの実行
node .github/scripts/update-readme.js

# 変更があるかチェック
if git diff --quiet README.md; then
    echo "📄 README.mdに変更はありませんでした。"
else
    echo "✅ README.mdが更新されました。"
    echo ""
    echo "変更内容を確認:"
    git diff --no-index README.md.backup README.md || true
    
    echo ""
    echo "変更をコミットしますか? (y/N)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        git add README.md
        git commit -m "docs(README): manual update from prompts and templates

- Updated documentation from latest configurations
- Synchronized slash commands and templates
- Manual update requested"
        echo "✅ 変更がコミットされました。"
    else
        echo "💭 変更はコミットされませんでした。"
    fi
    
    # バックアップファイルを削除
    rm -f README.md.backup
fi

echo "🎉 README.md更新プロセスが完了しました。"