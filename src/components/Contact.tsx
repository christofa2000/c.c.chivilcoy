"use client";
import React from 'react';
import { Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contacto" className="py-16">
      <div className="max-w-4xl mx-auto px-4 bg-white bg-opacity-90 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center text-violet-900 mb-8">Contacto</h2>

        <form
          action="https://formspree.io/f/mnnzprlk"
          method="POST"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <input
            type="text"
            name="name"
            placeholder="Tu Nombre"
            required
            className="p-3 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded focus:outline-none focus:border-pink-600"
          />
          <input
            type="email"
            name="email"
            placeholder="Tu Email"
            required
            className="p-3 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded focus:outline-none focus:border-pink-600"
          />
          <input
            type="text"
            name="subject"
            placeholder="Asunto"
            className="p-3 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded focus:outline-none focus:border-pink-600 md:col-span-2"
          />
          <textarea
            name="message"
            placeholder="Mensaje"
            rows={4}
            required
            className="p-3 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded focus:outline-none focus:border-pink-600 md:col-span-2"
          ></textarea>
          <button
            type="submit"
            className="md:col-span-2 py-3 bg-pink-700 hover:bg-pink-800 text-white font-medium rounded"
          >
            Enviar Mensaje
          </button>
        </form>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Phone className="w-6 h-6 text-pink-600 mr-2" />
            <a href="tel:+5492345XXXXXX" className="hover:text-pink-600 text-gray-800">
              +54 9 2345 XXXXXX
            </a>
          </div>
          <div className="flex items-center">
            <MapPin className="w-6 h-6 text-pink-600 mr-2" />
            <span className="text-gray-800">Chivilcoy 3051, C1417 Cdad. Autónoma de Buenos Aires.</span>
          </div>
        </div>

        <div className="mt-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.932423378647!2d-58.508475090190814!3d-34.60587027284075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb62cff9ea3d9%3A0x4da9b27a898df0d9!2sChivilcoy%203051%2C%20C1417%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1753324312126!5m2!1ses!2sar" 
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded"
          ></iframe>
        </div>
      </div>
    </section>
  );
}


