# 🎨 Espacio de Arte Chivilcoy

Landing page responsive de un centro cultural en Chivilcoy: exposiciones, clases y talleres artísticos.

---

## 📋 Contenido

- [Descripción](#descripción)
- [Características](#características)
- [Secciones Implementadas](#secciones-implementadas)
- [Tecnologías](#tecnologías)
- [Actualizaciones Recientes](#actualizaciones-recientes)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Despliegue](#despliegue)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

---

## 📝 Descripción

Esta landing page para **Espacio de Arte Chivilcoy** muestra:

- Cabecera fija con menú responsive y paleta de colores rosa/violeta.
- Sección *Hero* con imagen de fondo y texto de bienvenida.
- Sección de *Próximos Eventos* en carrusel horizontal.
- Formulario de *Contacto* integrable con Formspree (envío directo a tu email).
- Íconos de teléfono y ubicación, y mapa de Google en `iframe`.

El diseño es **mobile-first**, con Tailwind CSS y Next.js 13 (App Router).

---

## 🚀 Características

- Menú fijo y hamburguesa en móvil.
- Degradado de fondo rosa oscuro a violeta intenso.
- Cards de eventos con `next/image` para optimización.
- Formulario de contacto (`Formspree`) sin backend propio.
- Mapa de ubicación embebido.
- Accesibilidad básica (contraste, `alt` en imágenes).
- **Carousel interactivo** para mostrar actividades de Kids, Talleres y Clases.
- **Toggle Pills** para la sección Colonia con modalidades Verano e Invierno.

---

## 🖌 Actualizaciones Recientes

- **Tipografía global moderna:** Migración a `Nunito` como fuente principal, aplicada globalmente (incluyendo títulos de carouseles y componentes de terceros).
- **Globals.css optimizado:** Unificación de estilos y refuerzo para que todos los elementos respeten la tipografía definida.
- **Carruseles mejorados:**  
  - Ahora muestran **3 imágenes simultáneamente** en desktop.  
  - Imágenes ajustadas para ocupar todo el alto y ancho de la card sin distorsión.  
  - Comportamiento responsive optimizado para móvil y tablet.  
- **Mejor visualización en despliegue:** Ajustes de spacing, sombras y gradientes para un look más limpio.

---

## 🗂 Secciones Implementadas

1. **Kids:** Carrusel horizontal con actividades infantiles (Canto/Guitarra, Teatro, Teclado, Danza, Urbano Kids, Arte y Juego, Yoga Infantil), con zoom y centrado al seleccionar.
2. **Talleres:** Carrusel personalizado para listados de talleres (Teatro, Arte, Dibujo, Hatha Yoga, Canto) con estilo moderno y agrandado al click.
3. **Clases:** Carrusel análogo para clases de baile y artes marciales (Bachata, Folclore, Salsa, Artes Marciales, Baile y Movimiento).
4. **Colonia:** Toggle de dos opciones (Verano e Invierno) que despliega una card centrada con imagen e información.

---

## 🛠 Tecnologías

- **Next.js 13** (App Router)
- **React** y **TypeScript**
- **Tailwind CSS**
- **Lucide React** (íconos)
- **Framer Motion** (animaciones)
- **Formspree** (procesamiento de formularios)
- **Google Maps Embed**

---

## 🔧 Instalación

```bash
git clone https://github.com/TU_USUARIO/espacio-arte-chivilcoy.git
cd espacio-arte-chivilcoy
npm install
