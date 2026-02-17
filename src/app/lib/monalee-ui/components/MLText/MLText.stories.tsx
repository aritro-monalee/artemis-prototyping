import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLText } from './MLText';

// ============================================
// Meta
// ============================================

const meta: Meta<typeof MLText> = {
  title: 'Components/MLText',
  component: MLText,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A polymorphic text component for consistent typography across the application. Use this instead of raw HTML elements like h1, p, span, etc.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body',
        'body-lg',
        'body-sm',
        'caption',
        'overline',
        'label',
        'lead',
        'quote',
        'code',
        'kbd',
      ],
      description: 'Semantic variant with preset styling',
    },
    as: {
      control: 'select',
      options: [
        'p',
        'span',
        'div',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'label',
        'code',
        'kbd',
        'blockquote',
      ],
      description: 'HTML element to render',
    },
    size: {
      control: 'select',
      options: [
        'inherit',
        'xxs',
        'xs',
        'sm',
        'base',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        '8xl',
        '9xl',
      ],
      description: 'Font size',
    },
    weight: {
      control: 'select',
      options: [
        'thin',
        'extralight',
        'light',
        'normal',
        'medium',
        'semibold',
        'bold',
        'extrabold',
        'black',
      ],
      description: 'Font weight',
    },
    color: {
      control: 'select',
      options: [
        'default',
        'muted',
        'primary',
        'secondary',
        'accent',
        'destructive',
        'success',
        'warning',
        'info',
        'inherit',
      ],
      description: 'Text color',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    family: {
      control: 'select',
      options: ['sans', 'serif', 'mono'],
      description: 'Font family',
    },
    leading: {
      control: 'select',
      options: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
      description: 'Line height',
    },
    tracking: {
      control: 'select',
      options: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      description: 'Letter spacing',
    },
    decoration: {
      control: 'select',
      options: ['none', 'underline', 'line-through'],
      description: 'Text decoration',
    },
    transform: {
      control: 'select',
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
      description: 'Text transform',
    },
    truncate: {
      control: 'boolean',
      description: 'Truncate text with ellipsis',
    },
    clamp: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 'none'],
      description: 'Line clamp for multi-line truncation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MLText>;

// ============================================
// Stories - Semantic Variants
// ============================================

export const Default: Story = {
  args: {
    children: 'Default text with no variant applied',
  },
};

export const Headings: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <MLText variant="h1">Heading 1 - The quick brown fox</MLText>
      <MLText variant="h2">Heading 2 - The quick brown fox</MLText>
      <MLText variant="h3">Heading 3 - The quick brown fox</MLText>
      <MLText variant="h4">Heading 4 - The quick brown fox</MLText>
      <MLText variant="h5">Heading 5 - The quick brown fox</MLText>
      <MLText variant="h6">Heading 6 - The quick brown fox</MLText>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Heading variants from h1 to h6 with semantic HTML elements and consistent styling.',
      },
    },
  },
};

export const BodyText: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <MLText variant="label" color="muted" className="mb-2">
          body-lg
        </MLText>
        <MLText variant="body-lg">
          Large body text for emphasis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </MLText>
      </div>
      <div>
        <MLText variant="label" color="muted" className="mb-2">
          body (default)
        </MLText>
        <MLText variant="body">
          Default body text for paragraphs. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </MLText>
      </div>
      <div>
        <MLText variant="label" color="muted" className="mb-2">
          body-sm
        </MLText>
        <MLText variant="body-sm">
          Small body text for secondary content. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </MLText>
      </div>
    </div>
  ),
};

export const SupportingText: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <MLText variant="label" color="muted" className="mb-1">
          Caption
        </MLText>
        <MLText variant="caption">
          This is a caption for images, figures, or small annotations.
        </MLText>
      </div>
      <div>
        <MLText variant="label" color="muted" className="mb-1">
          Overline
        </MLText>
        <MLText variant="overline">Category • Metadata</MLText>
      </div>
      <div>
        <MLText variant="label" color="muted" className="mb-1">
          Label
        </MLText>
        <MLText variant="label">Form field label</MLText>
      </div>
      <div>
        <MLText variant="label" color="muted" className="mb-1">
          Lead
        </MLText>
        <MLText variant="lead">
          A lead paragraph that introduces the main content with slightly larger, muted text.
        </MLText>
      </div>
    </div>
  ),
};

