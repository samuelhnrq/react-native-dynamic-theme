import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'getting-started',
      label: 'Getting Started',
    },
    {
      type: 'doc',
      id: 'api',
      label: 'API Reference',
    },
    {
      type: 'doc',
      id: 'examples',
      label: 'Examples',
    },
    {
      type: 'doc',
      id: 'advanced-usage',
      label: 'Advanced Usage',
    },
    {
      type: 'doc',
      id: 'color-system',
      label: 'Color System',
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        {
          type: 'doc',
          id: 'guides/troubleshooting',
          label: 'Troubleshooting',
        },
      ],
    },
  ],
};

export default sidebars;
