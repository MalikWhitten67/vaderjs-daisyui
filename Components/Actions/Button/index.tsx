import { component, createElement, VNode } from "vaderjs";

export type ButtonProps = {
  color?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  style?: "outline" | "dash" | "soft" | "ghost" | "link";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  modifier?: "wide" | "block" | "square" | "circle";
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  children?: VNode | VNode[] | string;
  ariaLabel?: string;
};

const Button = component<ButtonProps>((props): VNode => {
  const {
    color,
    style,
    size = "md",
    modifier,
    active,
    disabled,
    className,
    onClick,
    children,
    ariaLabel,
    ...rest
  } = props;

  // Build class string
  const classes = ["btn"];
  if (color) classes.push(`btn-${color}`);
  if (style) classes.push(`btn-${style}`);
  if (size) classes.push(`btn-${size}`);
  if (modifier) classes.push(`btn-${modifier}`);
  if (active) classes.push("btn-active");
  if (disabled) classes.push("btn-disabled");
  if (className) classes.push(className);

  // Convert camelCase props to proper DOM attributes
  const domProps: Record<string, any> = {
    class: classes.join(" "),
    onClick: disabled ? undefined : onClick,
    disabled,
    ...rest,
  };

  // Add accessibility attributes with proper names
  if (disabled) domProps["aria-disabled"] = "true";
  if (active) domProps["aria-pressed"] = "true";
  if (ariaLabel) domProps["aria-label"] = ariaLabel;
  

  // Always return a VNode
  return createElement(
    "button",
    domProps,
    children
  );
});

export default Button;