export const SpecialVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <MLText variant="label" color="muted" className="mb-2">
          Quote
        </MLText>
        <MLText variant="quote">
          "Design is not just what it looks like and feels like. Design is how it works."
        </MLText>
      </div>
      <div>
        <MLText variant="label" color="muted" className="mb-2">
          Code
        </MLText>
        <MLText variant="body">
          Use the <MLText variant="code">MLText</MLText> component for all typography.
        </MLText>
      </div>
      <div>
        <MLText variant="label" color="muted" className="mb-2">
          Keyboard
        </MLText>
        <MLText variant="body">
          Press <MLText variant="kbd">⌘</MLText> + <MLText variant="kbd">K</MLText> to open the
          command palette.
        </MLText>
      </div>
    </div>
  ),
};

// ============================================
// Stories - Font Sizes
// ============================================

export const FontSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <MLText size="xxs">xxs (10px) - Extra extra small text</MLText>
      <MLText size="xs">xs (12px) - Extra small text</MLText>
      <MLText size="sm">sm (14px) - Small text</MLText>
      <MLText size="base">base (16px) - Base text</MLText>
      <MLText size="lg">lg (18px) - Large text</MLText>
      <MLText size="xl">xl (20px) - Extra large text</MLText>
      <MLText size="2xl">2xl (24px) - 2x large text</MLText>
      <MLText size="3xl">3xl (30px) - 3x large text</MLText>
      <MLText size="4xl">4xl (36px) - 4x large text</MLText>
      <MLText size="5xl">5xl (48px) - 5x large</MLText>
      <MLText size="6xl">6xl (60px) - 6x large</MLText>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All available font sizes from the design system. Use semantic variants when possible.',
      },
    },
  },
};

// ============================================
// Stories - Font Weights
// ============================================

export const FontWeights: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <MLText weight="thin" size="xl">
        Thin (100)
      </MLText>
      <MLText weight="extralight" size="xl">
        Extra Light (200)
      </MLText>
      <MLText weight="light" size="xl">
        Light (300)
      </MLText>
      <MLText weight="normal" size="xl">
        Normal (400)
      </MLText>
      <MLText weight="medium" size="xl">
        Medium (500)
      </MLText>
      <MLText weight="semibold" size="xl">
        Semibold (600)
      </MLText>
      <MLText weight="bold" size="xl">
        Bold (700)
      </MLText>
      <MLText weight="extrabold" size="xl">
        Extra Bold (800)
      </MLText>
      <MLText weight="black" size="xl">
        Black (900)
      </MLText>
    </div>
  ),
};

// ============================================
// Stories - Colors
// ============================================

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <MLText color="default">Default - Primary text color</MLText>
      <MLText color="muted">Muted - Secondary, less prominent text</MLText>
      <MLText color="primary">Primary - Brand/accent color</MLText>
      <MLText color="destructive">Destructive - Error or danger states</MLText>
      <MLText color="success">Success - Positive states</MLText>
      <MLText color="warning">Warning - Caution states</MLText>
      <MLText color="info">Info - Informational states</MLText>
    </div>
  ),
};

// ============================================
// Stories - Text Alignment
// ============================================

export const Alignment: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md border border-base-border rounded-lg p-4">
      <MLText align="left" variant="body">
        Left aligned text (default)
      </MLText>
      <MLText align="center" variant="body">
        Center aligned text
      </MLText>
      <MLText align="right" variant="body">
        Right aligned text
      </MLText>
      <MLText align="justify" variant="body">
        Justified text spreads evenly across the container. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
      </MLText>
    </div>
  ),
};

// ============================================
// Stories - Font Families
// ============================================

export const FontFamilies: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <MLText family="sans" size="lg">
        Sans-serif (Inter) - Default for UI
      </MLText>
      <MLText family="serif" size="lg">
        Serif (Georgia) - For editorial content
      </MLText>
      <MLText family="mono" size="lg">
        Monospace (Geist Mono) - For code
      </MLText>
    </div>
  ),
};

// ============================================
// Stories - Line Height
// ============================================

export const LineHeight: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      {(['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'] as const).map((lead) => (
        <div key={lead} className="border border-base-border rounded-lg p-3">
          <MLText variant="label" color="muted" className="mb-2">
            leading-{lead}
          </MLText>
          <MLText leading={lead}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore.
          </MLText>
        </div>
      ))}
    </div>
  ),
};

// ============================================
// Stories - Letter Spacing
// ============================================

export const LetterSpacing: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <MLText tracking="tighter" size="lg">
        Tighter tracking
      </MLText>
      <MLText tracking="tight" size="lg">
        Tight tracking
      </MLText>
      <MLText tracking="normal" size="lg">
        Normal tracking
      </MLText>
      <MLText tracking="wide" size="lg">
        Wide tracking
      </MLText>
      <MLText tracking="wider" size="lg">
        Wider tracking
      </MLText>
      <MLText tracking="widest" size="lg">
        Widest tracking
      </MLText>
    </div>
  ),
};

