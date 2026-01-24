import { component, createElement, VNode } from "vaderjs";

export type AccordionItem = {
  title: string | VNode;
  content: string | VNode;
  value?: string;       // for radio inputs
  open?: boolean;       // for details
};

export type AccordionProps = {
  items: AccordionItem[];
  type?: "radio" | "details";        // radio inputs or details elements
  name?: string;                     // radio group name
  arrow?: boolean;                   // add arrow icon
  plus?: boolean;                    // add plus/minus icon
  join?: boolean;                    // join items for seamless borders
  direction?: "vertical" | "horizontal"; // join direction
  className?: string;                // additional container class
  border?: boolean;                  // add border to items
  onChange?: (value: string) => void;
};

export const Accordion = component((props: AccordionProps) => {
  const {
    items,
    type = "radio",
    name = "accordion",
    arrow,
    plus,
    join,
    direction = "vertical",
    className,
    border = true,
    onChange,
  } = props;

  const containerClass = join ? `join ${direction === "vertical" ? "join-vertical" : ""}` : "";

  return createElement(
    "div",
    { className: `${containerClass} ${className || ""}` },
    items.map((item, index) => {
      const itemClasses = ["collapse"];
      if (arrow) itemClasses.push("collapse-arrow");
      if (plus) itemClasses.push("collapse-plus");
      if (border) itemClasses.push("border border-base-300");
      if (join) itemClasses.push("join-item");
      
      if (type === "details" && item.open) itemClasses.push("collapse-open");

      const handleRadioChange = () => {
        if (onChange && item.value) onChange(item.value);
      };

      if (type === "details") {
        return createElement(
          "details",
          {
            className: itemClasses.join(" "),
            open: !!item.open,
          },
          createElement("summary", { className: "collapse-title font-semibold" }, item.title),
          createElement("div", { className: "collapse-content text-sm" }, item.content)
        );
      }

      // radio type
      return createElement(
        "div",
        { className: itemClasses.join(" ") },
        createElement("input", {
          type: "radio",
          name,
          checked: index === 0,
          onChange: handleRadioChange,
        }),
        createElement("div", { className: "collapse-title font-semibold" }, item.title),
        createElement("div", { className: "collapse-content text-sm" }, item.content)
      );
    })
  );
});
