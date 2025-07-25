"use client";
import React from 'react';

// Define aquí tus actividades junto con la ruta a la imagen y detalles de "más info"
const activities = [
  { id: 1, name: 'Canto/Guitarra', img: '/images/kids/canto-guitarra.jpg', info: 'Aquí irá el texto de más info para Canto/Guitarra.' },
  { id: 2, name: 'Teatro Infantil', img: '/images/kids/teatro-infantil.jpg', info: 'Aquí irá el texto de más info para Teatro Infantil.' },
  { id: 3, name: 'Teclado', img: '/images/kids/teclado.jpg', info: 'Aquí irá el texto de más info para Teclado.' },
  { id: 4, name: 'Danza y Expresión Corporal', img: '/images/kids/danza-expresion.jpg', info: 'Aquí irá el texto de más info para Danza y Expresión Corporal.' },
  { id: 5, name: 'Urbano Kids', img: '/images/kids/urbano-kids.jpg', info: 'Aquí irá el texto de más info para Urbano Kids.' },
  { id: 6, name: 'Arte y Juego', img: '/images/kids/arte-juego.jpg', info: 'Aquí irá el texto de más info para Arte y Juego.' },
  { id: 7, name: 'Yoga Infantil', img: '/images/kids/yoga-infantil.jpg', info: 'Aquí irá el texto de más info para Yoga Infantil.' },
];

export default function Kids() {
  const [selected, setSelected] = React.useState<number | null>(null);

  return (
    <section
      id="kids"
      className="py-16 bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/images/patio3.jpg')" }}
    >
      {/* Contenedor con mismo estilo que sección Contacto */}
      <div className="max-w-4xl mx-auto px-4 bg-white bg-opacity-90 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center text-violet-900 mb-8">Kids</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="group flex flex-col bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={activity.img}
                alt={activity.name}
                className="w-full h-40 object-cover rounded-md mb-4 transform group-hover:scale-105 transition-transform duration-500"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{activity.name}</h3>
              <button
                onClick={() => setSelected(activity.id)}
                className="mt-auto text-violet-900 hover:underline"
              >
                Más info
              </button>

              {selected === activity.id && (
                <p className="mt-4 text-gray-800">{activity.info}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}