"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CHAT_STORAGE_KEY,
  ChatThread,
  appendMessage,
  loadThreads,
  sortThreads,
  updateThread,
} from "../../../lib/chatStore";

export default function AdminChatPanel() {
  const [open, setOpen] = useState(false);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const refreshThreads = () => {
    const next = sortThreads(loadThreads());
    setThreads(next);
    if (!activeId && next.length > 0) {
      setActiveId(next[0].id);
      return;
    }
    if (activeId && !next.find((thread) => thread.id === activeId)) {
      setActiveId(next[0]?.id ?? null);
    }
  };

  useEffect(() => {
    refreshThreads();
  }, []);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === CHAT_STORAGE_KEY) refreshThreads();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [activeId]);

  const activeThread = useMemo(
    () => threads.find((thread) => thread.id === activeId) || null,
    [threads, activeId]
  );

  const unreadCount = useMemo(
    () => threads.reduce((total, thread) => total + thread.unreadForAdmin, 0),
    [threads]
  );

  useEffect(() => {
    if (!open || !activeThread) return;
    const updated = updateThread(activeThread.id, (thread) => ({
      ...thread,
      unreadForAdmin: 0,
    }));
    if (!updated) return;
    setThreads((prev) => sortThreads(prev.map((thread) => (thread.id === updated.id ? updated : thread))));
  }, [open, activeThread?.id]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages.length]);

  const handleSend = () => {
    if (!activeThread) return;
    if (imagePreview) {
      const updated = appendMessage(activeThread.id, "admin", { type: "image", imageUrl: imagePreview, text: message || undefined });
      if (!updated) return;
      setThreads((prev) => sortThreads(prev.map((thread) => (thread.id === updated.id ? updated : thread))));
      setMessage("");
      setImagePreview(null);
      return;
    }
    const updated = appendMessage(activeThread.id, "admin", { type: "text", text: message });
    if (!updated) return;
    setThreads((prev) => sortThreads(prev.map((thread) => (thread.id === updated.id ? updated : thread))));
    setMessage("");
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="relative w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:border-neon-primary/50 transition-colors"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open chat inbox"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 8h10M7 12h6m-6 6l-3 3V5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H7z"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-5 px-1 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed top-20 right-6 w-[520px] max-w-[95vw] h-[520px] glass-card border border-neon-primary/20 shadow-neon-strong flex flex-col z-[80]">
          <header className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Admin Inbox</p>
              <h3 className="text-white font-display text-lg">Chat Masuk</h3>
            </div>
            <button className="text-gray-400 hover:text-white text-sm" onClick={() => setOpen(false)}>
              Tutup
            </button>
          </header>
          <div className="flex flex-1 overflow-hidden">
            <aside className="w-40 md:w-52 border-r border-white/10 overflow-y-auto custom-scrollbar">
              {threads.length === 0 && (
                <p className="text-xs text-gray-500 p-3">Belum ada chat.</p>
              )}
              {threads.map((thread) => (
                <button
                  key={thread.id}
                  type="button"
                  onClick={() => setActiveId(thread.id)}
                  className={`w-full text-left px-3 py-3 border-b border-white/5 hover:bg-white/5 transition-colors ${
                    thread.id === activeId ? "bg-white/10" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white truncate">{thread.customerName || "Customer"}</p>
                    {thread.unreadForAdmin > 0 && (
                      <span className="text-[10px] text-neon-primary">{thread.unreadForAdmin}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 truncate">
                    {thread.messages.length === 0
                      ? "Belum ada pesan"
                      : thread.messages[thread.messages.length - 1]?.type === "image"
                        ? "Gambar"
                        : thread.messages[thread.messages.length - 1]?.text || "Belum ada pesan"}
                  </p>
                </button>
              ))}
            </aside>
            <section className="flex-1 flex flex-col">
              <div className="flex-1 px-4 py-3 overflow-y-auto custom-scrollbar">
                {!activeThread && <p className="text-sm text-gray-500">Pilih chat untuk membalas.</p>}
                {activeThread?.messages.map((msg) => (
                  <div key={msg.timestamp + msg.text} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"} mb-3`}>
                    <div
                      className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm ${
                        msg.sender === "admin"
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
              <div className="border-t border-white/10 p-3">
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
                    placeholder="Balas chat..."
                    onKeyDown={(event) => {
                      if (event.key === "Enter") handleSend();
                    }}
                  />
                  <button className="btn-primary px-4 py-2 text-sm" onClick={handleSend}>
                    Kirim
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm grid place-items-center p-6"
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
