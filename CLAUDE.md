# CLAUDE.md

Guía para asistentes de IA que trabajen en este repositorio.

## Qué es esto

Una página de aterrizaje de marca personal / **hoja de vida web** de una sola
página para **Alexandra Ortega** — psicóloga, coach ontológica, conferencista y
formadora en salud mental, fundadora de la técnica *Gimnasio Emocional Mentes
Brillantes (GEMB)* y directora de proyectos de la *Fundación Social Mentes
Brillantes*.

Es un **sitio 100 % estático**: HTML5 puro, CSS3 escrito a mano y un único
archivo de JavaScript vanilla. **No hay paso de build, ni framework, ni gestor de
paquetes, ni dependencias que instalar.** Todo el contenido está en **español
(`lang="es"`)** y el sitio está dirigido a un público colombiano.

## Archivos

| Archivo | Propósito |
|---------|-----------|
| `index.html` | La página completa — todas las secciones viven aquí. ~440 líneas. |
| `styles.css` | Sistema de diseño completo y todos los estilos responsive. ~1000 líneas. |
| `script.js` | Toda la interactividad: nav según scroll, menú móvil, aparición al hacer scroll, contadores animados, año dinámico. Una sola IIFE. |
| `assets/alexandra-sq.jpg` | Foto cuadrada del hero (la usa la página + la imagen de Open Graph). |
| `assets/alexandra-wide.jpg` | Foto horizontal alternativa (actualmente sin usar en el marcado). |
| `README.md` | Descripción del proyecto orientada a personas (en español). |
| `.gitignore` | Ignora archivos del SO/editor, `node_modules/`, `dist/`, `.vercel`. |

No hay otros directorios de código fuente.

## Ejecutar localmente

No requiere instalación. Cualquiera de estas opciones:

```bash
# Solo ábrelo
open index.html          # o doble clic en un explorador de archivos

# O sírvelo de forma estática (mejor para probar rutas relativas / etiquetas OG)
npx serve .
```

**No hay pruebas, ni linters, ni build en CI** configurados. "Verificar un
cambio" significa abrir la página en un navegador y revisar visualmente la
sección afectada tanto en ancho de escritorio como móvil.

## Despliegue

El sitio se despliega en **Vercel** (nótese la entrada `.vercel` en
`.gitignore`). Hacer push a la rama por defecto dispara un despliegue de Vercel.
Como no hay comando de build, Vercel sirve los archivos tal cual.

## Arquitectura y convenciones

### HTML (`index.html`)
- La página es un `<header>` de navegación + un `<main>` que contiene una
  secuencia de bloques `<section>`, y luego un `<footer>`. Cada sección se
  delimita con un comentario tipo banner en caracteres de caja, p. ej.
  `<!-- ╭─────────── HERO ───────────╮ -->`. Mantén este estilo al añadir
  secciones.
- **Los `id` de sección sirven también como anclas de navegación.** Orden actual:
  `inicio` (hero) → `perfil` → `trayectoria` → `cumbre` → `servicios` →
  `biblioteca` → `incidencia` → `experiencia` → `reconocimientos` →
  `formacion` → `contacto`. La navegación (`#navLinks`) enlaza un subconjunto
  curado de estos; si añades una sección que deba ser navegable, agrega también
  el `<a href="#...">` correspondiente.
- **La accesibilidad es intencional**: `aria-label`, `aria-hidden` en elementos
  decorativos, `aria-expanded` en el botón del menú, texto `alt` descriptivo.
  Conserva todo esto al editar. Los brillos/anillos/SVG decorativos siempre
  llevan `aria-hidden="true"`.
- El SEO/meta vive en `<head>`: `title`, `description`, `author` y etiquetas Open
  Graph. Actualízalos cuando cambie el mensaje principal o la foto.

### CSS (`styles.css`)
- **Los tokens de diseño son propiedades personalizadas de CSS en `:root`**
  (inicio del archivo): colores de marca (`--ink`, `--plum`, `--lavender`,
  `--gold`, `--cream`, …), fuentes (`--font-display` = Fraunces para títulos,
  `--font-body` = Outfit para texto), más `--radius`, `--shadow`, `--transition`.
  **Cambia la paleta aquí, no en línea.** Usa estos tokens en lugar de valores
  fijos en reglas nuevas.
- **El nombrado es estilo BEM**: `block`, `block__element`, `block--modifier`
  (p. ej. `hero__name`, `btn--gold`, `section__title--light`). Reutiliza el nombre
  del bloque existente al extender un componente.
- El archivo está organizado en secciones claramente comentadas
  (`/* ── Hero ── */`, `/* ── Servicios ── */`, …) que reflejan las secciones del
  HTML, y termina con un único bloque `/* ── Responsive ── */` de media queries.
  **Coloca los estilos de componentes nuevos en la sección correspondiente y
  mantén los ajustes responsive en el bloque responsive.**
- El layout usa `clamp()` para tipografía/espaciado fluidos y grid/flex de CSS.
  Las secciones oscuras (Cumbre, Reconocimientos) usan modificadores de texto
  claro (`--light`).

### JavaScript (`script.js`)
- Una sola IIFE en modo `"use strict"`, organizada en cuatro temas numerados:
  (1) estado de la nav según scroll + menú móvil, (2) aparición al hacer scroll
  con `IntersectionObserver`, (3) contadores animados, (4) año dinámico del
  footer.
- **Se respeta `prefers-reduced-motion`** y hay alternativas elegantes cuando
  `IntersectionObserver` no está disponible — conserva ambas al tocar las
  animaciones.
- **La clase `.reveal` es el gancho de animación de aparición al hacer scroll.**
  Cualquier elemento con `reveal` aparece con un fundido/desplazamiento al entrar
  en pantalla (con un pequeño escalonado entre hermanos). Añade `reveal` al
  contenido nuevo que deba animarse. Su CSS vive bajo
  `/* ── Animaciones al hacer scroll ── */`.
- **Los contadores animados** usan `<span class="counter" data-target="N">`. El
  texto inicial visible debe ser `0` (o el valor objetivo para valores tipo año
  que no deban contar desde cero — ver las tarjetas `2016`/`2025` en la sección
  Impacto).
- No hay librerías JS externas; mantenlo sin dependencias y vanilla.

## Guía de edición

- **El contenido/copy vive en `index.html`.** Está en español — conserva el tono
  (cálido, profesional, enfocado en salud mental y comunidad) y los acentos.
- Al añadir una tarjeta a una grilla (servicios, áreas, reconocimientos, modelo,
  trayectoria), copia un hermano `<article>`/`<li>` existente, mantén sus clases
  incluyendo `reveal`, y la grilla se encarga del layout automáticamente.
- Los datos de contacto son reales y aparecen en varios lugares (NIT del footer,
  `mailto:`, `tel:`, enlaces de Instagram/Facebook). Actualiza **todas** las
  apariciones a la vez.
- Mantén la página como un sitio estático autocontenido. **No introduzcas un
  sistema de build, framework ni dependencias de npm** salvo que el usuario lo
  pida explícitamente — hacerlo cambiaría todo el modelo de despliegue.

## Flujo de trabajo con Git

- Trabaja en la rama de funcionalidad designada; haz commits con mensajes claros
  y push con `git push -u origin <rama>`. **No** abras un pull request salvo que
  se pida explícitamente.
- La rama por defecto es `main`.
