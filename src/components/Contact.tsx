'use client';
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  // Empieza en modo nocturno
  const [darkMode, setDarkMode] = useState(true);

  // Aplicar clase dark para Tailwind
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  // Colores principales de fondo violeta
  const bgLight = '#E6E6FA';       // Lavanda claro
  const bgDark = '#7D3C98';        // Violeta suave
  const bgColor = darkMode ? bgDark : bgLight;

  // Colores rosa más oscuros para acentos
  const pinkLight = '#AD1457';     // Rosa fuerte
  const pinkDark = '#880E4F';      // Rosa oscuro en dark

  // Sombras en tonos rosa/violeta
  const shadowDark = darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(209, 145, 200, 0.8)';
  const shadowLight = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,1)';
  const neumorphic = `8px 8px 16px ${shadowDark}, -8px -8px 16px ${shadowLight}`;

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300"
      style={{ background: bgColor }}
    >
      {/* Toggle dark mode */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 p-2 rounded-full z-50 transition-shadow duration-300"
        style={{ background: bgColor, boxShadow: neumorphic }}
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? (
          <Sun className="w-6 h-6" style={{ color: pinkLight }} />
        ) : (
          <Moon className="w-6 h-6" style={{ color: pinkDark }} />
        )}
      </button>

      <section id="contacto" className="w-full max-w-4xl">
        <div
          className="rounded-xl p-6 transition-shadow duration-300"
          style={{ background: bgColor, boxShadow: neumorphic }}
        >
          <h2
            className="text-4xl font-bold text-center mb-6"
            style={{ color: darkMode ? '#FFFFFF' : '#7D3C98' }}
          >
            Contacto
          </h2>

          <form
            action="https://formspree.io/f/mnnzprlk"
            method="POST"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          >
            {['name', 'email', 'subject'].map((field) => (
              <input
                key={field}
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                placeholder={
                  field === 'name' ? 'Tu Nombre' : field === 'email' ? 'Tu Email' : 'Asunto'
                }
                required={field !== 'subject'}
                className="p-4 rounded-lg text-base transition-shadow duration-300"
                style={{
                  background: bgColor,
                  boxShadow: neumorphic,
                  border: 'none',
                  color: darkMode ? '#FFF' : '#111',
                }}
              />
            ))}

            <textarea
              name="message"
              placeholder="Mensaje"
              rows={4}
              required
              className="p-4 rounded-lg text-base transition-shadow duration-300 md:col-span-2"
              style={{
                background: bgColor,
                boxShadow: neumorphic,
                border: 'none',
                color: darkMode ? '#FFF' : '#111',
              }}
            />

            <button
              type="submit"
              className="mt-2 md:col-span-2 py-3 rounded-lg text-lg font-semibold transition-shadow duration-300"
              style={{
                background: darkMode ? pinkDark : pinkLight,
                boxShadow: neumorphic,
                color: '#FFF',
              }}
            >
              Enviar Mensaje
            </button>
          </form>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div
              className="flex items-center p-3 rounded-lg transition-shadow duration-300"
              style={{ background: bgColor, boxShadow: neumorphic }}
            >
              <Phone className="w-5 h-5 mr-2" style={{ color: darkMode ? '#FFF' : '#111' }} />
              <a
                href="tel:+5492345XXXXXX"
                className="text-base font-medium"
                style={{ color: darkMode ? '#FFF' : '#111' }}
              >
                +54 9 2345 XXXXXX
              </a>
            </div>
            <div
              className="flex items-center p-3 rounded-lg transition-shadow duration-300"
              style={{ background: bgColor, boxShadow: neumorphic }}
            >
              <MapPin className="w-5 h-5 mr-2" style={{ color: darkMode ? '#FFF' : '#111' }} />
              <span className="text-base" style={{ color: darkMode ? '#FFF' : '#111' }}>
                Chivilcoy 3051, C1417 Cdad. Autónoma de Buenos Aires.
              </span>
            </div>
          </div>

          {/* Mapa */}
          <div className="rounded-lg overflow-hidden transition-shadow duration-300" style={{ boxShadow: neumorphic }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.932423378647!2d-58.508475090190814!3d-34.60587027284075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb62cff9ea3d9%3A0x4da9b27a898df0d9!2sChivilcoy%203051%2C%20C1417%20Cdad.%20Aut%C3%B3noma%20de%20Buenos Aires!5e0!3m2!1ses!2sar!4v1753324312126!5m2!1ses!2sar"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}