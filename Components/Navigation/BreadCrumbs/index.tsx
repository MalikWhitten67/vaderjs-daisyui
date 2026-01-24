import { component, createElement, VNode } from "vaderjs";

export type BreadcrumbItem = {
  label: string | VNode;
  href?: string;
  icon?: VNode | string;
  active?: boolean;
  onClick?: (e: MouseEvent) => void;
  className?: string;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  maxWidth?: string; // e.g., "max-w-xs", "max-w-md"
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  separator?: "slash" | "chevron" | "arrow" | "bullet" | "custom";
  customSeparator?: VNode | string;
  className?: string;
  scrollable?: boolean;
};

 export const Breadcrumbs = component((props: BreadcrumbsProps) => {
  const {
    items,
    maxWidth,
    size = "sm",
    separator = "slash",
    className = "",
    scrollable = false,
  } = props;

  const sizeClass = `text-${size}`;
  const maxWidthClass = maxWidth || "";
  const scrollableClass = scrollable ? "overflow-x-auto" : "";

  const breadcrumbsClasses = [
    "breadcrumbs flex items-center flex-wrap",
    sizeClass,
    maxWidthClass,
    scrollableClass,
    className,
  ].filter(Boolean).join(" ");

  // Map separator symbols
  const separatorSymbols: Record<string, string> = {
    slash: "/",
    chevron: "›",
    arrow: "→",
    bullet: "•",
  };
  const sepSymbol = separatorSymbols[separator] || "/";

  const listItems: VNode[] = items.map((item, index) => {
    const { label, href, icon, active = false, onClick, className: itemClassName = "" } = item;

    const itemClasses = [
      "inline-flex items-center gap-2",
      !active ? "hover:underline cursor-pointer" : "",
      active ? "font-semibold" : "",
      itemClassName,
      // add pseudo separator to all except last
      index < items.length - 1 ? "breadcrumb-separator" : "",
    ].filter(Boolean).join(" ");

    const content = createElement(
      "span",
      { className: "inline-flex items-center gap-2" },
      [
        icon ? createElement("span", { className: "w-4 h-4" }, icon) : null,
        typeof label === "string" ? label : label,
      ].filter(Boolean)
    );

    if (onClick) {
      return createElement(
        "li",
        {
          key: index,
          className: itemClasses,
        },
        createElement(
          "span",
          {
            role: "button",
            tabIndex: 0,
            onClick,
            onKeyDown: (e: KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick(e as unknown as MouseEvent);
              }
            },
          },
          content
        )
      );
    } else if (href && !active) {
      return createElement(
        "li",
        { key: index, className: itemClasses },
        createElement(
          "a",
          { href },
          content
        )
      );
    } else {
      return createElement(
        "li",
        { key: index, className: itemClasses },
        content
      );
    }
  });

  return createElement(
    "div",
    { className: breadcrumbsClasses },
    createElement("ul", { className: "flex items-center flex-wrap" }, listItems)
  );
});



// Helper for common icons
export const BreadcrumbIcons = {
  Home: () => createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      className: "w-4 h-4 stroke-current",
    },
    createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    })
  ),
  
  Documents: () => createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      className: "w-4 h-4 stroke-current",
    },
    createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    })
  ),
  
  Folder: () => createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      className: "w-4 h-4 stroke-current",
    },
    createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    })
  ),
  
  Settings: () => createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      className: "w-4 h-4 stroke-current",
    },
    createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    }),
    createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    })
  ),
};

// Pre-built examples
 

export default Breadcrumbs;