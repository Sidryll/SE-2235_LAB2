import { Meta, StoryObj } from "@storybook/react";
import MusicPlayer from "../components/music-player"; // Adjust path as needed

const meta: Meta<typeof MusicPlayer> = {
  title: "Components/MusicPlayer",
  component: MusicPlayer,
  argTypes: {
    uri: {
      control: "text",
      description: "URL of the audio file to be played.",
      defaultValue: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    volume: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Volume level of the audio player (0 to 1).",
      defaultValue: 1,
    },
  },
};

export default meta;

type Story = StoryObj<typeof MusicPlayer>;

export const Default: Story = {
  args: {
    uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    volume: 1,
  },
};
