"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const events = [
  {
    id: 1,
    title: 'Exposición de Pintura Contemporánea',
    date: '15 de Agosto, 2025',
    description: 'Una muestra de artistas locales que exploran formas y colores.',
    image: '/events/expo-pintura.jpg',
  },
  {
    id: 2,
    title: 'Taller de Cerámica para Principiantes',
    date: '22 de Agosto, 2025',
    description: 'Aprendé técnicas básicas de modelado con barro.',
    image: '/events/taller-ceramica.jpg',
  },
  {
    id: 3,
    title: 'Encuentro de Muralismo Urbano',
    date: '30 de Agosto, 2025',
    description: 'Artistas invitados pintarán murales en vivo.',
    image: '/events/muralismo.jpg',
  },
];

export default function Events() {
  return (
    <section id="eventos" className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Próximos Eventos</h2>
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="min-w-[300px] bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{event.date}</p>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <Link
                  href={`/eventos/${event.id}`}
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Más info
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
