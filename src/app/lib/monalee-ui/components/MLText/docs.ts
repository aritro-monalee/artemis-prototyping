export const examples = {
  Default: `<MLText>Default text with no variant applied</MLText>`,

  Headings: `<div className="flex flex-col gap-4">
  <MLText variant="h1">Heading 1 - The quick brown fox</MLText>
  <MLText variant="h2">Heading 2 - The quick brown fox</MLText>
  <MLText variant="h3">Heading 3 - The quick brown fox</MLText>
  <MLText variant="h4">Heading 4 - The quick brown fox</MLText>
  <MLText variant="h5">Heading 5 - The quick brown fox</MLText>
  <MLText variant="h6">Heading 6 - The quick brown fox</MLText>
</div>`,

  BodyText: `<div className="flex flex-col gap-6 max-w-2xl">
  <MLText variant="body-lg">
    Large body text for emphasis. Lorem ipsum dolor sit amet.
  </MLText>
  <MLText variant="body">
    Default body text for paragraphs. Lorem ipsum dolor sit amet.
  </MLText>
  <MLText variant="body-sm">
    Small body text for secondary content. Lorem ipsum dolor sit amet.
  </MLText>
</div>`,

  SupportingText: `<div className="flex flex-col gap-6">
  <MLText variant="caption">Caption for images or annotations.</MLText>
  <MLText variant="overline">Category • Metadata</MLText>
  <MLText variant="label">Form field label</MLText>
  <MLText variant="lead">
    A lead paragraph that introduces the main content.
  </MLText>
</div>`,

  SpecialVariants: `<div className="flex flex-col gap-6 max-w-2xl">
  <MLText variant="quote">
    "Design is not just what it looks like. Design is how it works."
  </MLText>
  <MLText variant="body">
    Use the <MLText variant="code">MLText</MLText> component for all typography.
  </MLText>
  <MLText variant="body">
    Press <MLText variant="kbd">⌘</MLText> + <MLText variant="kbd">K</MLText> to open command palette.
  </MLText>
</div>`,

  FontSizes: `<div className="flex flex-col gap-3">
  <MLText size="xxs">xxs (10px) - Extra extra small text</MLText>
  <MLText size="xs">xs (12px) - Extra small text</MLText>
  <MLText size="sm">sm (14px) - Small text</MLText>
  <MLText size="base">base (16px) - Base text</MLText>
  <MLText size="lg">lg (18px) - Large text</MLText>
  <MLText size="xl">xl (20px) - Extra large text</MLText>
  <MLText size="2xl">2xl (24px) - 2x large text</MLText>
</div>`,

  FontWeights: `<div className="flex flex-col gap-2">
  <MLText weight="thin" size="xl">Thin (100)</MLText>
  <MLText weight="light" size="xl">Light (300)</MLText>
  <MLText weight="normal" size="xl">Normal (400)</MLText>
  <MLText weight="medium" size="xl">Medium (500)</MLText>
  <MLText weight="semibold" size="xl">Semibold (600)</MLText>
  <MLText weight="bold" size="xl">Bold (700)</MLText>
</div>`,

  Colors: `<div className="flex flex-col gap-2">
  <MLText color="default">Default - Primary text color</MLText>
  <MLText color="muted">Muted - Secondary, less prominent text</MLText>
  <MLText color="primary">Primary - Brand/accent color</MLText>
  <MLText color="destructive">Destructive - Error or danger states</MLText>
  <MLText color="success">Success - Positive states</MLText>
  <MLText color="warning">Warning - Caution states</MLText>
</div>`,

  Alignment: `<div className="flex flex-col gap-4 max-w-md border border-border rounded-lg p-4">
  <MLText align="left">Left aligned text (default)</MLText>
  <MLText align="center">Center aligned text</MLText>
  <MLText align="right">Right aligned text</MLText>
  <MLText align="justify">Justified text spreads evenly across the container.</MLText>
</div>`,

  FontFamilies: `<div className="flex flex-col gap-3">
  <MLText family="sans" size="lg">Sans-serif (Inter) - Default for UI</MLText>
  <MLText family="serif" size="lg">Serif (Georgia) - For editorial content</MLText>
  <MLText family="mono" size="lg">Monospace (Geist Mono) - For code</MLText>
</div>`,

  Truncation: `<div className="flex flex-col gap-6 max-w-sm">
  <MLText truncate>
    This is a very long text that will be truncated with an ellipsis.
  </MLText>
  <MLText clamp={2}>
    This text will be clamped to 2 lines. Lorem ipsum dolor sit amet...
  </MLText>
</div>`,

  CompositionExample: `<article className="max-w-2xl space-y-6">
  <header className="space-y-2">
    <MLText variant="overline" color="primary">Technology</MLText>
    <MLText variant="h1">Building a Modern UI Component Library</MLText>
    <MLText variant="lead">
      A comprehensive guide to creating consistent, accessible UI components.
    </MLText>
  </header>

  <MLText variant="body">
    Creating a component library is more than just writing reusable code...
  </MLText>

  <MLText variant="quote">"Typography is what language looks like." — Ellen Lupton</MLText>

  <MLText variant="caption" color="muted">Last updated: January 2025</MLText>
</article>`,

  CustomElement: `<div className="flex flex-col gap-4">
  <MLText as="h1" size="3xl" weight="bold">This renders as an h1</MLText>
  <MLText as="p" variant="body">This renders as a paragraph</MLText>
  <MLText as="label" variant="label">This renders as a label element</MLText>
  <MLText as="blockquote" size="lg" color="muted" className="border-l-4 border-border pl-4">
    This renders as a blockquote
  </MLText>
</div>`,

  Playground: `<MLText variant="body" color="default">
  Edit this text and adjust the controls to see different styles
</MLText>`,
};
