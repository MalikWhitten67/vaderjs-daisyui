// HoverGallery.ts
import { component, createElement } from "vaderjs";

export interface HoverGalleryProps {
  images: (string | JSX.Element)[];
  className?: string;
  as?: "figure" | "div";
  altPrefix?: string;
}

/**
 * HoverGallery
 * DaisyUI hover-gallery component
 *
 * Rules:
 * - Max 10 images (CSS limitation)
 * - First image is default
 * - Remaining images activate on horizontal hover zones
 * - NO JS REQUIRED (CSS-driven)
 */
const HoverGallery = component(
  ({
    images,
    className = "",
    as = "figure",
    altPrefix = "Gallery image",
  }: HoverGalleryProps) => {
    const Tag = as;

    const safeImages = images.slice(0, 10); // hard cap per DaisyUI

    return createElement(
      Tag,
      {
        class: `hover-gallery ${className}`.trim(),
        role: "group",
        "aria-label": "Hover image gallery",
      },
      safeImages.map((img, idx) => {
        // string → <img src="..." />
        if (typeof img === "string") {
          return createElement("img", {
            src: img,
            alt: `${altPrefix} ${idx + 1}`,
            loading: idx === 0 ? "eager" : "lazy",
            draggable: false,
          });
        }

        // JSX passed directly
        return img;
      })
    );
  }
);

export default HoverGallery;
