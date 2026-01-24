import { createElement } from "vaderjs";

export interface TableProps {
  zebra?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  pinRows?: boolean;
  pinCols?: boolean;
  class?: string;
}

 const Table = ({
  zebra,
  size = "md",
  pinRows,
  pinCols,
  class: className,
  children,
}: TableProps & { children?: any }) => {
  const classes = [
    "table",
    zebra && "table-zebra",
    pinRows && "table-pin-rows",
    pinCols && "table-pin-cols",
    size && `table-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createElement("table", { class: classes }, children);
};

export default Table