#!/usr/bin/env node
/**
 * README.md自動更新スクリプト
 * プロンプトファイルとコマンド設定から最新の情報を自動生成
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 設定
const PATHS = {
  commands: '.copilot/commands.json',
  prompts: '.github/prompts',
  issueTemplates: '.github/ISSUE_TEMPLATE',
  readme: 'README.md'
};

/**
 * コマンド設定を読み込み
 */
function loadCommands() {
  try {
    const commandsPath = path.resolve(PATHS.commands);
    if (!fs.existsSync(commandsPath)) {
      console.warn('Commands file not found:', commandsPath);
      return {};
    }
    const content = fs.readFileSync(commandsPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error loading commands:', error.message);
    return {};
  }
}

/**
 * プロンプトファイルの詳細を解析
 */
function analyzePromptFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // YAMLフロントマターから説明を抽出
    let description = '';
    let inFrontMatter = false;
    
    for (const line of lines) {
      if (line.trim() === '---') {
        inFrontMatter = !inFrontMatter;
        continue;
      }
      
      if (inFrontMatter && line.startsWith('description:')) {
        description = line.replace('description:', '').trim();
        break;
      }
    }
    
    // 主要機能を抽出（## セクションから）
    const features = [];
    let currentSection = '';
    
    for (const line of lines) {
      if (line.startsWith('## ')) {
        currentSection = line.replace('## ', '').trim();
        if (currentSection.includes('機能') || currentSection.includes('フロー') || currentSection.includes('原則')) {
          features.push(currentSection);
        }
      }
    }
    
    return {
      description,
      features,
      lineCount: lines.length
    };
  } catch (error) {
    console.error(`Error analyzing prompt file ${filePath}:`, error.message);
    return { description: '', features: [], lineCount: 0 };
  }
}

/**
 * Issueテンプレートの情報を収集
 */
