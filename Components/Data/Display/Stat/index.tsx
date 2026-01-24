import { component, createElement } from "vaderjs";

/* ================================
   TYPES
================================ */

export interface StatsProps {
  children: any;
  className?: string;
  direction?: "horizontal" | "vertical";
  responsive?: boolean; // vertical on small, horizontal on lg
}

export interface StatProps {
  children: any;
  className?: string;
  centered?: boolean;
}

export interface StatPartProps {
  children: any;
  className?: string;
}

/* ================================
   ROOT: <Stats>
================================ */

export const Stats = component(
  ({
    children,
    className = "",
    direction = "horizontal",
    responsive = false,
  }: StatsProps) => {
    const dirClass =
      responsive
        ? "stats-vertical lg:stats-horizontal"
        : direction === "vertical"
          ? "stats-vertical"
          : "stats-horizontal";

    return createElement(
      "div",
      {
        class: `stats ${dirClass} ${className}`.trim(),
      },
      children
    );
  }
);

/* ================================
   <Stat>
================================ */

export const Stat = component(
  ({
    children,
    className = "",
    centered = false,
  }: StatProps) => {
    return createElement(
      "div",
      {
        class: `stat ${centered ? "place-items-center" : ""} ${className}`.trim(),
      },
      children
    );
  }
);

/* ================================
   PARTS
================================ */

export const StatTitle = component(
  ({ children, className = "" }: StatPartProps) =>
    createElement("div", { class: `stat-title ${className}`.trim() }, children)
);

export const StatValue = component(
  ({ children, className = "" }: StatPartProps) =>
    createElement("div", { class: `stat-value ${className}`.trim() }, children)
);

export const StatDesc = component(
  ({ children, className = "" }: StatPartProps) =>
    createElement("div", { class: `stat-desc ${className}`.trim() }, children)
);

export const StatFigure = component(
  ({ children, className = "" }: StatPartProps) =>
    createElement("div", { class: `stat-figure ${className}`.trim() }, children)
);

export const StatActions = component(
  ({ children, className = "" }: StatPartProps) =>
    createElement("div", { class: `stat-actions ${className}`.trim() }, children)
);

/* ================================
   DEFAULT EXPORT (OPTIONAL)
================================ */

export default {
  Stats,
  Stat,
  StatTitle,
  StatValue,
  StatDesc,
  StatFigure,
  StatActions,
};
