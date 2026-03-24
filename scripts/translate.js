require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

// 初始化 DeepSeek 客户端 (利用 OpenAI SDK 兼容特性)
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com', // 指向 DeepSeek
  apiKey: process.env.DEEPSEEK_API_KEY,
});

// 核心配置：定义源目录和目标目录
const TARGET_LANG = 'en'; // 你也可以改成 'zh-Hant'
const SOURCE_DIR = path.join(__dirname, '../blog'); // 这里以翻译 blog 为例
const TARGET_DIR = path.join(__dirname, `../i18n/${TARGET_LANG}/docusaurus-plugin-content-blog`);

// 确保目标文件夹存在
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// 核心翻译函数
async function translateMarkdown(content, filename) {
  console.log(`🚀 正在呼叫 DeepSeek 翻译: ${filename} ...`);
  try {
    const response = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: `你是一个专业的翻译专家。请将以下 Markdown 内容翻译成英文。
严格遵守以下规则：
1. 保持 Markdown 格式完全不变（包括代码块、加粗、链接、图片语法等）。
2. 如果包含顶部的 YAML Front Matter (--- 包围的部分)，只翻译 title 和 description 的值，绝不能修改键名 (如 tags, slug, date 等)。
3. 只输出翻译后的 Markdown 纯文本，不要包含任何解释性对话，不要把内容包裹在 markdown 代码块语法里。`
        },
        {
          role: 'user',
          content: content
        }
      ],
      temperature: 0.1, // 降低温度，保证翻译的稳定性和格式的严谨性
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error(`❌ 翻译 ${filename} 失败:`, error.message);
    return null;
  }
}

// 遍历并处理文件
async function main() {
  const files = fs.readdirSync(SOURCE_DIR);
  
  for (const file of files) {
    if (file.endsWith('.md') || file.endsWith('.mdx')) {
      const sourcePath = path.join(SOURCE_DIR, file);
      const targetPath = path.join(TARGET_DIR, file);

      // 如果翻译好的文件已经存在，跳过（节省 API 费用）
      if (fs.existsSync(targetPath)) {
        console.log(`⏭️  已存在，跳过: ${file}`);
        continue;
      }

      const content = fs.readFileSync(sourcePath, 'utf-8');
      const translatedContent = await translateMarkdown(content, file);

      if (translatedContent) {
        fs.writeFileSync(targetPath, translatedContent, 'utf-8');
        console.log(`✅ 成功翻译并保存: ${file}`);
      }
    }
  }
  console.log('🎉 所有博客翻译任务完成！');
}

main();