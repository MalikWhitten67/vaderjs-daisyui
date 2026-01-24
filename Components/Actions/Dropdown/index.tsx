import { component, createElement, useState, useRef, useOnClickOutside, useEffect } from "vaderjs";

export type DropdownProps = {
    method?: "details" | "popover" | "focus";
    placement?: "start" | "center" | "end" | "top" | "bottom" | "left" | "right";
    hover?: boolean;
    open?: boolean;
    close?: boolean;
    buttonClass?: string;
    contentClass?: string;
    buttonContent: any;
    children: any;
};

const Dropdown = component<DropdownProps>((props) => {
    const {
        method = "details",
        placement = "bottom",
        hover = false,
        open,
        close,
        buttonClass = "btn",
        contentClass = "menu dropdown-content bg-base-100 rounded-box shadow-md p-2",
        buttonContent,
        children,
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    // Create ref objects
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);


    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen) return;
        if (e.key === "Escape") {
            setIsOpen(false);
            buttonRef.current?.focus();
        }
    };

    useEffect(() => {
        console.log(contentRef)
        if (!contentRef.current) return; // Only attach if element exists

        const listener = (event: MouseEvent) => {
            console.log(event)
            if (!contentRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", listener, true);
        return () => document.removeEventListener("mousedown", listener, true);
    }, [isOpen]); // re-run when isOpen changes

    if (method === "details") {
        return createElement(
            "details",
            {
                class: `dropdown ${placement ? `dropdown-${placement}` : ""} ${hover ? "dropdown-hover" : ""} ${open ? "dropdown-open" : ""} ${close ? "dropdown-close" : ""}`,
            },
            createElement("summary", { class: buttonClass }, buttonContent),
            createElement(
                "div",
                { class: contentClass, role: "menu", tabIndex: -1 },
                children
            )
        );
    }

    // Popover or focus methods
    return createElement(
        "fragment",
        null,
        createElement(
            "button",
            {
                // Pass ref as a property, not an attribute
                ref: buttonRef,
                class: buttonClass,
                "aria-haspopup": "menu",
                "aria-expanded": isOpen,
                onClick: () => setIsOpen(!isOpen),
            },
            buttonContent
        ),
        isOpen &&
        createElement(
            "div",
            {
                // Pass ref as a property
                ref: contentRef,
                class: contentClass,
                role: "menu",
                tabIndex: -1
            },
            children
        )
    );
});

export default Dropdown;