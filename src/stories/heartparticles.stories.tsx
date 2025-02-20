import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import HeartParticlesText from "../components/heart-particles-text";

const meta: Meta<typeof HeartParticlesText> = {
  title: "Components/HeartParticlesText",
  component: HeartParticlesText,
};

export default meta;
type Story = StoryObj<typeof HeartParticlesText>;

// Default Story
export const Default: Story = {};

// With a Pink Bar
export const Withbar: Story = {
  render: () => (
    <div style={{ backgroundColor: "#ffe6e6", padding: "20px" }}>
      <HeartParticlesText />
    </div>
  ),
};

// Smaller container
export const SmallerText: Story = {
  render: () => (
    <div style={{ transform: "scale(0.8)", width: "80%", margin: "auto" }}>
      <HeartParticlesText />
    </div>
  ),
};

// Larger container
export const LargerText: Story = {
  render: () => (
    <div style={{ transform: "scale(1.2)", width: "120%", margin: "auto" }}>
      <HeartParticlesText />
    </div>
  ),
};


