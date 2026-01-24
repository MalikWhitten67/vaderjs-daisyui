import { component, createElement, useRef, useEffect } from "vaderjs";

export interface DiffProps {
  item1: any;
  item2: any;
  className?: string;
  initial?: number; // 0–100
}

const Diff = component(
  ({ item1, item2, className = "diff rounded-field aspect-16/9", initial = 50 }: DiffProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      el.style.setProperty("--pos", `${initial}%`);
    }, [initial]);

    return createElement(
      "figure",
      {
        ref: containerRef,
        class: className,
        tabindex: 0,
      },
      [
        createElement(
          "div",
          { class: "diff-item-1", role: "img", tabindex: 0 },
          item1
        ),

        createElement(
          "div",
          { class: "diff-item-2", role: "img" },
          item2
        ),

        // 🔑 THIS is the key
        createElement("input", {
          type: "range",
          min: 0,
          max: 100,
          value: initial,
          class: "diff-resizer",
          "aria-label": "Resize comparison",
          onInput: (e: any) => {
            containerRef.current?.style.setProperty(
              "--pos",
              `${e.target.value}%`
            );
          },
        }),
      ]
    );
  }
);

export default Diff;
