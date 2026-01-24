import { useState, component, createElement, VNode } from "vaderjs";

export type SwapProps = {
  on?: VNode | VNode[] | string;
  off?: VNode | VNode[] | string;
  indeterminate?: VNode | VNode[] | string;
  active?: boolean; // Controlled toggle
  rotate?: boolean;
  flip?: boolean;
  className?: string;
  onChange?: (active: boolean) => void;
  clickable?: boolean; // If true, label click toggles state
};

export const Swap = component((props: SwapProps) => {
  const { on, off, indeterminate, active, rotate, flip, className, onChange, clickable } = props;

  const [internalActive, setInternalActive] = useState(active ?? false);
  const isControlled = active !== undefined;
  const currentActive = isControlled ? active : internalActive;

  const handleClick = () => {
    if (!clickable) return;
    const newState = !currentActive;
    if (!isControlled) setInternalActive(newState);
    if (onChange) onChange(newState);
  };

  const swapClasses = ["swap"];
  if (rotate) swapClasses.push("swap-rotate");
  if (flip) swapClasses.push("swap-flip");
  if (currentActive) swapClasses.push("swap-active");
  if (className) swapClasses.push(className);

  return createElement(
    "label",
    { className: swapClasses.join(" "), onClick: handleClick },
    // Only render checkbox if not clickable or for accessibility
    !clickable && createElement("input", {
      type: "checkbox",
      checked: currentActive,
      onChange: (e: Event) => {
        const checked = (e.target as HTMLInputElement).checked;
        if (!isControlled) setInternalActive(checked);
        if (onChange) onChange(checked);
      }
    }),
    on && createElement("div", { className: "swap-on" }, on),
    off && createElement("div", { className: "swap-off" }, off),
    indeterminate && createElement("div", { className: "swap-indeterminate" }, indeterminate)
  );
});
