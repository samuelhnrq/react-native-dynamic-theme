import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              React Native Dynamic Theme
            </Heading>
            <p className={styles.heroSubtitle}>
              Bring Material 3 Dynamic Theming to Your React Native Apps
            </p>
            <p className={styles.heroDescription}>
              Seamlessly adapt to your users' system preferences and wallpaper
              colors with Android's Material You design system.
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/getting-started"
              >
                Get Started - 5min ⏱️
              </Link>
              <Link
                className="button button--outline button--lg"
                to="/docs/examples"
              >
                View Examples
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.phoneDemo}>
              <div className={styles.phoneScreen}>
                <div className={styles.colorPalette}>
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: '#006971' }}
                  ></div>
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: '#81D4DD' }}
                  ></div>
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: '#4A6365' }}
                  ></div>
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: '#B1CBCE' }}
                  ></div>
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: '#505E7D' }}
                  ></div>
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: '#B8C6EA' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Material 3 Dynamic Theming for React Native`}
      description="A React Native library for Material 3 dynamic theming with Android's Material You support"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
