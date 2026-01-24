// Fab.tsx
import { component, createElement, useState, useRef, useEffect } from "vaderjs";

interface FabProps {
  mainIcon: any;
  children?: any;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  direction?: "up" | "down" | "left" | "right";
}

interface FabItemProps {
  icon?: any;
  label?: string;
  onClick?: () => void;
}

export const FabItem = component((props: FabItemProps) => {
  const { icon, label, onClick } = props;

  return createElement(
    "div",
    { className: "flex items-center gap-2" }, // wrapper div for DaisyUI
    label && createElement("span", { className: "fab-item-label" }, label), // label outside button
    createElement(
      "button",
      {
        type: "button",
        className: "btn btn-lg btn-circle fab-item",
        onClick,
        "aria-label": label,
      },
      icon // icon inside button
    )
  );
});



export const Fab = component((props: FabProps) => {
  const { mainIcon, children, position = "bottom-right", direction = "up" } = props;
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return createElement(
    "div",
    { ref: containerRef, className: `fab ${position} ${direction}` },
    // Main button
    createElement(
      "div",
      {
        tabIndex: 0,
        role: "button",
        className: "btn btn-lg btn-circle fab-main-btn",
        onClick: toggleOpen,
      },
      mainIcon
    ),
    // Children (DaisyUI handles visibility/animation)
    children
  );
});


export default Fab;
