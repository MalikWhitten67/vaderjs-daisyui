import { component, createElement, VNode } from "vaderjs";

export type TimelineItem = {
  id?: string | number;
  start?: VNode | string;
  middle?: VNode | string;
  end?: VNode | string;
  showLine?: boolean;
  lineColor?: string; // e.g., "bg-primary", "bg-secondary"
  box?: boolean; // whether to apply timeline-box class
  className?: string;
};

export type TimelineProps = {
  items: TimelineItem[];
  vertical?: boolean;
  snapIcon?: boolean;
  compact?: boolean;
  responsive?: boolean; // vertical on mobile, horizontal on desktop
  className?: string;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
};

export const Timeline = component((props: TimelineProps) => {
  const {
    items,
    vertical = false,
    snapIcon = false,
    compact = false,
    responsive = false,
    className = "",
    direction,
    reverse = false,
  } = props;

  // Determine direction
  const actualDirection = direction || (vertical ? "vertical" : "horizontal");

  const timelineClasses = [
    "timeline",
    actualDirection === "vertical" ? "timeline-vertical" : "",
    snapIcon ? "timeline-snap-icon" : "",
    compact ? "timeline-compact" : "",
    responsive ? "timeline-vertical lg:timeline-horizontal" : "",
    className,
  ].filter(Boolean).join(" ");

  const renderItem = (item: TimelineItem, index: number) => {
    const {
      start,
      middle,
      end,
      showLine = true,
      lineColor = "",
      box = false,
      className: itemClassName = "",
    } = item;

    const itemClasses = [
      box && start ? "timeline-box" : "",
      box && end ? "timeline-box" : "",
      itemClassName,
    ].filter(Boolean).join(" ");

    const lineClass = lineColor ? `${lineColor}` : "";

    return createElement(
      "li",
      { key: item.id || index, className: itemClasses },
      [
        // First line before the item (except first item)
        index > 0 && showLine 
          ? createElement("hr", { className: lineClass })
          : null,
        
        // Start content
        start 
          ? createElement(
              "div",
              { className: "timeline-start" },
              typeof start === "string" ? start : start
            )
          : null,
        
        // Middle content (icon)
        middle
          ? createElement(
              "div",
              { className: "timeline-middle" },
              typeof middle === "string" ? middle : middle
            )
          : null,
        
        // End content
        end
          ? createElement(
              "div",
              { className: "timeline-end" },
              typeof end === "string" ? end : end
            )
          : null,
        
        // Line after the item (except last item)
        index < items.length - 1 && showLine 
          ? createElement("hr", { className: lineClass })
          : null,
      ].filter(Boolean)
    );
  };

  // Reverse items if needed
  const displayItems = reverse ? [...items].reverse() : items;

  return createElement(
    "ul",
    { className: timelineClasses },
    displayItems.map(renderItem)
  );
});

// Helper for common timeline use cases
export const TimelineExample = {
  AppleHistory: () => {
    const checkIcon = createElement(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        className: "w-5 h-5",
      },
      createElement("path", {
        fillRule: "evenodd",
        d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
        clipRule: "evenodd",
      })
    );

    const items: TimelineItem[] = [
      {
        start: "1984",
        middle: checkIcon,
        end: "First Macintosh computer",
        box: true,
        lineColor: "bg-primary",
      },
      {
        start: "1998",
        middle: checkIcon,
        end: "iMac",
        box: true,
        lineColor: "bg-primary",
      },
      {
        start: "2001",
        middle: checkIcon,
        end: "iPod",
        box: true,
        lineColor: "bg-primary",
      },
      {
        start: "2007",
        middle: checkIcon,
        end: "iPhone",
        box: true,
      },
      {
        start: "2015",
        middle: checkIcon,
        end: "Apple Watch",
        box: true,
        showLine: false,
      },
    ];

    return createElement(Timeline, { items });
  },

  DevelopmentProcess: () => {
    const items: TimelineItem[] = [
      {
        middle: "📐",
        end: "Design Phase - Wireframing and prototyping",
        box: true,
      },
      {
        middle: "⌨️",
        end: "Development - Writing code and implementing features",
        box: true,
      },
      {
        middle: "🧪",
        end: "Testing - Quality assurance and bug fixing",
        box: true,
      },
      {
        middle: "🚀",
        end: "Deployment - Launching to production",
        box: true,
        showLine: false,
      },
    ];

    return createElement(Timeline, { items, vertical: true });
  },
};

export default Timeline;