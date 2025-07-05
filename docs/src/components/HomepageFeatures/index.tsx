import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Material You Support',
    icon: '🎨',
    description: (
      <>
        Leverage Android's dynamic theming capabilities for a native feel that
        adapts to user preferences and wallpaper colors automatically.
      </>
    ),
  },
  {
    title: 'Complete Color System',
    icon: '🌈',
    description: (
      <>
        Access the full Material 3 color palette with 25+ semantic color roles,
        complete tonal palettes, and multiple contrast levels.
      </>
    ),
  },
  {
    title: 'Cross Platform Ready',
    icon: '📱',
    description: (
      <>
        Works seamlessly across Android and iOS with proper fallback handling.
        Generate custom themes from any source color.
      </>
    ),
  },
  {
    title: 'TypeScript First',
    icon: '🔧',
    description: (
      <>
        Fully typed interfaces for better development experience with
        IntelliSense support and compile-time error checking.
      </>
    ),
  },
  {
    title: 'Performance Optimized',
    icon: '⚡',
    description: (
      <>
        Built with performance in mind using efficient hooks, memoization, and
        minimal re-renders for smooth user experiences.
      </>
    ),
  },
  {
    title: 'Easy Integration',
    icon: '🚀',
    description: (
      <>
        Simple API design that integrates seamlessly with existing React Native
        apps. Get started with just a few lines of code.
      </>
    ),
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon}>{icon}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <Heading as="h2">Why Choose React Native Dynamic Theme?</Heading>
          <p>
            Everything you need to implement Material 3 dynamic theming in your
            React Native app
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
