# Alexandra Ortega — CV Web / Landing Page

Página web de marca personal de **Alexandra Ortega**: Psicóloga, Conferencista, Tallerista y Coach Ontológico, fundadora de la técnica **Gimnasio Emocional** y directora de proyectos de la **Fundación Social Mentes Brillantes** desde 2016.

La página presenta su trayectoria, áreas de experiencia, reconocimientos, formación, publicaciones y datos de contacto en formato de landing page premium, responsive y accesible.

## Tecnologías

- **HTML5** semántico (SEO básico: title, description, Open Graph)
- **CSS3** puro — variables de diseño, degradados, formas orgánicas, animaciones
- **JavaScript** vanilla — revelado al hacer scroll (IntersectionObserver), contadores animados, menú móvil
- Tipografías [Fraunces](https://fonts.google.com/specimen/Fraunces) y [Outfit](https://fonts.google.com/specimen/Outfit) vía Google Fonts
- Sin frameworks ni dependencias de build: es un sitio 100 % estático

## Estructura

```
├── index.html        # Página completa (todas las secciones)
├── styles.css        # Sistema de diseño y estilos responsive
├── script.js         # Animaciones y microinteracciones
└── assets/
    ├── alexandra-sq.jpg    # Foto principal (hero)
    └── alexandra-wide.jpg  # Versión horizontal alternativa
```

## Cómo abrirlo localmente

No requiere instalación ni build. Basta con clonar y abrir el archivo:

```bash
git clone https://github.com/fundacion-social-mentes-brillantes/alexandra-ortega-cv-web.git
cd alexandra-ortega-cv-web
```

Luego abre `index.html` con doble clic en cualquier navegador moderno, o sirve la carpeta con un servidor estático si lo prefieres:

```bash
npx serve .
```

## Personalización rápida

- **Colores:** edita las variables del bloque `:root` al inicio de `styles.css`.
- **Textos:** edita `index.html`; las secciones están señaladas con comentarios.
- **Foto:** reemplaza `assets/alexandra-sq.jpg` por otra imagen cuadrada.

## Autoría

© Fundación Social Mentes Brillantes · Gimnasio Emocional Mentes Brillantes
Contacto: [Instagram @Gimnasioemocional_mb](https://www.instagram.com/gimnasioemocional_mb)
