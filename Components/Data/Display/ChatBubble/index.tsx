// ChatBubbles.ts
import { component, createElement } from "vaderjs";

export type ChatColor =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

export interface ChatMessage {
  id: string | number;
  author?: string;
  avatar?: string;
  time?: string;
  content: string;
  placement?: "start" | "end";
  header?: string;
  footer?: string;
  color?: ChatColor;
}

export interface ChatProps {
  messages: ChatMessage[];
}

const ChatBubbles = component(({ messages }: ChatProps) => {
  const renderMessage = (msg: ChatMessage) => {
    const placementClass = msg.placement === "end" ? "chat-end" : "chat-start";
    const bubbleColor = msg.color ? `chat-bubble-${msg.color}` : "";

    return createElement("div", { class: `chat ${placementClass}`, key: msg.id }, [
      msg.avatar
        ? createElement("div", { class: "chat-image avatar" },
            createElement("div", { class: "w-10 rounded-full" },
              createElement("img", { src: msg.avatar, alt: msg.author ?? "User" })
            )
          )
        : null,
      msg.header
        ? createElement("div", { class: "chat-header" }, [
            msg.header,
            msg.time ? createElement("time", { class: "text-xs opacity-50" }, msg.time) : null
          ])
        : null,
      createElement("div", { class: `chat-bubble ${bubbleColor}` }, msg.content),
      msg.footer ? createElement("div", { class: "chat-footer opacity-50" }, msg.footer) : null
    ]);
  };

  return messages.map(renderMessage);
});

export default ChatBubbles;
