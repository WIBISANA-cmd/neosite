"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CHAT_STORAGE_KEY,
  appendMessage,
  ensureCustomerThread,
  getOrCreateClientId,
  loadThreads,
  updateThread,
} from "../lib/chatStore";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("Customer");
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [unread, setUnread] = useState(0);
  const [messages, setMessages] = useState<
    { text?: string; sender: "customer" | "admin"; timestamp: number; type: "text" | "image"; imageUrl?: string }[]
  >([]);
  const endRef = useRef<HTMLDivElement | null>(null);

  const refreshThread = () => {
    const id = getOrCreateClientId();
    const threads = loadThreads();
    const current = threads.find((thread) => thread.id === id);
    if (!current) return;
    setThreadId(current.id);
    setCustomerName(current.customerName || "Customer");
    setMessages(current.messages);
    setUnread(current.unreadForCustomer);
  };

  useEffect(() => {
    const initial = ensureCustomerThread("Customer");
    setThreadId(initial.id);
    setCustomerName(initial.customerName || "Customer");
    setMessages(initial.messages);
    setUnread(initial.unreadForCustomer);
  }, []);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === CHAT_STORAGE_KEY) refreshThread();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (!isOpen || !threadId) return;
    const updated = updateThread(threadId, (thread) => ({
      ...thread,
      unreadForCustomer: 0,
    }));
    if (updated) {
      setMessages(updated.messages);
      setUnread(0);
    }
  }, [isOpen, threadId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isOpen]);

  const handleSend = () => {
    if (!threadId) return;
    if (imagePreview) {
      const updated = appendMessage(threadId, "customer", { type: "image", imageUrl: imagePreview, text: message || undefined });
      if (!updated) return;
      setMessages(updated.messages);
      setMessage("");
      setImagePreview(null);
      return;
    }
    const updated = appendMessage(threadId, "customer", { type: "text", text: message });
    if (!updated) return;
    setMessages(updated.messages);
    setMessage("");
  };

  const handleRename = (value: string) => {
    if (!threadId) return;
    setCustomerName(value);
    updateThread(threadId, (thread) => ({ ...thread, customerName: value, updatedAt: Date.now() }));
  };

  const lastAdminMessage = useMemo(() => {
    const reversed = [...messages].reverse();
    return reversed.find((msg) => msg.sender === "admin");
  }, [messages]);

  return (
    <div className="fixed top-20 right-6 z-[70]">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-secondary to-neon-primary shadow-neon-strong flex items-center justify-center text-neon-dark hover:scale-105 transition-transform"
        aria-label="Open chat widget"
      >
        <span className="absolute -inset-1 rounded-[20px] border border-white/30 animate-pulse-fast" />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.2-3A7.75 7.75 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        {unread > 0 && !isOpen && (
          <span className="absolute -top-2 -right-2 min-w-[20px] px-1.5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center shadow-lg">
            {unread}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="mt-4 w-[340px] max-w-[90vw] h-[460px] glass-card border border-neon-primary/20 shadow-neon-strong flex flex-col">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">NeoSite Support</p>
              <p className="text-white font-display text-lg">Chat Admin</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-fast" />
              Online
            </div>
          </div>
          <div className="px-4 pt-3">
            <label className="text-[11px] text-gray-400 uppercase tracking-wide">Nama</label>
            <input
              className="input-field mt-1 text-sm"
              value={customerName}
              onChange={(event) => handleRename(event.target.value)}
              placeholder="Nama kamu"
            />
          </div>
          <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-sm text-gray-500 text-center mt-10">
                Mulai chat dengan admin. Kami siap bantu.
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.timestamp + msg.text} className={`flex ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                    msg.sender === "customer"
                      ? "bg-neon-primary/20 border border-neon-primary/30 text-white"
                      : "bg-white/10 border border-white/10 text-gray-100"
                  }`}
                >
                  {msg.type === "image" && msg.imageUrl && (
                    <button type="button" onClick={() => setLightboxImage(msg.imageUrl)} className="block w-full">
                      <img src={msg.imageUrl} alt="Chat attachment" className="rounded-xl mb-2 max-h-48 w-full object-contain bg-black/20" />
                    </button>
                  )}
                  {msg.text && <p>{msg.text}</p>}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="px-4 pb-4">
            {lastAdminMessage && (
              <p className="text-[11px] text-gray-500 mb-2">
                Admin terakhir: {new Date(lastAdminMessage.timestamp).toLocaleTimeString()}
              </p>
            )}
            {imagePreview && (
              <div className="mb-3 flex items-center gap-3">
                <img src={imagePreview} alt="Preview" className="h-16 w-16 rounded-xl object-cover border border-white/10" />
                <button
                  type="button"
                  className="text-xs text-gray-400 hover:text-white"
                  onClick={() => {
                    setImagePreview(null);
                  }}
                >
                  Hapus gambar
                </button>
              </div>
            )}
            <div className="flex items-center gap-2">
              <label className="btn-secondary px-3 py-2 text-xs cursor-pointer">
                Gambar
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      setImagePreview(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                    event.target.value = "";
                  }}
                />
              </label>
              <input
                className="input-field text-sm"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tulis pesan..."
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSend();
                }}
              />
              <button className="btn-primary px-4 py-2 text-sm" onClick={handleSend}>
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightboxImage(null)}
        >
          <div className="w-[80vw] h-[80vh] flex items-center justify-center">
            <img src={lightboxImage} alt="Preview" className="max-w-full max-h-full object-contain rounded-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}
