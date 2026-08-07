export class RayChatError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = "RayChatError";
    this.status = status;
  }
}

/** Map API/network failures to short RAY-voice lines (never dump raw upstream). */
export function rayVoiceError(error) {
  const status = error?.status;
  const raw = typeof error?.message === "string" ? error.message : "";
  const msg = raw.toLowerCase();

  if (status === 429 || msg.includes("too many")) {
    return "Too many messages sent at once. Wait a moment, then try again.";
  }
  if (msg.includes("busy") || msg.includes("model is busy")) {
    return "RAY is busy processing requests. Give me another try in a moment.";
  }
  if (
    status === 503 ||
    msg.includes("not configured") ||
    msg.includes("groq_api_key")
  ) {
    if (msg.includes("not configured") || msg.includes("groq_api_key")) {
      return "My brain key is missing. Add GROQ_API_KEY in .env.local and restart the server.";
    }
    return "RAY had a temporary hiccup. Give me another try in a moment.";
  }
  if (status === 400 || msg.includes("invalid message")) {
    return "That message was a bit odd. Try a shorter one?";
  }
  if (
    typeof navigator !== "undefined" &&
    navigator.onLine === false
  ) {
    return "You're offline. Reconnect and I'll fetch the answer.";
  }
  if (
    msg.includes("failed to fetch") ||
    msg.includes("network") ||
    msg.includes("offline") ||
    status === 404
  ) {
    return "Can't reach the chat API. Is the server running?";
  }
  if (status === 502 || status === 500 || msg.includes("snag")) {
    return "RAY had a temporary hiccup. Give me another try in a moment.";
  }

  if (raw && raw.length < 160 && !msg.includes("groq api") && !msg.includes("stack")) {
    return raw;
  }

  return "Hmm, that didn't land. Try again in a moment.";
}

export async function askRay(message, { history = [], currentPath = "/", siteState = null } = {}) {
  let response;
  try {
    response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        history: history.map((m) => ({ role: m.role, content: m.text })),
        currentPath,
        siteState,
      }),
    });
  } catch (error) {
    throw new RayChatError(error?.message || "RAY is offline", 0);
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new RayChatError(err.error || "RAY is offline", response.status);
  }

  const data = await response.json();
  return {
    reply: data.reply || "No response.",
    actions: Array.isArray(data.actions) ? data.actions : [],
    intent: data.intent,
  };
}
