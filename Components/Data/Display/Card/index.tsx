import { component, createElement, VNode } from "vaderjs";
import { Badge, BadgeProps } from "../Badge";

export type CardProps = {
  title?: string | VNode;
  body?: string | VNode;
  actions?: VNode | VNode[];
  figure?: VNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  style?: "border" | "dash";
  side?: boolean; // card-side
  imageFull?: boolean; // image-full
  center?: boolean; // center content
  className?: string;
};

export const Card = component((props: CardProps) => {
  const {
    title,
    body,
    actions,
    figure,
    size = "md",
    style,
    side,
    imageFull,
    center,
    className,
  } = props;

  const classes = ["card"];
  if (size) classes.push(`card-${size}`);
  if (style === "border") classes.push("card-border");
  if (style === "dash") classes.push("card-dash");
  if (side) classes.push("card-side");
  if (imageFull) classes.push("image-full");
  if (className) classes.push(className);

  const bodyClasses = ["card-body"];
  if (center) bodyClasses.push("items-center", "text-center");

  return createElement(
    "div",
    { className: classes.join(" ") },
    figure ? figure : null,
    createElement(
      "div",
      { className: bodyClasses.join(" ") },
      title ? (typeof title === "string" ? createElement("h2", { className: "card-title" }, title) : title) : null,
      body ? (typeof body === "string" ? createElement("p", {}, body) : body) : null,
      actions ? (Array.isArray(actions) ? actions.map(a => a) : actions) : null
    )
  );
});

// Optional helper for card with badge on title
export type CardWithBadgeProps = CardProps & {
  badges?: BadgeProps[];
};

export const CardWithBadge = component((props: CardWithBadgeProps) => {
  const { badges, title, ...cardProps } = props;

  const titleVNode = createElement(
    "h2",
    { className: "card-title flex items-center gap-2" },
    title,
    badges ? badges.map(b => createElement(Badge, b)) : null
  );

  return createElement(Card, { ...cardProps, title: titleVNode });
});