// ============================================
// Stories - Text Decoration & Transform
// ============================================

export const DecorationAndTransform: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <MLText variant="label" color="muted" className="mb-2">
          Text Decoration
        </MLText>
        <div className="flex gap-4">
          <MLText decoration="none">No decoration</MLText>
          <MLText decoration="underline">Underlined</MLText>
          <MLText decoration="line-through">Strikethrough</MLText>
        </div>
      </div>
      <div>
        <MLText variant="label" color="muted" className="mb-2">
          Text Transform
        </MLText>
        <div className="flex gap-4">
          <MLText transform="none">Normal Case</MLText>
          <MLText transform="uppercase">uppercase</MLText>
          <MLText transform="lowercase">LOWERCASE</MLText>
          <MLText transform="capitalize">capitalize text</MLText>
        </div>
      </div>
    </div>
  ),
};

// ============================================
// Stories - Truncation
// ============================================

export const Truncation: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <div>
        <MLText variant="label" color="muted" className="mb-2">
          Single line truncate
        </MLText>
        <MLText truncate>
          This is a very long text that will be truncated with an ellipsis when it overflows the
          container width.
        </MLText>
      </div>
      <div>
        <MLText variant="label" color="muted" className="mb-2">
          Line clamp (2 lines)
        </MLText>
        <MLText clamp={2}>
          This text will be clamped to 2 lines. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam.
        </MLText>
      </div>
      <div>
        <MLText variant="label" color="muted" className="mb-2">
          Line clamp (3 lines)
        </MLText>
        <MLText clamp={3}>
          This text will be clamped to 3 lines. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </MLText>
      </div>
    </div>
  ),
};

// ============================================
// Stories - Composition Examples
// ============================================

export const CompositionExample: Story = {
  render: () => (
    <article className="max-w-2xl space-y-6">
      <header className="space-y-2">
        <MLText variant="overline" color="primary">
          Technology
        </MLText>
        <MLText variant="h1">Building a Modern UI Component Library</MLText>
        <MLText variant="lead">
          A comprehensive guide to creating consistent, accessible, and maintainable UI components
          using React and TypeScript.
        </MLText>
      </header>

      <MLText variant="body">
        Creating a component library is more than just writing reusable code. It's about
        establishing a design system that ensures consistency across your application while
        remaining flexible enough to handle diverse use cases.
      </MLText>

      <MLText variant="h2">Why Typography Matters</MLText>

      <MLText variant="body">
        Typography is the foundation of any good design system. The{' '}
        <MLText variant="code">MLText</MLText> component provides a unified API for all text
        rendering, ensuring consistent styling throughout your application.
      </MLText>

      <MLText variant="quote">"Typography is what language looks like." — Ellen Lupton</MLText>

      <MLText variant="h3">Key Features</MLText>

      <MLText variant="body">
        Our text component supports semantic variants for common use cases, explicit size and weight
        controls, and proper HTML semantics. Press <MLText variant="kbd">⌘</MLText> +{' '}
        <MLText variant="kbd">Shift</MLText> + <MLText variant="kbd">T</MLText> to toggle the
        typography inspector.
      </MLText>

      <MLText variant="caption" color="muted">
        Last updated: January 2025
      </MLText>
    </article>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of composing multiple text variants to create a rich article layout.',
      },
    },
  },
};

// ============================================
// Stories - Custom Element
// ============================================

export const CustomElement: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <MLText variant="label" color="muted">
        Using explicit HTML elements:
      </MLText>
      <MLText as="h1" size="3xl" weight="bold">
        This renders as an h1
      </MLText>
      <MLText as="p" variant="body">
        This renders as a paragraph
      </MLText>
      <MLText as="label" variant="label">
        This renders as a label element
      </MLText>
      <MLText
        as="blockquote"
        size="lg"
        color="muted"
        className="border-l-4 border-base-border pl-4"
      >
        This renders as a blockquote
      </MLText>
      <MLText as="time" variant="caption" color="muted">
        This renders as a time element
      </MLText>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Use the `as` prop to render specific HTML elements for proper semantics and accessibility.',
      },
    },
  },
};

// ============================================
// Interactive Playground
// ============================================

export const Playground: Story = {
  args: {
    children: 'Edit this text and adjust the controls to see different styles',
    variant: 'body',
    color: 'default',
  },
};
