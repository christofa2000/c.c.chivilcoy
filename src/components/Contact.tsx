// app/contacto/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Phone,
  MapPin,
  Bike,
  MessageCircle,
  Heart,
  ThumbsUp,
  Star,
  Send,
} from "lucide-react";

/* =========================================================
   Utilidades
   ========================================================= */
type Msg = {
  id: string;
  name?: string;
  text: string;
  emoji?: string;
  createdAt: number;
  reactions: { heart: number; clap: number; star: number };
};

const LS_KEY = "ec_guestbook_msgs_v1";
const LS_RATE_KEY = "ec_guestbook_lastPostAt";
const MIN_INTERVAL_MS = 25_000;

const softShadow =
  "8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.60)";
const inShadow =
  "inset 2px 2px 6px rgba(0,0,0,0.06), inset -2px -2px 6px rgba(255,255,255,0.7)";

const seeded: Msg[] = [
  {
    id: "seed-1",
    name: "Sofi",
    text: "¡Amé la clase abierta de danza! 💃✨",
    emoji: "💜",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    reactions: { heart: 6, clap: 3, star: 2 },
  },
  {
    id: "seed-2",
    name: "Mauro",
    text: "La muestra de pintura estuvo increíble. ¡Gracias por el espacio! 🎨",
    emoji: "🌟",
    createdAt: Date.now() - 1000 * 60 * 60 * 8,
    reactions: { heart: 2, clap: 5, star: 1 },
  },
];

/* =========================================================
   Componente principal
   ========================================================= */
export default function ContactoPage() {
  return (
    <section id="contacto" className="py-10">
      <div className="max-w-5xl mx-auto px-4">
        <HeaderTitle />
        <VisitanosCard />
        <Guestbook />
      </div>
    </section>
  );
}

/* =========================================================
   A) VISÍTANOS
   ========================================================= */
function HeaderTitle() {
  return (
    <h2
      className="text-3xl text-center mb-6 tracking-wide"
      style={{ color: "var(--fg, #1a1a1a)" }}
    >
      Visítanos
    </h2>
  );
}

