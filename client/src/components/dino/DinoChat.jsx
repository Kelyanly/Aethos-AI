import { useState } from "react";

export default function DinoChat({ onAsk, disabled = false }) {
  const [input, setInput] = useState("");

  async function submit(event) {
    event.preventDefault();
    const message = input.trim();
    if (!message) return;
    await onAsk(message);
    setInput("");
  }

  return (
    <form className="dino-chat" onSubmit={submit}>
      <label>
        <span className="small muted">Ask Din_0</span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="What can AI automate first in my business?"
          disabled={disabled}
        />
      </label>
      <button type="submit" className="btn btn-secondary" disabled={disabled || !input.trim()}>
        Ask
      </button>
    </form>
  );
}
