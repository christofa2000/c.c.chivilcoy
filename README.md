# Espacio de Arte Chivilcoy

Landing page responsive de un centro cultural ficticio en Chivilcoy: exposiciones, clases y talleres artísticos.

---

## 📋 Contenido

* [Descripción](#descripción)
* [Características](#características)
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
* Icons de teléfono y ubicación, y mapa de Google en `iframe`.

El diseño es **mobile-first**, con Tailwind CSS y Next.js 13 (App Router).

---

## 🚀 Características

* Menú fijo y hamburguesa en móvil.
* Degradado de fondo rosa oscuro a violeta intenso.
* Cards de eventos con `next/image` para optimización.
* Formulario de contacto (`Formspree`) sin backend propio.
* Mapa de ubicación embebido.
* Accesibilidad básica (contraste, `alt` en imágenes).

---

## 🛠 Tecnologías

* **Next.js 13** (App Router)
* **React** y **TypeScript**
* **Tailwind CSS**
* **Lucide React** (íconos)
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
├─ components/        # Componentes React (Header, Hero, Events, Contact…)
├─ public/
│  ├─ events/         # Imágenes usadas en Eventos y Hero
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
4. Opcional: añade variable de entorno `NEXT_PUBLIC_FORMSPREE_ID` si usas env.

---

## 🤝 Contribuir

1. Haz un fork del proyecto.
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`.
3. Commitea tus cambios: `git commit -m "Añade ..."`.
4. Push a la rama: `git push origin feature/nueva-funcionalidad`.
5. Abre un Pull Request.

---

## 📄 Licencia

Este proyecto está bajo licencia MIT.
Consulta el archivo `LICENSE` para más detalles.