function VisitanosCard() {
  return (
    <div
      className="rounded-2xl bg-white/70 backdrop-blur ring-1 ring-black/10 p-6 md:p-8 mb-10"
      style={{ boxShadow: softShadow }}
    >
      {/* Datos rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="tel:+5492345XXXXXX"
          className="flex items-center gap-3 rounded-xl px-4 py-3 ring-1 ring-black/10 bg-white/80 hover:bg-white transition text-neutral-900"
          style={{ boxShadow: softShadow }}
        >
          <Phone className="w-5 h-5 text-pink-600" />
          <span className="font-medium">+54 9 2345 XXXXXX</span>
        </a>

        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3 ring-1 ring-black/10 bg-white/80 text-neutral-900"
          style={{ boxShadow: softShadow }}
        >
          <MapPin className="w-5 h-5 text-fuchsia-600" />
          <span>Chivilcoy 3051, C1417 CABA</span>
        </div>

        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3 ring-1 ring-black/10 bg-white/80 text-neutral-900"
          style={{ boxShadow: softShadow }}
        >
          <Bike className="w-5 h-5 text-violet-600" />
          <span>Lugar dentro para guardar bicis</span>
        </div>

        <a
          href="https://wa.me/5492345XXXXXX"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-pink-600 text-white hover:opacity-90 transition ring-1 ring-pink-700/30"
          style={{ boxShadow: softShadow }}
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </a>
      </div>

      {/* Mapa */}
      <div
        className="mt-6 rounded-xl overflow-hidden ring-1 ring-black/10"
        style={{ boxShadow: softShadow }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.932423378647!2d-58.508475090190814!3d-34.60587027284075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb62cff9ea3d9%3A0x4da9b27a898df0d9!2sChivilcoy%203051%2C%20C1417%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1753324312126!5m2!1ses!2sar"
          width="100%"
          height="320"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

/* =========================================================
   B) MURO DE MENSAJES + REACCIONES
   ========================================================= */
function Guestbook() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [emoji, setEmoji] = useState("🌟");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const honeypotRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed: Msg[] = JSON.parse(raw);
        setMessages(parsed);
      } else {
        setMessages(seeded);
        localStorage.setItem(LS_KEY, JSON.stringify(seeded));
      }
    } catch {
      setMessages(seeded);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  const sorted = useMemo(() => {
    return [...messages].sort((a, b) => b.createdAt - a.createdAt);
  }, [messages]);

  const tooSoon = () => {
    const last = Number(localStorage.getItem(LS_RATE_KEY) || "0");
    return Date.now() - last < MIN_INTERVAL_MS;
  };

  const addMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (honeypotRef.current?.value) return;
    if (!text.trim()) {
      setError("Escribí un mensajito 🙂");
      return;
    }
    if (text.length > 240) {
      setError("Máximo 240 caracteres.");
      return;
    }
    if (tooSoon()) {
      setError("Esperá unos segundos antes de enviar otro mensaje 🙏");
      return;
    }
    setBusy(true);

    const msg: Msg = {
      id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: name.trim() || undefined,
      text: text.trim(),
      emoji,
      createdAt: Date.now(),
      reactions: { heart: 0, clap: 0, star: 0 },
    };

    setMessages((prev) => [msg, ...prev]);
    setName("");
    setText("");
    setEmoji("🌟");
    localStorage.setItem(LS_RATE_KEY, String(Date.now()));
    setBusy(false);
  };

  const reactTo = (id: string, type: keyof Msg["reactions"]) => {
    const votedKey = `ec_guestbook_voted_${id}_${type}`;
    if (localStorage.getItem(votedKey)) return;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              reactions: { ...m.reactions, [type]: m.reactions[type] + 1 },
            }
          : m
      )
    );
    localStorage.setItem(votedKey, "1");
  };

  return (
    <div
      className="rounded-2xl bg-white/70 backdrop-blur ring-1 ring-black/10 p-6 md:p-8"
      style={{ boxShadow: softShadow }}
    >
      <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
        Muro de mensajes
      </h3>
      <p className="text-neutral-700 mb-5">
        Dejá un mensaje corto para la comunidad. Cuidemos el espacio: sin
        bullying ni agresiones 💜
      </p>

      {/* Form */}
      <form
        onSubmit={addMessage}
        className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-6"
      >
        <input
          ref={honeypotRef}
          type="text"
          name="website"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <input
          type="text"
          placeholder="Tu nombre (opcional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="md:col-span-2 w-full rounded-xl px-4 py-3 ring-1 ring-black/10 bg-white/90 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          style={{ boxShadow: inShadow }}
        />

        <select
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          className="md:col-span-1 w-full rounded-xl px-4 py-3 ring-1 ring-black/10 bg-white/90 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          style={{ boxShadow: inShadow }}
          aria-label="Elegí un emoji"
        >
          {["🌟", "💜", "🎨", "🎭", "🎶", "👏", "🔥", "😊"].map((em) => (
            <option key={em} value={em}>
              {em}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Escribí tu mensaje (máx 240 caracteres)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="md:col-span-2 w-full rounded-xl px-4 py-3 ring-1 ring-black/10 bg-white/90 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          style={{ boxShadow: inShadow }}
          maxLength={240}
        />

        <button
          type="submit"
          disabled={busy || !text.trim()}
          className="md:col-span-1 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 bg-pink-600 text-white ring-1 ring-pink-700/30 hover:opacity-90 active:translate-y-px disabled:opacity-50"
          style={{ boxShadow: softShadow }}
        >
          <Send className="w-4 h-4" />
          Publicar
        </button>
      </form>

      {error && (
        <div className="mb-5 text-sm text-pink-700 bg-pink-50 border border-pink-200 rounded-xl px-3 py-2">
          {error}
        </div>
      )}

      {/* Lista */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((m) => (
          <li
            key={m.id}
            className="rounded-2xl p-4 bg-white/80 backdrop-blur ring-1 ring-black/10 text-neutral-900"
            style={{ boxShadow: softShadow }}
          >
            <div className="flex items-center gap-2 text-2xl">
              {m.emoji ?? "🌟"}
            </div>
            <p className="mt-2 leading-relaxed">{m.text}</p>
            <div className="mt-2 text-sm text-neutral-600">
              — {m.name ?? "Anónimo"} · {fmtTimeAgo(m.createdAt)}
            </div>

            <div className="mt-3 flex items-center gap-3">
              <ReactionButton
                icon={<Heart className="w-4 h-4" />}
                label="heart"
                count={m.reactions.heart}
                onClick={() => reactTo(m.id, "heart")}
                colorClass="text-pink-600"
              />
              <ReactionButton
                icon={<ThumbsUp className="w-4 h-4" />}
                label="clap"
                count={m.reactions.clap}
                onClick={() => reactTo(m.id, "clap")}
                colorClass="text-fuchsia-600"
              />
              <ReactionButton
                icon={<Star className="w-4 h-4" />}
                label="star"
                count={m.reactions.star}
                onClick={() => reactTo(m.id, "star")}
                colorClass="text-violet-600"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReactionButton({
  icon,
  label,
  count,
  onClick,
  colorClass,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
  onClick: () => void;
  colorClass?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 bg-white/90 ring-1 ring-black/10 hover:bg-white transition text-neutral-800 ${
        colorClass ?? ""
      }`}
      style={{ boxShadow: softShadow }}
    >
      {icon}
      <span className="text-sm font-medium">{count}</span>
    </button>
  );
}

function fmtTimeAgo(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "ahora";
  if (m < 60) return `hace ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.floor(h / 24);
  return `hace ${d} día${d > 1 ? "s" : ""}`;
}
