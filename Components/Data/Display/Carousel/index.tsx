// Carousel.tsx
import { component, createElement } from "vaderjs";

interface CarouselProps {
  images: string[];
  snap?: "start" | "center" | "end"; // snap position
  width?: "full" | "half";           // width of items
  vertical?: boolean;                // vertical layout
  containerWidth?: string;           // optional width of carousel container, e.g., "w-96"
  fullBleed?: boolean;               // full-bleed layout
  indicators?: boolean;              // show indicator buttons
  controls?: boolean;                // show next/prev buttons
}

const Carousel = component(({
  images,
  snap = "start",
  width = "full",
  vertical = false,
  containerWidth = "w-64",
  fullBleed = false,
  indicators = false,
  controls = false,
}: CarouselProps) => {
  const snapClass = snap === "center" ? "carousel-center" : snap === "end" ? "carousel-end" : "carousel-start";
  const orientationClass = vertical ? "carousel-vertical" : "";
  const itemClass = width === "full" ? "w-full" : "w-1/2";
  const containerClass = fullBleed
    ? "carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4"
    : `carousel ${snapClass} ${orientationClass} ${containerWidth} rounded-box`;

  const len = images.length;

  // VaderJS requires returning VNode or VNode[], no fragments <>
  const carouselItems = images.map((src, i) => {
    const prev = (i - 1 + len) % len;
    const next = (i + 1) % len;

    return createElement("div", {
      key: i,
      id: controls ? `slide${i + 1}` : indicators ? `item${i + 1}` : undefined,
      class: `carousel-item ${itemClass} ${vertical ? "h-full" : ""} relative`
    },
      createElement("img", {
        src,
        class: fullBleed ? "rounded-box" : "w-full",
        alt: `Carousel ${i + 1}`
      }),
      controls ? createElement("div", {
        class: "absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
      },
        createElement("a", { href: `#slide${prev + 1}`, class: "btn btn-circle" }, "❮"),
        createElement("a", { href: `#slide${next + 1}`, class: "btn btn-circle" }, "❯")
      ) : null
    );
  });

  const indicatorButtons = indicators && !controls
    ? createElement("div", { class: "flex justify-center w-full py-2 gap-2" },
      images.map((_, i) =>
        createElement("a", { href: `#item${i + 1}`, class: "btn btn-xs", key: i }, `${i + 1}`)
      )
    )
    : null;

  return [
    createElement("div", { class: containerClass }, ...carouselItems),
    indicatorButtons
  ];
});

export default Carousel;
