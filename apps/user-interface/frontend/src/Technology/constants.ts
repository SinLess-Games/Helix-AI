import { CardProps } from '@helix/ui'

export const InfrastructureCards: CardProps[] = [
  {
    title: 'Infrastructure',
    description: 'Infrastructure as Code',
    listItems: [
      { text: 'Terraform', href: 'https://www.terraform.io/' },
      { text: 'Pulumi', href: 'https://www.pulumi.com/' },
      {
        text: 'CloudFormation',
        href: 'https://aws.amazon.com/cloudformation/',
      },
    ],
    image: 'https://cdn.sinlessgamesllc.com/Helix-AI/images/Infrastructure.svg',
    link: '/infrastructure',
    buttonText: 'Learn More',
  },
]

export const DevelopmetCards: CardProps[] = [
  {
    title: 'Development',
    description: 'Modern development workflows',
    listItems: [
      { text: 'Git & GitHub', href: 'https://github.com/' },
      { text: 'VS Code', href: 'https://code.visualstudio.com/' },
      { text: 'Node.js', href: 'https://nodejs.org/' },
    ],
    image: 'https://cdn.sinlessgamesllc.com/Helix-AI/images/Development.svg',
    link: '/development',
    buttonText: 'Learn More',
  },
]

export const ProgrammingLanguagesCards: CardProps[] = [
  {
    title: 'Programming Languages',
    description: 'Languages we love',
    listItems: [
      { text: 'TypeScript', href: 'https://www.typescriptlang.org/' },
      { text: 'Python', href: 'https://www.python.org/' },
      { text: 'Go', href: 'https://golang.org/' },
    ],
    image:
      'https://cdn.sinlessgamesllc.com/Helix-AI/images/ProgrammingLanguages.svg',
    link: '/programming-languages',
    buttonText: 'Learn More',
  },
]

export const FrameworksCards: CardProps[] = [
  {
    title: 'Frameworks',
    description: 'UI & backend frameworks',
    listItems: [
      { text: 'React', href: 'https://reactjs.org/' },
      { text: 'Next.js', href: 'https://nextjs.org/' },
      { text: 'Express', href: 'https://expressjs.com/' },
    ],
    image: 'https://cdn.sinlessgamesllc.com/Helix-AI/images/Frameworks.svg',
    link: '/frameworks',
    buttonText: 'Learn More',
  },
]

export const ToolsCards: CardProps[] = [
  {
    title: 'Tools',
    description: 'Essential developer tools',
    listItems: [
      { text: 'Docker', href: 'https://www.docker.com/' },
      { text: 'Postman', href: 'https://www.postman.com/' },
      { text: 'Webpack', href: 'https://webpack.js.org/' },
    ],
    image: 'https://cdn.sinlessgamesllc.com/Helix-AI/images/Tools.svg',
    link: '/tools',
    buttonText: 'Learn More',
  },
]

export const DataStorageCards: CardProps[] = [
  {
    title: 'Data Storage',
    description: 'Databases & caches',
    listItems: [
      { text: 'PostgreSQL', href: 'https://www.postgresql.org/' },
      { text: 'MongoDB', href: 'https://www.mongodb.com/' },
      { text: 'Redis', href: 'https://redis.io/' },
    ],
    image: 'https://cdn.sinlessgamesllc.com/Helix-AI/images/DataStorage.svg',
    link: '/data-storage',
    buttonText: 'Learn More',
  },
]

export const AIToolsCards: CardProps[] = [
  {
    title: 'AI Tools',
    description: 'Cutting‑edge AI platforms',
    listItems: [
      { text: 'OpenAI', href: 'https://openai.com/' },
      { text: 'Hugging Face', href: 'https://huggingface.co/' },
      { text: 'TensorFlow', href: 'https://www.tensorflow.org/' },
    ],
    image: 'https://cdn.sinlessgamesllc.com/Helix-AI/images/AITools.svg',
    link: '/ai-tools',
    buttonText: 'Learn More',
  },
]
