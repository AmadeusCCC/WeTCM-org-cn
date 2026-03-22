import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container"> 
        {/* modification start: 标题部分 */}
        
        {/* 1. 中文主标题：应用 .title-font (方正标语体) */}
        <h1 className={clsx('hero__title', 'title-font')}>
          皇家太医院
        </h1>
        
        {/* 2. 拉丁副标题：应用 .subtitle-font (思源宋体) */}
        <p className={clsx('hero__subtitle', 'subtitle-font')}>
          Royal Medical Academy
        </p>
        
        {/* modification end */}

        {/* --- 保留你原有的“建设中”提示 --- */}
        <p style={{ fontSize: '1.8rem', margin: '1rem 0', fontWeight: 'bold' }}>
          本站正在建设中<br />We are under construction
        </p>
        {/* ------------------------------- */}

        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            点此开始
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      // 这里为了SEO，建议还是让浏览器标签页显示中文标题
      title="首页" 
      description="苏州知轶 - Suzhou Zhiyi">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}