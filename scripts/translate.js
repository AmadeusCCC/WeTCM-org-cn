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
3. 【关键规则】翻译后的 title 和 description 的值，必须使用英文双引号 ("") 强行包裹起来，以防止 YAML 解析错误。例如：title: "Translated Title Here"。
4. 只输出翻译后的 Markdown 纯文本，不要包含任何解释性对话，绝对不要把最终结果包裹在 \`\`\`markdown 这样的代码块里。`
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

      let needsTranslation = true;

      // 【核心升级】：引入时间戳增量对比机制
      if (fs.existsSync(targetPath)) {
        // 获取中英文文件的详细状态信息
        const sourceStats = fs.statSync(sourcePath);
        const targetStats = fs.statSync(targetPath);

        // 对比最后修改时间 (mtimeMs)
        if (sourceStats.mtimeMs > targetStats.mtimeMs) {
          console.log(`🔄 检测到中文原稿有更新，准备重新翻译: ${file}`);
        } else {
          console.log(`⏭️  内容无更新，跳过: ${file}`);
          needsTranslation = false;
        }
      } else {
        console.log(`🆕 发现新文件，准备首发翻译: ${file}`);
      }

      // 只有当确认为新文件，或原稿被修改过时，才执行翻译
      if (needsTranslation) {
        const content = fs.readFileSync(sourcePath, 'utf-8');
        const translatedContent = await translateMarkdown(content, file);

        if (translatedContent) {
          fs.writeFileSync(targetPath, translatedContent, 'utf-8');
          console.log(`✅ 成功翻译并更新保存: ${file}`);
        }
      }
    }
  }
  console.log('🎉 所有博客翻译任务完成！');
}

main();