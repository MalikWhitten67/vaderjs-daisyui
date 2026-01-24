import { component, createElement, VNode } from "vaderjs";

export type BadgeProps = {
  children?: string | VNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  style?: "soft" | "outline" | "dash" | "ghost";
  icon?: VNode; // optional SVG icon
  className?: string;
};

export const Badge = component((props: BadgeProps) => {
  const { children, size = "md", color = "neutral", style, icon, className } = props;

  const classes = ["badge"];
  if (size) classes.push(`badge-${size}`);
  if (color) classes.push(`badge-${color}`);
  if (style) classes.push(`badge-${style}`);
  if (className) classes.push(className);

  return createElement(
    "span",
    { className: classes.join(" ") },
    icon ? createElement("span", { className: "badge-icon mr-1" }, icon) : null,
    children
  );
});

export type BadgeButtonProps = {
  label: string | VNode;
  badge?: BadgeProps;
  className?: string;
};

export const BadgeButton = component((props: BadgeButtonProps) => {
  const { label, badge, className } = props;
  const btnClasses = ["btn"];
  if (className) btnClasses.push(className);

  return createElement(
    "button",
    { className: btnClasses.join(" ") },
    label,
    badge ? createElement(Badge, badge) : null
  );
});
