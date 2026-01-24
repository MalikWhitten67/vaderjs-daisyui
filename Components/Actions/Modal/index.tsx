import { useState, useEffect, component, createElement, VNode } from "vaderjs";
import Button from "../Button";

export function useModal(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);
  return { isOpen, open, close, toggle };
}

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children?: VNode | VNode[] | string;
  size?: string; // DaisyUI sizes: w-11/12 max-w-md etc.
  placement?: "top" | "middle" | "bottom";
  horizontal?: "start" | "center" | "end"; // horizontal alignment
  backdrop?: boolean; // show backdrop or not
  openClass?: string; // extra classes when modal is open
}

interface ModalActionProps {
  children: VNode | VNode[] | string;
  onClick?: () => void;
  closeModal?: boolean;
  close?: () => void;
}

// Utility to get focusable elements inside the modal
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ) as HTMLElement[];
}

export const Modal = component((props: ModalProps) => {
  const {
    isOpen,
    onClose,
    title,
    children,
    size = "w-11/12 max-w-md",
    placement = "middle",
    horizontal = "center",
    backdrop = true,
    openClass = "",
  } = props;

  let modalRef: HTMLDivElement | null = null;

  const handleClose = () => {
    if (onClose) onClose();
  };

  // ESC key & focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "Tab" && modalRef) {
        const focusables = getFocusableElements(modalRef);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Autofocus first element
  useEffect(() => {
    if (isOpen && modalRef) {
      const focusables = getFocusableElements(modalRef);
      if (focusables.length > 0) focusables[0].focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // DaisyUI placement classes
  const placementClass =
    placement === "top"
      ? "modal-top"
      : placement === "bottom"
      ? "modal-bottom"
      : "modal-middle"; // default

  const horizontalClass =
    horizontal === "start"
      ? "modal-start"
      : horizontal === "end"
      ? "modal-end"
      : "modal-center"; // center default

  return createElement(
    "div",
    {
      className: `modal modal-open ${placementClass} ${openClass}`,
      "aria-modal": "true",
      role: "dialog",
    },
    backdrop &&
      createElement("div", {
        className: "modal-backdrop",
        onClick: handleClose,
      }),
    createElement(
      "div",
      {
        className: `modal-box ${size} relative`,
        ref: (el: HTMLDivElement) => (modalRef = el),
      },
      title && createElement("h3", { className: "font-bold text-lg" }, title),
      children
    )
  );
});

export const ModalAction = component((props: ModalActionProps) => {
  const { children, onClick, closeModal, close } = props;

  const handleClick = () => {
    if (onClick) onClick();
    if (closeModal && close) close();
  };

  return createElement(Button, { onClick: handleClick }, children);
});
