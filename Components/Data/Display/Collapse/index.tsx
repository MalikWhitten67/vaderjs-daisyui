// Collapse.ts
import { component, createElement } from "vaderjs";

export interface CollapseItem {
  id: string | number;
  title: string;
  content: string;
  focus?: boolean; // true = focus-based collapse
  checkbox?: boolean; // true = checkbox-controlled
  details?: boolean; // true = use <details>/<summary>
  open?: boolean; // force open
  close?: boolean; // force close
  arrow?: boolean; // arrow icon
  plus?: boolean; // plus/minus icon
  placementStart?: boolean; // move icon to start
  customClasses?: string; // any additional Tailwind classes
}

export interface CollapseProps {
  items: CollapseItem[];
}

const Collapse = component(({ items }: CollapseProps) => {
  const renderItem = (item: CollapseItem) => {
    let baseClasses = "collapse";
    if (item.focus) baseClasses += " focus:outline-none";
    if (item.arrow) baseClasses += " collapse-arrow";
    if (item.plus) baseClasses += " collapse-plus";
    if (item.open) baseClasses += " collapse-open";
    if (item.close) baseClasses += " collapse-close";
    if (item.customClasses) baseClasses += ` ${item.customClasses}`;

    const titleClasses = `collapse-title font-semibold${
      item.placementStart ? " after:start-5 after:end-auto pe-4 ps-12" : ""
    }`;
    const contentClasses = "collapse-content text-sm";

    if (item.details) {
      // Using details/summary
      return createElement(
        "details",
        { class: baseClasses, key: item.id },
        [
          createElement("summary", { class: titleClasses }, item.title),
          createElement("div", { class: contentClasses }, item.content)
        ]
      );
    }

    return createElement("div", { class: baseClasses, key: item.id, tabindex: item.focus ? 0 : undefined }, [
      item.checkbox ? createElement("input", { type: "checkbox" }) : null,
      createElement("div", { class: titleClasses }, item.title),
      createElement("div", { class: contentClasses }, item.content)
    ]);
  };

  return items.map(renderItem);
});

export default Collapse;
