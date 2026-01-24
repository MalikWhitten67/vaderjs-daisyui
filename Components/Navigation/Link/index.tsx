import { component, createElement, VNode } from "vaderjs";

export type LinkProps = {
  href?: string;
  children: VNode | VNode[] | string;
  color?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  hover?: boolean; // Only show underline on hover
  underline?: boolean; // Force underline (default is true for link class)
  className?: string;
  onClick?: (e: MouseEvent) => void;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  disabled?: boolean;
  external?: boolean; // Add external link icon
  icon?: VNode | string; // Add icon before text
  iconAfter?: VNode | string; // Add icon after text
  noUnderline?: boolean; // Remove underline completely
  active?: boolean; // Active state
  block?: boolean; // Display as block
  size?: "xs" | "sm" | "md" | "lg" | "xl"; // Text size
};

 export const Link = component((props: LinkProps) => {
  const {
    href,
    children,
    color,
    hover = false,
    className = "",
    onClick,
    external = false,
    ...rest
  } = props;

  // Build link classes
  const linkClasses = [
    "link",
    color ? `link-${color}` : "",
    hover ? "link-hover" : "",
    className,
  ].filter(Boolean).join(" ");

  // Handle external links
  const linkRel = external ? "noopener noreferrer" : undefined;
  const linkTarget = external ? "_blank" : undefined;

  const commonProps = {
    className: linkClasses,
    onClick,
    target: linkTarget,
    rel: linkRel,
    ...rest,
  };

  if (href) {
    return createElement("a", { href, ...commonProps }, children);
  }

  // If no href but has onClick, render as button
  if (onClick) {
    return createElement("button", { type: "button", ...commonProps }, children);
  }

  // Otherwise render as span
  return createElement("span", commonProps, children);
});
 

// Pre-configured link types
export const LinkPresets = {
  Primary: (props: Omit<LinkProps, "color">) => createElement(Link, { color: "primary", ...props }),
  Secondary: (props: Omit<LinkProps, "color">) => createElement(Link, { color: "secondary", ...props }),
  Accent: (props: Omit<LinkProps, "color">) => createElement(Link, { color: "accent", ...props }),
  Success: (props: Omit<LinkProps, "color">) => createElement(Link, { color: "success", ...props }),
  Error: (props: Omit<LinkProps, "color">) => createElement(Link, { color: "error", ...props }),
  External: (props: Omit<LinkProps, "external">) => createElement(Link, { external: true, ...props }),
  ButtonLike: (props: LinkProps) => createElement(
    Link,
    {
      className: "btn btn-ghost btn-sm",
      noUnderline: true,
      ...props,
    }
  ),
};

export default Link;