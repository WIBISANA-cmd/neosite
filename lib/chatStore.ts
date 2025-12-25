export type ChatRole = "customer" | "admin";

export type ChatMessage = {
  id: string;
  sender: ChatRole;
  text?: string;
  imageUrl?: string;
  type: "text" | "image";
  timestamp: number;
};

export type ChatThread = {
  id: string;
  customerName: string;
  messages: ChatMessage[];
  unreadForAdmin: number;
  unreadForCustomer: number;
  updatedAt: number;
};

export const CHAT_STORAGE_KEY = "neosite_chat_threads";
export const CHAT_CLIENT_KEY = "neosite_chat_client_id";

const safeParse = <T,>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const getOrCreateClientId = (): string => {
  if (typeof window === "undefined") return "anonymous";
  const existing = localStorage.getItem(CHAT_CLIENT_KEY);
  if (existing) return existing;
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `client_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  localStorage.setItem(CHAT_CLIENT_KEY, id);
  return id;
};

export const loadThreads = (): ChatThread[] => {
  if (typeof window === "undefined") return [];
  const parsed = safeParse<ChatThread[]>(localStorage.getItem(CHAT_STORAGE_KEY), []);
  return parsed.map((thread) => ({
    ...thread,
    messages: thread.messages.map((msg) => ({
      ...msg,
      type: msg.type || (msg.imageUrl ? "image" : "text"),
    })),
  }));
};

export const saveThreads = (threads: ChatThread[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(threads));
};

export const sortThreads = (threads: ChatThread[]) =>
  [...threads].sort((a, b) => b.updatedAt - a.updatedAt);

export const ensureCustomerThread = (customerName = "Customer"): ChatThread => {
  const clientId = getOrCreateClientId();
  const threads = loadThreads();
  const existingIndex = threads.findIndex((thread) => thread.id === clientId);
  if (existingIndex !== -1) {
    const existing = threads[existingIndex];
    if (customerName && existing.customerName !== customerName) {
      const updated = { ...existing, customerName, updatedAt: Date.now() };
      const next = [...threads];
      next[existingIndex] = updated;
      saveThreads(next);
      return updated;
    }
    return existing;
  }

  const fresh: ChatThread = {
    id: clientId,
    customerName,
    messages: [],
    unreadForAdmin: 0,
    unreadForCustomer: 0,
    updatedAt: Date.now(),
  };
  const next = [fresh, ...threads];
  saveThreads(next);
  return fresh;
};

export const updateThread = (threadId: string, updater: (thread: ChatThread) => ChatThread) => {
  const threads = loadThreads();
  const index = threads.findIndex((thread) => thread.id === threadId);
  if (index === -1) return null;
  const updated = updater(threads[index]);
  const next = [...threads];
  next[index] = updated;
  saveThreads(next);
  return updated;
};

export const appendMessage = (
  threadId: string,
  sender: ChatRole,
  payload: { type: "text"; text: string } | { type: "image"; imageUrl: string; text?: string }
) => {
  if (payload.type === "text" && !payload.text.trim()) return null;
  if (payload.type === "image" && !payload.imageUrl) return null;
  const message: ChatMessage = {
    id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
    sender,
    type: payload.type,
    text: payload.type === "text" ? payload.text.trim() : payload.text,
    imageUrl: payload.type === "image" ? payload.imageUrl : undefined,
    timestamp: Date.now(),
  };
  return updateThread(threadId, (thread) => {
    const next: ChatThread = {
      ...thread,
      messages: [...thread.messages, message],
      updatedAt: message.timestamp,
    };
    if (sender === "customer") {
      next.unreadForAdmin = thread.unreadForAdmin + 1;
    } else {
      next.unreadForCustomer = thread.unreadForCustomer + 1;
    }
    return next;
  });
};