function analyzeIssueTemplates() {
  const templatesDir = path.resolve(PATHS.issueTemplates);
  if (!fs.existsSync(templatesDir)) {
    return [];
  }
  
  const templates = [];
  const files = fs.readdirSync(templatesDir).filter(file => file.endsWith('.md'));
  
  for (const file of files) {
    try {
      const filePath = path.join(templatesDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      // YAMLフロントマターから情報を抽出
      let name = '';
      let about = '';
      let inFrontMatter = false;
      
      for (const line of lines) {
        if (line.trim() === '---') {
          inFrontMatter = !inFrontMatter;
          continue;
        }
        
        if (inFrontMatter) {
          if (line.startsWith('name:')) {
            name = line.replace('name:', '').trim().replace(/['"]/g, '');
          } else if (line.startsWith('about:')) {
            about = line.replace('about:', '').trim().replace(/['"]/g, '');
          }
        }
      }
      
      templates.push({
        file: file.replace('.md', ''),
        name,
        about,
        sections: lines.filter(line => line.startsWith('## ')).length
      });
    } catch (error) {
      console.error(`Error analyzing template ${file}:`, error.message);
    }
  }
  
  return templates;
}

/**
 * GitHubの統計情報を取得
 */
function getGitStats() {
  try {
    let commits, lastCommit, contributors;
    
    try {
      commits = execSync('git rev-list --count HEAD 2>/dev/null', { encoding: 'utf8' }).trim();
      commits = parseInt(commits) || 0;
    } catch (error) {
      console.warn('Warning: Could not get commit count:', error.message);
      commits = 0;
    }
    
    try {
      lastCommit = execSync('git log -1 --format="%cd" --date=short 2>/dev/null', { encoding: 'utf8' }).trim();
    } catch (error) {
      console.warn('Warning: Could not get last commit date:', error.message);
      lastCommit = new Date().toISOString().split('T')[0];
    }
    
    try {
      const shortlog = execSync('git shortlog -sn 2>/dev/null', { encoding: 'utf8' }).trim();
      contributors = shortlog ? shortlog.split('\n').length : 1;
    } catch (error) {
      console.warn('Warning: Could not get contributors count:', error.message);
      contributors = 1;
    }
    
    return {
      commits,
      lastCommit,
      contributors
    };
  } catch (error) {
    console.error('Error getting git stats:', error.message);
    return {
      commits: 0,
      lastCommit: new Date().toISOString().split('T')[0],
      contributors: 1
    };
  }
}

/**
 * README.mdのコンテンツを生成
 */
function generateReadmeContent() {
  const commands = loadCommands();
  const gitStats = getGitStats();
  const issueTemplates = analyzeIssueTemplates();
  
  let content = `# Agent Sample

[![GitHub last commit](https://img.shields.io/github/last-commit/h-fukuda-a/agent_sample)](https://github.com/h-fukuda-a/agent_sample/commits)
[![GitHub commits](https://img.shields.io/badge/commits-${gitStats.commits}-blue)](https://github.com/h-fukuda-a/agent_sample/commits)
[![GitHub contributors](https://img.shields.io/badge/contributors-${gitStats.contributors}-orange)](https://github.com/h-fukuda-a/agent_sample/graphs/contributors)

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

`;

  // スラッシュコマンドの詳細を追加
  if (commands.commands) {
    Object.entries(commands.commands).forEach(([command, config]) => {
      const commandName = command.replace('/', '');
      const promptPath = path.resolve(config.prompt);
      
      let promptInfo = { description: config.description, features: [], lineCount: 0 };
      if (fs.existsSync(promptPath)) {
        promptInfo = analyzePromptFile(promptPath);
      }
      
      content += `### \`${command}\` - ${config.description}

${promptInfo.description}

**使用例:**
\`\`\`text
${command} README.mdにインストール手順を追加して
${command} API仕様書を作成
${command} 設定ガイドを更新
\`\`\`

**主な機能:**
`;
      
      if (promptInfo.features.length > 0) {
        promptInfo.features.forEach(feature => {
          content += `- ${feature}\n`;
        });
      } else {
        content += `- ${promptInfo.description}\n- 品質保証とエラーハンドリング\n- 段階的実行ワークフロー\n`;
      }
      
      content += '\n';
    });
  }

  // Issueテンプレートセクションを追加
  if (issueTemplates.length > 0) {
    content += `## 📝 Issueテンプレート

以下のテンプレートを使用して、効率的に課題や要求を報告できます：

| テンプレート | 説明 | セクション数 |
|-------------|------|-------------|
`;

    issueTemplates.forEach(template => {
      content += `| **${template.name}** | ${template.about} | ${template.sections} |\n`;
    });

    content += '\n';
  }

  // プロジェクト構造を追加
  content += `## 🗂️ プロジェクト構造

\`\`\`
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
\`\`\`

## ⚙️ 設定ファイル

- \`.copilot/commands.json\` - スラッシュコマンド定義
- \`.github/prompts/\` - 各コマンドのプロンプトファイル
- \`.github/workflows/\` - 自動化ワークフロー
- \`.vscode/settings.json\` - VS Code設定

## 🤝 Contributing

1. このリポジトリをフォーク
2. 機能ブランチを作成 (\`git checkout -b feature/amazing-feature\`)
3. 変更をコミット (\`git commit -m 'Add amazing feature'\`)
4. ブランチにプッシュ (\`git push origin feature/amazing-feature\`)
5. Pull Requestを作成

## 📊 統計情報

- **最終更新**: ${gitStats.lastCommit}
- **総コミット数**: ${gitStats.commits}
- **コントリビューター数**: ${gitStats.contributors}

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

---

*このREADME.mdは自動生成されています。最終更新: ${new Date().toISOString().split('T')[0]}*
`;

  return content;
}

/**
 * メイン実行関数
 */
function main() {
  try {
    console.log('🔄 README.mdを自動更新中...');
    console.log('📍 作業ディレクトリ:', process.cwd());
    
    // 必要なディレクトリの存在確認
    const requiredPaths = [PATHS.commands, PATHS.prompts, PATHS.issueTemplates];
    for (const checkPath of requiredPaths) {
      if (!fs.existsSync(checkPath)) {
        console.warn(`⚠️ パスが見つかりません: ${checkPath}`);
      } else {
        console.log(`✅ パスを確認: ${checkPath}`);
      }
    }
    
    const newContent = generateReadmeContent();
    
    // 既存のREADME.mdをバックアップ
    if (fs.existsSync(PATHS.readme)) {
      fs.copyFileSync(PATHS.readme, `${PATHS.readme}.backup`);
      console.log('💾 既存のREADME.mdをバックアップしました');
    }
    
    // 新しい内容を書き込み
    fs.writeFileSync(PATHS.readme, newContent, 'utf8');
    
    console.log('✅ README.mdの更新が完了しました');
    console.log(`📊 生成された内容: ${newContent.split('\n').length} 行`);
    
    // バックアップファイルを削除
    if (fs.existsSync(`${PATHS.readme}.backup`)) {
      fs.unlinkSync(`${PATHS.readme}.backup`);
    }
    
  } catch (error) {
    console.error('❌ README.md更新中にエラーが発生しました:', error.message);
    console.error('スタックトレース:', error.stack);
    process.exit(1);
  }
}

// スクリプトが直接実行された場合のみmainを実行
if (require.main === module) {
  main();
}

module.exports = {
  generateReadmeContent,
  loadCommands,
  analyzePromptFile,
  analyzeIssueTemplates
};