import { component, createElement, VNode } from "vaderjs";

export type AvatarProps = {
  src?: string;
  size?: string; // w-8, w-12, w-16, w-24, etc.
  rounded?: "none" | "sm" | "md" | "xl" | "full";
  mask?: string; // mask-heart, mask-squircle, mask-hexagon-2
  ring?: string; // ring-primary, ring-secondary, etc.
  ringOffset?: string; // ring-offset-base-100, etc.
  online?: boolean;
  offline?: boolean;
  placeholder?: string;
  className?: string;
};

export type AvatarGroupProps = {
  children: VNode[];
  counter?: number; // show "+N" on last avatar
  space?: string; // spacing e.g. -space-x-6
  className?: string;
};

export const Avatar = component((props: AvatarProps) => {
  const {
    src,
    size = "w-12",
    rounded = "full",
    mask,
    ring,
    ringOffset,
    online,
    offline,
    placeholder,
    className,
  } = props;

  const containerClasses = ["avatar"];
  if (online) containerClasses.push("avatar-online");
  if (offline) containerClasses.push("avatar-offline");
  if (placeholder) containerClasses.push("avatar-placeholder");
  if (className) containerClasses.push(className);

  const avatarClasses = [
    size,
    rounded === "none" ? "" : `rounded-${rounded}`,
    mask ? `mask ${mask}` : "",
    ring ? `ring-2 ${ring}` : "",
    ringOffset ? `ring-offset-2 ${ringOffset}` : "",
  ].filter(Boolean).join(" ");

  const fontSize = size.includes("w-24")
    ? "text-3xl"
    : size.includes("w-16")
    ? "text-xl"
    : size.includes("w-12")
    ? "text-base"
    : "text-xs";

  return createElement(
    "div",
    { className: containerClasses.join(" ") },
    createElement(
      "div",
      { className: avatarClasses },
      placeholder
        ? createElement("span", { className: fontSize }, placeholder)
        : src
        ? createElement("img", { src })
        : null
    )
  );
});

export const AvatarGroup = component((props: AvatarGroupProps) => {
  const { children, counter, space = "-space-x-6", className } = props;
  const groupClasses = ["avatar-group", space];
  if (className) groupClasses.push(className);

  const renderedChildren = [...children];
  if (counter) {
    // Add last avatar as counter
    renderedChildren.push(
      createElement(
        "div",
        { className: "avatar avatar-placeholder" },
        createElement(
          "div",
          { className: `bg-neutral text-neutral-content ${children[0]?.props?.size || "w-12"} rounded-full` },
          `+${counter}`
        )
      )
    );
  }

  return createElement("div", { className: groupClasses.join(" ") }, ...renderedChildren);
});
