# Espacio de Arte Chivilcoy

Landing page responsive de un centro cultural en Chivilcoy: exposiciones, clases y talleres artísticos.

---

## 📋 Contenido

* [Descripción](#descripción)
* [Características](#características)
* [Secciones Implementadas](#secciones-implementadas)
* [Tecnologías](#tecnologías)
* [Instalación](#instalación)
* [Uso](#uso)
* [Estructura de carpetas](#estructura-de-carpetas)
* [Despliegue](#despliegue)
* [Contribuir](#contribuir)
* [Licencia](#licencia)

---

## 📝 Descripción

Esta landing page para **Espacio de Arte Chivilcoy** muestra:

* Cabecera fija con menú responsive y paleta de colores rosa/violeta.
* Sección *Hero* con imagen de fondo y texto de bienvenida.
* Sección de *Próximos Eventos* en carrusel horizontal.
* Formulario de *Contacto* integrable con Formspree (envío directo a tu email).
* Íconos de teléfono y ubicación, y mapa de Google en `iframe`.

El diseño es **mobile-first**, con Tailwind CSS y Next.js 13 (App Router).

---

## 🚀 Características

* Menú fijo y hamburguesa en móvil.
* Degradado de fondo rosa oscuro a violeta intenso.
* Cards de eventos con `next/image` para optimización.
* Formulario de contacto (`Formspree`) sin backend propio.
* Mapa de ubicación embebido.
* Accesibilidad básica (contraste, `alt` en imágenes).
* **Carousel interactivo** para mostrar actividades de Kids, Talleres y Clases.
* **Toggle Pills** para la sección Colonia con modalidades Verano e Invierno.

---

## 🗂 Secciones Implementadas

1. **Kids**: Carrusel horizontal con actividades infantiles (Canto/Guitarra, Teatro, Teclado, Danza, Urbano Kids, Arte y Juego, Yoga Infantil), con zoom y centrado al seleccionar.
2. **Talleres**: Carrusel personalizado para listados de talleres (Teatro, Arte, Dibujo, Hatha Yoga, Canto) con estilo moderno y agrandado al click.
3. **Clases**: Carrusel análogo para clases de baile y artes marciales (Bachata, Folclore, Salsa, Artes Marciales, Baile y Movimiento).
4. **Colonia**: Toggle de dos opciones (Verano e Invierno) que despliega una card centrada con imagen e información.

---

## 🛠 Tecnologías

* **Next.js 13** (App Router)
* **React** y **TypeScript**
* **Tailwind CSS**
* **Lucide React** (íconos)
* **Framer Motion** (animaciones)
* **Formspree** (procesamiento de formularios)
* **Google Maps Embed**

---

## 🔧 Instalación

Clonar el repositorio y dependencias:

```bash
git clone https://github.com/TU_USUARIO/espacio-arte-chivilcoy.git
cd espacio-arte-chivilcoy
npm install
```

---

## ▶️ Uso

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Abrir en el navegador:

```
http://localhost:3000
```

Para producción:

```bash
npm run build
npm start
```

---

## 📂 Estructura de carpetas

```
espacio-arte-chivilcoy/
├─ app/               # Rutas y layouts (App Router)
│  ├─ api/contact/    # Endpoint Formspree (si se migrase a API propia)
│  ├─ globals.css     # CSS global y configuración de Tailwind
│  ├─ layout.tsx      # RootLayout con degradado de fondo
│  └─ page.tsx        # Página principal (imports de secciones)
├─ components/        # Componentes React
│  ├─ Header.tsx
│  ├─ Hero.tsx
│  ├─ EventsCarousel.tsx
│  ├─ Contact.tsx
│  ├─ KidsCarousel.tsx        # Carrusel de actividades Kids
│  ├─ TalleresCarousel.tsx    # Carrusel de Talleres
│  ├─ ClasesCarousel.tsx      # Carrusel de Clases
│  └─ ColoniaToggle.tsx       # Toggle de Colonia (Verano/Invierno)
├─ public/
│  ├─ images/         # Imágenes usadas en secciones (kids, talleres, clases, colonia)
│  └─ fondo-arbol.jpg # Imagen de fondo Hero
├─ styles/            # (si se mantiene carpeta de estilos extra)
├─ .gitignore
├─ README.md          # Este archivo
├─ next.config.js     # Configuración de Next.js (opcional)
├─ package.json
└─ tailwind.config.js
```

---

## 🌐 Despliegue

Puedes desplegar fácilmente en **Vercel** o **Netlify**:

1. Conecta tu repo GitHub.
2. Configura el comando de build: `npm run build`.
3. Ruta de salida: `.next`.
4. Añade variable de entorno `NEXT_PUBLIC_FORMSPREE_ID` si usas env.

---

## 🤝 Contribuir

1. Haz un fork del proyecto.
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`.
3. Commitea tus cambios: `git commit -m "Añade ..."`.
4. Push a la rama: `git push origin feature/nueva-funcionalidad`.
5. Abre un Pull Request.

---


