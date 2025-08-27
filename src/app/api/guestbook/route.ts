// src/app/api/guestbook/route.ts
import { NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";

const STORE = "guestbook";
const KEY = "messages.json";
const MIN_INTERVAL_MS = 25_000;

function getIp(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  return ip || "0.0.0.0";
}

const lastPostMap = new Map<string, number>();

type Msg = {
  id: string;
  name?: string | null;
  text: string;
  emoji?: string;
  createdAt: number;
  reactions: { heart: number; clap: number; star: number };
};

async function readAll(): Promise<Msg[]> {
  const store = getStore(STORE);
  const raw = await store.get(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw as string) as Msg[];
  } catch {
    return [];
  }
}

async function writeAll(msgs: Msg[]) {
  const store = getStore(STORE);
  await store.set(KEY, JSON.stringify(msgs));
}

export async function GET() {
  const msgs = await readAll();
  // orden descendente por fecha
  msgs.sort((a, b) => b.createdAt - a.createdAt);
  return NextResponse.json({ messages: msgs.slice(0, 200) });
}

export async function POST(req: Request) {
  const ip = getIp(req);
  const now = Date.now();
  const last = lastPostMap.get(ip) || 0;
  if (now - last < MIN_INTERVAL_MS) {
    return NextResponse.json(
      { error: "Esperá unos segundos antes de enviar otro mensaje 🙏" },
      { status: 429 }
    );
  }

  const { name, text, emoji } = await req.json();
  const cleanName = (name ?? "").toString().slice(0, 80);
  const cleanText = (text ?? "").toString().slice(0, 240).trim();
  const cleanEmoji = (emoji ?? "🌟").toString().slice(0, 8);

  if (!cleanText)
    return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });

  const msgs = await readAll();
  const msg: Msg = {
    id: `m-${now}-${Math.random().toString(36).slice(2, 7)}`,
    name: cleanName || null,
    text: cleanText,
    emoji: cleanEmoji,
    createdAt: now,
    reactions: { heart: 0, clap: 0, star: 0 },
  };
  msgs.unshift(msg);
  await writeAll(msgs);

  lastPostMap.set(ip, now);
  return NextResponse.json({ message: msg });
}

export async function PATCH(req: Request) {
  const { id, type } = (await req.json()) as {
    id: string;
    type: "heart" | "clap" | "star";
  };
  if (!id || !["heart", "clap", "star"].includes(type))
    return NextResponse.json(
      { error: "Parámetros inválidos" },
      { status: 400 }
    );

  const msgs = await readAll();
  const idx = msgs.findIndex((m) => m.id === id);
  if (idx === -1)
    return NextResponse.json({ error: "No existe" }, { status: 404 });

  msgs[idx] = {
    ...msgs[idx],
    reactions: {
      ...msgs[idx].reactions,
      [type]: msgs[idx].reactions[type] + 1,
    },
  };
  await writeAll(msgs);
  return NextResponse.json({ ok: true, id, type });
}
