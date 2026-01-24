import { component, createElement, useState, VNode } from "vaderjs";

export type ThemeOption = {
  value: string;
  label?: string;
  icon?: VNode; // optional icon
  ariaLabel?: string;
};

export type ThemeControllerProps = {
  type?: "checkbox" | "radio" | "toggle" | "swap" | "buttons" | "dropdown"; // type of input
  value?: string | boolean; // initial value
  options?: ThemeOption[]; // for radios, buttons, dropdown
  className?: string;
  direction?: "vertical" | "horizontal"; // for buttons/radios
  onChange?: (value: string | boolean) => void;
  swapRotate?: boolean;
  swapFlip?: boolean;
};

export const ThemeController = component((props: ThemeControllerProps) => {
  const {
    type = "checkbox",
    value,
    options = [],
    className,
    direction = "horizontal",
    onChange,
    swapRotate,
    swapFlip,
  } = props;

  const [state, setState] = useState(value ?? (type === "checkbox" || type === "toggle" || type === "swap" ? false : ""));

  const handleChange = (val: string | boolean) => {
    setState(val);
    if (onChange) onChange(val);
  };

  // Checkbox / Toggle / Swap
  if (type === "checkbox" || type === "toggle") {
    return createElement("input", {
      type: "checkbox",
      className: `theme-controller ${type} ${className || ""}`,
      checked: state as boolean,
      onChange: (e: Event) => handleChange((e.target as HTMLInputElement).checked),
    });
  }

  if (type === "swap") {
    // swap-on / swap-off
    const [checked, setChecked] = useState(state as boolean);
    return createElement(
      "label",
      {
        className: `swap ${swapRotate ? "swap-rotate" : ""} ${swapFlip ? "swap-flip" : ""} ${checked ? "swap-active" : ""} ${className || ""}`,
        onClick: () => handleChange(!checked),
      },
      createElement("input", {
        type: "checkbox",
        className: "theme-controller hidden",
        checked,
        onChange: (e: Event) => handleChange((e.target as HTMLInputElement).checked),
      }),
      options[0]?.icon && createElement("div", { className: "swap-off" }, options[0].icon),
      options[1]?.icon && createElement("div", { className: "swap-on" }, options[1].icon)
    );
  }

  // Radio / Buttons / Dropdown
  if (type === "radio" || type === "buttons") {
    const containerClass = type === "buttons" ? `join ${direction === "vertical" ? "join-vertical" : ""}` : "";
    return createElement(
      "div",
      { className: `${containerClass} ${className || ""}` },
      options.map(opt =>
        createElement("input", {
          type: "radio",
          name: type === "radio" ? "theme-radios" : "theme-buttons",
          className: `theme-controller ${type === "buttons" ? "btn join-item" : "radio"} ${opt?.ariaLabel ? "" : ""}`,
          value: opt.value,
          checked: state === opt.value,
          "aria-label": opt.ariaLabel ?? opt.label ?? opt.value,
          onChange: () => handleChange(opt.value),
        })
      )
    );
  }

  if (type === "dropdown") {
    return createElement(
      "div",
      { className: `dropdown ${className || ""}` },
      createElement(
        "div",
        { tabIndex: 0, role: "button", className: "btn m-1" },
        "Theme",
        createElement(
          "svg",
          {
            width: "12px",
            height: "12px",
            className: "inline-block h-2 w-2 fill-current opacity-60",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 2048 2048",
          },
          createElement("path", { d: "M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" })
        )
      ),
      createElement(
        "ul",
        { tabIndex: -1, className: "dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl" },
        options.map(opt =>
          createElement(
            "li",
            {},
            createElement("input", {
              type: "radio",
              name: "theme-dropdown",
              className: "theme-controller w-full btn btn-sm btn-block btn-ghost justify-start",
              value: opt.value,
              checked: state === opt.value,
              "aria-label": opt.ariaLabel ?? opt.label ?? opt.value,
              onChange: () => handleChange(opt.value),
            })
          )
        )
      )
    );
  }

  return null;
});
