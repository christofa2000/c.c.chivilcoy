'use client';
import React from 'react';
import { Phone, MapPin } from 'lucide-react';

export default function Contact() {
  // sombras suaves para estilo “neumórfico”
  const softShadow = '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.60)';

  return (
    <section id="contacto" className="py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-6 uppercase tracking-wide text-[var(--fg)]">
          Contacto
        </h2>

        {/* Card principal */}
        <div
          className="rounded-2xl bg-white/60 backdrop-blur ring-1 ring-black/10 p-6 md:p-8"
          style={{ boxShadow: softShadow }}
        >
          <form
            action="https://formspree.io/f/mnnzprlk"
            method="POST"
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              required
              className="w-full rounded-xl px-4 py-3 text-[var(--fg)] placeholder-[var(--fg-muted)] ring-1 ring-black/10 bg-white/80 transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              style={{ boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.06), inset -2px -2px 6px rgba(255,255,255,0.7)' }}
            />

            <input
              type="email"
              name="email"
              placeholder="Tu email"
              required
              className="w-full rounded-xl px-4 py-3 text-[var(--fg)] placeholder-[var(--fg-muted)] ring-1 ring-black/10 bg-white/80 transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              style={{ boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.06), inset -2px -2px 6px rgba(255,255,255,0.7)' }}
            />

            <input
              type="text"
              name="subject"
              placeholder="Asunto (opcional)"
              className="w-full md:col-span-2 rounded-xl px-4 py-3 text-[var(--fg)] placeholder-[var(--fg-muted)] ring-1 ring-black/10 bg-white/80 transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              style={{ boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.06), inset -2px -2px 6px rgba(255,255,255,0.7)' }}
            />

            <textarea
              name="message"
              placeholder="Mensaje"
              rows={5}
              required
              className="w-full md:col-span-2 rounded-xl px-4 py-3 text-[var(--fg)] placeholder-[var(--fg-muted)] ring-1 ring-black/10 bg-white/80 transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              style={{ boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.06), inset -2px -2px 6px rgba(255,255,255,0.7)' }}
            />

            {/* Botón con alto contraste y legible siempre */}
            <button
              type="submit"
              className="md:col-span-2 inline-flex justify-center items-center px-6 py-3 rounded-2xl font-semibold transition ring-1 shadow hover:shadow-md active:translate-y-px"
              style={{
                backgroundColor: 'white',
                color: 'var(--accent-strong)',
                borderColor: 'var(--accent)',
                boxShadow: softShadow,
                borderWidth: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget.style.backgroundColor = 'var(--accent-strong)');
                (e.currentTarget.style.color = '#fff');
              }}
              onMouseLeave={(e) => {
                (e.currentTarget.style.backgroundColor = 'white');
                (e.currentTarget.style.color = 'var(--accent-strong)');
              }}
            >
              Enviar mensaje
            </button>
          </form>

          {/* Info de contacto */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="tel:+5492345XXXXXX"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-[var(--fg)] ring-1 ring-black/10 bg-white/70 hover:bg-white transition"
              style={{ boxShadow: softShadow }}
            >
              <Phone className="w-5 h-5 text-[var(--accent)]" />
              <span className="font-medium">+54 9 2345 XXXXXX</span>
            </a>

            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-[var(--fg)] ring-1 ring-black/10 bg-white/70"
              style={{ boxShadow: softShadow }}
            >
              <MapPin className="w-5 h-5 text-[var(--accent)]" />
              <span>Chivilcoy 3051, C1417 CABA</span>
            </div>
          </div>

          {/* Mapa */}
          <div className="mt-6 rounded-xl overflow-hidden ring-1 ring-black/10"
               style={{ boxShadow: softShadow }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.932423378647!2d-58.508475090190814!3d-34.60587027284075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb62cff9ea3d9%3A0x4da9b27a898df0d9!2sChivilcoy%203051%2C%20C1417%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1753324312126!5m2!1ses!2sar"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
