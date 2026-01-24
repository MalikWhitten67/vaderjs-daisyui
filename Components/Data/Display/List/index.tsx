// List.ts
import { component, createElement } from "vaderjs";

/* -------------------------------------------------------
 * List (container)
 * ----------------------------------------------------- */

export interface ListProps {
  children: any;
  className?: string;
  as?: "ul" | "ol" | "div";
}

export const List = component(
  ({ children, className = "", as = "ul" }: ListProps) => {
    const Tag = as;

    return createElement(
      Tag,
      {
        class: `list ${className}`.trim(),
      },
      children
    );
  }
);

/* -------------------------------------------------------
 * ListRow
 * ----------------------------------------------------- */

export interface ListRowProps {
  children: any;
  className?: string;
}

export const ListRow = component(
  ({ children, className = "" }: ListRowProps) =>
    createElement(
      "li",
      {
        class: `list-row ${className}`.trim(),
      },
      children
    )
);

/* -------------------------------------------------------
 * ListCol (optional helper)
 * ----------------------------------------------------- */

export interface ListColProps {
  children: any;
  grow?: boolean;
  wrap?: boolean;
  className?: string;
  as?: string;
}

/**
 * ListCol
 * Helper wrapper for list-row children
 *
 * grow → fills remaining space (list-col-grow)
 * wrap → moves to next row (list-col-wrap)
 */
export const ListCol = component(
  ({
    children,
    grow = false,
    wrap = false,
    className = "",
    as = "div",
  }: ListColProps) => {
    const Tag = as;

    return createElement(
      Tag,
      {
        class: [
          grow && "list-col-grow",
          wrap && "list-col-wrap",
          className,
        ]
          .filter(Boolean)
          .join(" "),
      },
      children
    );
  }
);

export default List;
