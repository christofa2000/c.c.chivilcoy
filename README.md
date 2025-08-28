# 🎨 Espacio de Arte Chivilcoy

Landing page **responsive** para el centro cultural **Espacio de Arte Chivilcoy**, un lugar de encuentro para exposiciones, clases y talleres artísticos en un entorno creativo.

---

## 📋 Contenido

- [Descripción](#descripción)
- [Características](#características)
- [Secciones Implementadas](#secciones-implementadas)
- [Tecnologías](#tecnologías)
- [Actualizaciones Recientes](#actualizaciones-recientes)
- [Instalación](#instalación)
- [Uso](#uso)
- [Tests](#tests)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Despliegue](#despliegue)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

---

## 📝 Descripción

La landing page de **Espacio de Arte Chivilcoy** busca transmitir la identidad cultural del espacio con un diseño moderno y accesible:

- Paleta de colores **rosa/violeta** con degradados vivos y fondo animado de partículas.
- Cabecera fija con menú **responsive** y navegación fluida.
- Carruseles interactivos para mostrar **talleres, clases y actividades infantiles**.
- Sección **Visítanos**: dirección, teléfono, WhatsApp y mapa embebido.
- Espacio **lúdico de comunidad**: un _Muro de Mensajes_ donde los visitantes dejan comentarios y reacciones.

El diseño está pensado para ser **mobile-first**, rápido y fácil de mantener.

---

## 🚀 Características

- 🌈 **Fondo animado** con partículas rosas y violetas.
- 📱 **Menú fijo y hamburguesa en móvil**.
- 🎠 **Carruseles** con zoom al seleccionar (Kids, Talleres, Clases).
- 🗂 **Sección Colonia** con toggle de Verano/Invierno.
- 📍 **Visítanos compacto**: dirección, mapa, teléfono, WhatsApp y facilidades para bici.
- 💬 **Muro de Mensajes interactivo** con emojis y reacciones (persistencia local).
- ♿ **Accesibilidad básica** (contraste, `alt` en imágenes, navegación clara).

---

## 🖌 Actualizaciones Recientes

- 🟣 **Nuevo fondo animado** con partículas luminosas rosas/violetas.
- 💬 **Muro de Mensajes** reemplazó al formulario de contacto tradicional.
- 🚲 **Info de movilidad** simplificada: se quitó colectivo/auto, queda solo “Lugar dentro para guardar bicis”.
- 🔤 **Tipografía global**: uso de `Raleway` para todo el sitio.
- 🖼 **Carruseles mejorados**:
  - Cards más grandes y centradas al click.
  - Imágenes optimizadas con `next/image`.
  - Mejor rendimiento en mobile y desktop.

---

## 🗂 Secciones Implementadas

1. **Hero:** Imagen de fondo + bienvenida al centro cultural.
2. **Kids:** Carrusel de actividades para niñxs (Canto/Guitarra, Teatro, Danza, Yoga Infantil, etc.).
3. **Talleres:** Carrusel con talleres artísticos y de formación.
4. **Clases:** Carrusel con baile, artes marciales y movimiento.
5. **Colonia:** Toggle de Verano/Invierno con card informativa.
6. **Visítanos:** Teléfono, WhatsApp, dirección, mapa y bici.
7. **Muro de Mensajes:** Espacio comunitario con mensajes, emojis y reacciones.

---

## 🛠 Tecnologías

- ⚛️ **Next.js 13** (App Router)
- ⚡ **React** + **TypeScript**
- 🎨 **Tailwind CSS**
- 🎭 **Framer Motion** (animaciones)
- 🖼 **next/image** (optimización)
- 🗺 **Google Maps Embed**
- 🎨 **Lucide React** (íconos SVG)

---

## 🔧 Instalación

```bash
git clone https://github.com/TU_USUARIO/espacio-arte-chivilcoy.git
cd espacio-arte-chivilcoy
npm install
```

---

## 🚀 Uso

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## ✅ Tests

Este proyecto utiliza [Jest](https://jestjs.io/) y [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) para las pruebas unitarias y de componentes.

Para ejecutar la suite de tests una vez:

```bash
npm run test
```

Para ejecutar los tests en modo interactivo (watch mode):

```bash
npm run test:watch
```
