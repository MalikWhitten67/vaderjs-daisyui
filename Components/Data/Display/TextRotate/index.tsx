import { component, createElement, VNode } from "vaderjs";

export type TextRotateProps = {
  words: string[] | VNode[];
  duration?: number; // in milliseconds
  className?: string;
  wordClassName?: string;
  containerClassName?: string;
  pauseOnHover?: boolean;
  lineHeight?: string; // e.g., "leading-[2]"
  colorVariant?: "single" | "gradient" | "individual";
};

export const TextRotate = component((props: TextRotateProps) => {
  const {
    words,
    duration = 10000, // 10 seconds default
    className = "",
    wordClassName = "",
    containerClassName = "",
    pauseOnHover = true,
    lineHeight = "",
    colorVariant = "single",
  } = props;

  // Calculate animation delay for each word
  const wordDuration = duration / words.length;

  const containerClasses = [
    "text-rotate",
    pauseOnHover ? "hover:pause" : "",
    className,
    lineHeight,
  ].filter(Boolean).join(" ");

  const innerContainerClasses = [
    "grid justify-items-start", // DaisyUI text-rotate uses grid
    containerClassName,
  ].filter(Boolean).join(" ");

  // Generate individual word styles
  const generateWordStyles = (index: number) => {
    const baseDelay = index * wordDuration;
    
    // Individual colors if specified
    const colorClasses = colorVariant === "individual" 
      ? [
          "bg-teal-400 text-teal-800 px-2",
          "bg-red-400 text-red-800 px-2",
          "bg-blue-400 text-blue-800 px-2",
          "bg-purple-400 text-purple-800 px-2",
          "bg-yellow-400 text-yellow-800 px-2",
          "bg-pink-400 text-pink-800 px-2",
        ][index % 6]
      : colorVariant === "gradient"
      ? "bg-gradient-to-r from-primary to-secondary text-primary-content px-2"
      : wordClassName;

    return `${colorClasses} animate-fade-in-out`;
  };

  return createElement(
    "span",
    {
      className: containerClasses,
      style: `--duration: ${duration}ms;`,
    },
    createElement(
      "span",
      { className: innerContainerClasses },
      words.map((word, index) => {
        const isVNode = typeof word !== 'string';
        
        return createElement(
          "span",
          {
            key: index,
            className: generateWordStyles(index),
            style: `animation-delay: ${index * wordDuration}ms;`,
          },
          isVNode ? word : word
        );
      })
    )
  );
});

// Helper component for text rotate in sentences
export type TextRotateInlineProps = {
  prefix?: string;
  words: string[];
  suffix?: string;
  duration?: number;
  className?: string;
  wordClassName?: string;
};

export const TextRotateInline = component((props: TextRotateInlineProps) => {
  const { prefix, words, suffix, duration, className, wordClassName } = props;

  return createElement(
    "span",
    { className: `inline-flex items-center ${className || ""}` },
    [
      prefix ? createElement("span", { key: "prefix" }, `${prefix} `) : null,
      createElement(TextRotate, {
        key: "rotate",
        words,
        duration,
        wordClassName,
        containerClassName: "inline-block",
      }),
      suffix ? createElement("span", { key: "suffix" }, ` ${suffix}`) : null,
    ].filter(Boolean)
  );
});

export default TextRotate;