import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import DodgyButtons from "../components/dodgy-button";
import { within, userEvent } from "@storybook/testing-library";
import { toast } from "sonner";

const meta: Meta<typeof DodgyButtons> = {
  title: "Components/DodgyButtons",
  component: DodgyButtons,
  parameters: {
    actions: { argTypesRegex: "^on.*" }, // Automatically logs events
  },
};

export default meta;
type Story = StoryObj<typeof DodgyButtons>;

// Default Story
export const Default: Story = {
  args: {
    onYesClick: () => toast.success("You clicked Yes! 🎉"),
    onNoClick: () => toast.warning("You clicked No! 😆"),
  },
};

// Story with interactions using play function
export const ClickYesButton: Story = {
  args: {
    onYesClick: () => toast.success("You clicked Yes! 🎉"),
    onNoClick: () => toast.warning("You clicked No! 😆"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /yes/i }));
  },
};

export const ClickNoButton: Story = {
  args: {
    onYesClick: () => toast.success("You clicked Yes! 🎉"),
    onNoClick: () => toast.warning("You clicked No! 😆"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /no/i }));
  },
};
