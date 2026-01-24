// Kbd.ts
import { component, createElement } from "vaderjs";

export type KbdSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface KbdProps {
  children: any;
  size?: KbdSize;
  className?: string;
}

/**
 * Kbd
 * DaisyUI keyboard key / shortcut component
 */
const Kbd = component(
  ({ children, size = "md", className = "" }: KbdProps) => {
    const sizeClass =
      size === "md" ? "" : `kbd-${size}`;

    return createElement(
      "kbd",
      {
        class: `kbd ${sizeClass} ${className}`.trim(),
      },
      children
    );
  }
);

export default Kbd;
