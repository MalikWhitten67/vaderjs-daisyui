import { component, createElement, VNode } from "vaderjs";

export type DockItem = {
  label?: string;
  icon: VNode | string;
  active?: boolean;
  onClick?: (e: MouseEvent) => void;
  href?: string;
  className?: string;
  badge?: string | number;
  disabled?: boolean;
  tooltip?: string;
};

export type DockProps = {
  items: DockItem[];
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  position?: "bottom" | "top" | "left" | "right";
  fixed?: boolean;
  rounded?: boolean;
  border?: boolean;
  shadow?: boolean;
  className?: string;
  color?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "base" | "ghost";
  maxWidth?: string; // e.g., "max-w-sm", "max-w-md"
  showLabels?: boolean; // Show labels for all items (not just on hover)
  compact?: boolean; // Hide labels (icons only)
};

export const Dock = component((props: DockProps) => {
  const {
    items,
    size = "md",
    position = "bottom",
    fixed = false,
    rounded = true,
    border = true,
    shadow = true,
    className = "",
    color = "base",
    maxWidth,
    showLabels = true,
    compact = false,
  } = props;

  // Build dock classes
  const dockClasses = [
    "dock",
    `dock-${size}`,
    fixed ? "fixed" : "relative",
    position === "bottom" ? "bottom-0 left-0 right-0" : "",
    position === "top" ? "top-0 left-0 right-0" : "",
    position === "left" ? "left-0 top-0 bottom-0 flex-col" : "",
    position === "right" ? "right-0 top-0 bottom-0 flex-col" : "",
    rounded ? "rounded-box" : "",
    border ? "border border-base-300" : "",
    shadow ? "shadow-lg" : "",
    color === "base" ? "bg-base-100" : `bg-${color} text-${color}-content`,
    maxWidth,
    className,
  ].filter(Boolean).join(" ");

  // Build position classes for container
  const containerClasses = [
    position === "bottom" ? "items-end justify-center" : "",
    position === "top" ? "items-start justify-center" : "",
    position === "left" ? "justify-start items-center" : "",
    position === "right" ? "justify-end items-center" : "",
    "flex",
  ].filter(Boolean).join(" ");

  const renderItem = (item: DockItem, index: number) => {
    const {
      label,
      icon,
      active = false,
      onClick,
      href,
      className: itemClassName = "",
      badge,
      disabled = false,
      tooltip,
    } = item;

    const itemClasses = [
      "flex flex-col items-center justify-center",
      active ? "dock-active" : "",
      disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-base-200 hover:bg-opacity-50",
      itemClassName,
    ].filter(Boolean).join(" ");

    const content = createElement(
      "div",
      { className: "flex flex-col items-center justify-center p-2" },
      [
        // Icon container
        createElement(
          "div",
          { 
            className: "relative",
            style: { width: "2em", height: "2em" }
          },
          [
            // Icon
            createElement(
              "div",
              { className: "flex items-center justify-center w-full h-full" },
              typeof icon === "string" 
                ? createElement("span", {}, icon)
                : icon
            ),
            // Badge
            badge ? createElement(
              "span",
              { 
                className: "absolute -top-1 -right-1 badge badge-xs badge-primary",
                style: { minWidth: "1.25rem", minHeight: "1.25rem" }
              },
              badge
            ) : null,
          ].filter(Boolean)
        ),
        // Label (only show if showLabels is true and label exists)
        showLabels && label && !compact ? createElement(
          "span",
          { className: "dock-label text-xs mt-1" },
          label
        ) : null,
        // Tooltip (for compact mode)
        !showLabels && compact && tooltip ? createElement(
          "div",
          { 
            className: "absolute opacity-0 group-hover:opacity-100 transition-opacity bg-base-100 text-base-content px-2 py-1 rounded text-xs whitespace-nowrap",
            style: { 
              top: position === "bottom" ? "-2.5rem" : "auto",
              bottom: position === "top" ? "-2.5rem" : "auto",
              left: position === "right" ? "-2.5rem" : "auto",
              right: position === "left" ? "-2.5rem" : "auto",
            }
          },
          tooltip
        ) : null,
      ].filter(Boolean)
    );

    const commonProps = {
      className: itemClasses,
      disabled,
      "aria-label": label || tooltip,
      title: tooltip,
    };

    if (href && !disabled) {
      return createElement(
        "a",
        {
          key: index,
          href,
          ...commonProps,
        },
        content
      );
    }

    return createElement(
      "button",
      {
        key: index,
        type: "button",
        onClick: disabled ? undefined : onClick,
        ...commonProps,
      },
      content
    );
  };

  return createElement(
    "div",
    { className: containerClasses },
    createElement(
      "div",
      { className: dockClasses },
      items.map(renderItem)
    )
  );
});

