// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '皇家太医院',
  tagline: 'WeTCM',
  favicon: 'img/pic_logo_1333.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://wetcm.org.cn',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'cnzhq', // Usually your GitHub org/user name.
  projectName: 'WeTCM-org-cn', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en', 'zh-Hant'], // 加入 zh-Hant (繁体中文)
    localeConfigs: {
      'zh-Hans': {
        htmlLang: 'zh-Hans',
        
      },
      'zh-Hant': {
        htmlLang: 'zh-Hant',
        path: 'zh-Hant', // 繁体中文路径
      },
      'en': {
        htmlLang: 'en',
        path: 'en', // 英文路径
      },
    },
  },

  scripts: [
    {
      src: '/js/lang-router.js',
      async: false, // 保证在页面渲染前尽早执行
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: '所有文章',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: '皇家太医院',
        
        logo: {
          alt: 'My Site Logo',
          src: 'img/pic_logo_1333.png',
        },
        
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '指南',
          },

          {to: '/blog', label: '博客', position: 'left'},
          {
            to: '/time',      // 对应 src/pages/about.md 的文件名
            label: 'UTC时间',  // 导航栏上显示的文字，您可以随意修改
            position: 'left',  // 放左边
          },

          {
          href: 'https://wiki.wetcm.org.cn',
         label: '百科',   // 可以换成你想要的文字
         position: 'left',
          },

          {
        type: 'localeDropdown',
        position: 'right', // 放在右侧
          },

          {
            href: 'https://www.njucm.edu.cn',
            label: '友情链接',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文献',
            items: [
              {
                label: '文档',
                to: '/docs/intro',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
          {
            title: '关于我们',
            items: [
              {
                label: '链接1',
                href: 'https://www.example.com/',
              },
              {
                label: '链接2',
                href: 'https://www.example.com/',
              },
              {
                label: '链接3',
                href: 'https://www.example.com/',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '时间校对',
                to: '/time',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/',
              },
            ],
          },
        ],
        
        copyright: 
          `Copyright © ${new Date().getFullYear()} WeTCM
          <br>

          <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" title="这是一个CC BY-SA 4.0协议的标志" text-decoration: none;>
            <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-sa.svg" alt="知识共享署名-相同方式共享" width="132" height="46.5" style="margin-top: 10px;" text-decoration: none;>
          </a>
          <br>

          本站的全部文字在
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank"rel="noopener noreferrer" style="color: inherit; text-decoration: none;">
            CC BY-SA 4.0
          </a>
          协议之条款下提供，附加条款亦可能应用<br>

          本站不提供任何治疗内容，如有不适请咨询<a href="https://zgcx.nhc.gov.cn/doctor" target="_blank"rel="noopener noreferrer" style="color: inherit; text-decoration: none;">您的医师
          </a>
          <br>

          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">
            苏ICP备2024061225号-2
          </a>
          <img src="/img/Police.svg" alt="公安备案标志" style="width:18px;height:18px;margin-right:2px;margin-left:8px;vertical-align: -3px"/>
          <a href="https://beian.mps.gov.cn/#/query/webSearch?code=32050902103224" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">
            苏公网安备32050902103224号
          </a>
          <br>

          Powered by
          <a href="https://docusaurus.io/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">
            Docusaurus
          </a>
            `,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
    // 这是twemoji的客户端模块配置
      clientModules: [
    './src/clientModules/twemoji.ts',
  ],
};

export default config;
