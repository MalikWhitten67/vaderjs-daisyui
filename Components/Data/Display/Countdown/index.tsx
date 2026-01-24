// Countdown.ts
import { component, createElement, useState, useEffect, useRef } from "vaderjs";

export interface CountdownUnit {
  label?: string;
  value: number;
  max?: number; // e.g., 59 for seconds
  digits?: number;
  animation?: string;
  containerClass?: string;
  numberClass?: string;
}

export interface CountdownProps {
  units: CountdownUnit[];
  interval?: number; // ms per tick
  loop?: boolean;
}

const Countdown = component(({ units, interval = 1000, loop = true }: CountdownProps) => {
  const [counts, setCounts] = useState(() => units.map(u => u.value));

  // Refs to avoid stale closures in setInterval
  const unitsRef = useRef(units);
  const loopRef = useRef(loop);

  useEffect(() => {
    unitsRef.current = units;
    loopRef.current = loop;
  }, [units, loop]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounts(prev => {
        const newCounts = [...prev];
        const currentUnits = unitsRef.current;
        const shouldLoop = loopRef.current;

        let i = newCounts.length - 1;
        let carry = true;

        while (i >= 0 && carry) {
          const max = currentUnits[i]?.max ?? (i === newCounts.length - 1 ? 59 : 99);
          if (newCounts[i] > 0) {
            newCounts[i]--;
            carry = false;
          } else {
            newCounts[i] = max;
            i--;
          }
        }

        if (carry && shouldLoop) {
          // Reset all to initial values if looping
          return currentUnits.map(u => u.value);
        }

        if (carry && !shouldLoop) {
          // Stop at zero
          clearInterval(timer);
          return newCounts.map(() => 0);
        }

        return newCounts;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  const renderUnit = (val: number, unit: CountdownUnit, idx: number) => {
    const digits = unit.digits ?? 2;
    const padded = String(val).padStart(digits, "0");

    return createElement(
      "div",
      { key: idx, class: `flex flex-col items-center ${unit.containerClass || ""}` },
      [
        createElement("span", {
          class: `countdown font-mono ${unit.numberClass || ""} ${unit.animation || ""}`,
          style: `--value:${val}; --digits:${digits};`,
          "aria-live": "polite",
          "aria-label": String(val)
        }, padded),
        unit.label ? createElement("span", { class: "text-sm mt-1" }, unit.label) : null
      ]
    );
  };

  return createElement(
    "div",
    { class: "grid auto-cols-max grid-flow-col gap-5 text-center" },
    counts.map((val, idx) => renderUnit(val, units[idx], idx))
  );
});

export default Countdown;