// Pre-built icon components
export const DockIcons = {
  Home: () => createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      className: "size-[1.2em]",
    },
    createElement("g", { 
      fill: "currentColor", 
      strokeLinejoin: "miter", 
      strokeLinecap: "butt" 
    }, [
      createElement("polyline", {
        points: "1 11 12 2 23 11",
        fill: "none",
        stroke: "currentColor",
        strokeMiterlimit: "10",
        strokeWidth: "2",
      }),
      createElement("path", {
        d: "m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7",
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "square",
        strokeMiterlimit: "10",
        strokeWidth: "2",
      }),
      createElement("line", {
        x1: "12",
        y1: "22",
        x2: "12",
        y2: "18",
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "square",
        strokeMiterlimit: "10",
        strokeWidth: "2",
      }),
    ])
  ),

  Inbox: () => createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      className: "size-[1.2em]",
    },
    createElement("g", { 
      fill: "currentColor", 
      strokeLinejoin: "miter", 
      strokeLinecap: "butt" 
    }, [
      createElement("polyline", {
        points: "3 14 9 14 9 17 15 17 15 14 21 14",
        fill: "none",
        stroke: "currentColor",
        strokeMiterlimit: "10",
        strokeWidth: "2",
      }),
      createElement("rect", {
        x: "3",
        y: "3",
        width: "18",
        height: "18",
        rx: "2",
        ry: "2",
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "square",
        strokeMiterlimit: "10",
        strokeWidth: "2",
      }),
    ])
  ),

  Settings: () => createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      className: "size-[1.2em]",
    },
    createElement("g", { 
      fill: "currentColor", 
      strokeLinejoin: "miter", 
      strokeLinecap: "butt" 
    }, [
      createElement("circle", {
        cx: "12",
        cy: "12",
        r: "3",
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "square",
        strokeMiterlimit: "10",
        strokeWidth: "2",
      }),
      createElement("path", {
        d: "m22,13.25v-2.5l-2.318-.966c-.167-.581-.395-1.135-.682-1.654l.954-2.318-1.768-1.768-2.318.954c-.518-.287-1.073-.515-1.654-.682l-.966-2.318h-2.5l-.966,2.318c-.581.167-1.135.395-1.654.682l-2.318-.954-1.768,1.768.954,2.318c-.287.518-.515,1.073-.682,1.654l-2.318.966v2.5l2.318.966c.167.581.395,1.135.682,1.654l-.954,2.318,1.768,1.768,2.318-.954c.518.287,1.073.515,1.654.682l.966,2.318h2.5l.966-2.318c.581-.167,1.135-.395,1.654-.682l2.318.954,1.768-1.768-.954-2.318c.287-.518.515-1.073.682-1.654l2.318-.966Z",
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "square",
        strokeMiterlimit: "10",
        strokeWidth: "2",
      }),
    ])
  ),

  Search: () => createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      className: "size-[1.2em]",
    },
    createElement("circle", {
      cx: "11",
      cy: "11",
      r: "8",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
    }),
    createElement("line", {
      x1: "21",
      y1: "21",
      x2: "16.65",
      y2: "16.65",
      stroke: "currentColor",
      strokeWidth: "2",
    })
  ),

  Profile: () => createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      className: "size-[1.2em]",
    },
    createElement("circle", {
      cx: "12",
      cy: "8",
      r: "4",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
    }),
    createElement("path", {
      d: "M5.3 19c.9-1.8 2.7-3 4.7-3h4c2 0 3.8 1.2 4.7 3",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
    })
  ),
};

// Pre-built examples
export const DockExamples = {
  Basic: () => createElement(Dock, {
    items: [
      { label: "Home", icon: DockIcons.Home(), onClick: () => console.log("Home clicked") },
      { label: "Inbox", icon: DockIcons.Inbox(), active: true, badge: "3" },
      { label: "Settings", icon: DockIcons.Settings() },
    ],
    maxWidth: "max-w-sm",
  }),

  Compact: () => createElement(Dock, {
    items: [
      { icon: DockIcons.Home(), tooltip: "Home" },
      { icon: DockIcons.Inbox(), active: true, tooltip: "Inbox (3)", badge: "3" },
      { icon: DockIcons.Settings(), tooltip: "Settings" },
      { icon: DockIcons.Search(), tooltip: "Search" },
      { icon: DockIcons.Profile(), tooltip: "Profile" },
    ],
    size: "sm",
    compact: true,
    maxWidth: "max-w-sm",
  }),

  Colored: () => createElement(Dock, {
    items: [
      { label: "Home", icon: DockIcons.Home() },
      { label: "Inbox", icon: DockIcons.Inbox(), active: true, badge: "5" },
      { label: "Settings", icon: DockIcons.Settings() },
    ],
    color: "primary",
    maxWidth: "max-w-sm",
  }),

  AllSizes: (size: "xs" | "sm" | "md" | "lg" | "xl") => createElement(Dock, {
    items: [
      { label: "Home", icon: DockIcons.Home() },
      { label: "Inbox", icon: DockIcons.Inbox(), active: true },
      { label: "Settings", icon: DockIcons.Settings() },
    ],
    size,
    maxWidth: "max-w-sm",
    showLabels: size !== "xs" && size !== "sm",
  }),
};

export default Dock;