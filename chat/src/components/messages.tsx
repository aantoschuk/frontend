import { memo } from "react";

export const MessageList = memo(({ messages }: { messages: string[] }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
});

