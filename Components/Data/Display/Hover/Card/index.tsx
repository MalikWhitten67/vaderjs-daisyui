import { component, createElement } from "vaderjs";

export interface Hover3DProps {
  children: any;
  className?: string;
  as?: "div" | "a";
  href?: string;
}

const Hover3D = component(
  ({ children, className = "", as = "div", href }: Hover3DProps) => {
    const Tag = as;

    return createElement(
      Tag,
      {
        class: `hover-3d ${className}`.trim(),
        ...(Tag === "a" && href ? { href } : {}),
      },

      // ✅ IMPORTANT: spread children
      children,

      // required 8 hover zones
      createElement("div", {}),
      createElement("div", {}),
      createElement("div", {}),
      createElement("div", {}),
      createElement("div", {}),
      createElement("div", {}),
      createElement("div", {}),
      createElement("div", {})
    );
  }
);

export default Hover3D;
