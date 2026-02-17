import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  MLAspectRatio as AspectRatio,
  type MLAspectRatioProps as AspectRatioProps,
  type MLAspectRatioValue as AspectRatioValue,
} from './index';

const meta: Meta<AspectRatioProps> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
  },
  argTypes: {
    ratio: {
      control: 'select',
      options: [
        '1:1',
        '4:3',
        '3:4',
        '5:4',
        '4:5',
        '3:2',
        '2:3',
        '16:10',
        '10:16',
        '16:9',
        '9:16',
        '2:1',
        '1:2',
        '1.618:1',
        '1:1.618',
        '21:9',
        '9:21',
      ],
      description: 'The aspect ratio to use',
    },
  },
};

export default meta;
type Story = StoryObj<AspectRatioProps>;

const ImageExample = () => (
  <img
    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
    alt="Photo by Drew Beamer"
    className="h-full w-full rounded-md object-cover"
  />
);

export const Default: Story = {
  render: (args) => (
    <div className="w-[450px]">
      <AspectRatio {...args} className="bg-base-muted rounded-md">
        <ImageExample />
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: '16:9',
  },
};

export const Square: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <AspectRatio {...args} className="bg-base-muted rounded-md">
        <ImageExample />
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: '1:1',
  },
};

export const Portrait: Story = {
  render: (args) => (
    <div className="w-[200px]">
      <AspectRatio {...args} className="bg-base-muted rounded-md">
        <ImageExample />
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: '3:4',
  },
};

export const Cinematic: Story = {
  render: (args) => (
    <div className="w-[500px]">
      <AspectRatio {...args} className="bg-base-muted rounded-md">
        <ImageExample />
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: '21:9',
  },
};

export const GoldenRatio: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <AspectRatio {...args} className="bg-base-muted rounded-md">
        <ImageExample />
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: '1.618:1',
  },
};

export const AllRatios: Story = {
  render: () => {
    const ratios: AspectRatioValue[] = [
      '1:1',
      '4:3',
      '3:4',
      '5:4',
      '4:5',
      '3:2',
      '2:3',
      '16:10',
      '10:16',
      '16:9',
      '9:16',
      '2:1',
      '1:2',
      '1.618:1',
      '1:1.618',
      '21:9',
      '9:21',
    ];

    return (
      <div className="grid grid-cols-4 gap-4 w-[800px]">
        {ratios.map((ratio) => (
          <div key={ratio} className="flex flex-col gap-2">
            <span className="text-xs text-base-muted-foreground font-mono">{ratio}</span>
            <AspectRatio
              ratio={ratio}
              className="bg-base-muted rounded-md border border-base-border"
            >
              <div className="flex items-center justify-center h-full w-full text-sm text-base-muted-foreground">
                {ratio}
              </div>
            </AspectRatio>
          </div>
        ))}
      </div>
    );
  },
};

export const WithPlaceholder: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <AspectRatio {...args} className="bg-base-muted rounded-md">
        <div className="flex items-center justify-center h-full w-full">
          <span className="text-base-muted-foreground">16:9 Placeholder</span>
        </div>
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: '16:9',
  },
};

export const WithVideo: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <AspectRatio {...args} className="bg-black rounded-md">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Video"
          className="h-full w-full rounded-md"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: '16:9',
  },
};
