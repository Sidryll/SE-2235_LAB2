import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Header from "../components/header"; // Adjust the path if needed

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

// Random Bar
export const WithBar: Story = {
  render: () => (
    <div style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
      <Header />
    </div>
  ),
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

// Header in default position
export const FixedPosition: Story = {
  render: () => (
    <div style={{ position: "relative", height: "150vh" }}>
      <Header />
    </div>
  ),
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

// Header w/ extra padding
export const PaddedHeader: Story = {
  render: () => (
    <div style={{ padding: "40px" }}>
      <Header />
    </div>
  ),
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

// Header in small container
export const SmallContainer: Story = {
  render: () => (
    <div style={{ width: "50%", margin: "auto" }}>
      <Header />
    </div>
  ),
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
