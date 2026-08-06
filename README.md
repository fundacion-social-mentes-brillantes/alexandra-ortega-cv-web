# Hoja de vida · Alexandra Ortega · Coach deportivo mental

Página de una sola hoja, sin dependencias, que funciona a la vez como **hoja de vida navegable** y como **generador de tres PDF profesionales**. Publicada en Vercel: https://alexandra-ortega-cv-web.vercel.app

Enfoque: **coach deportivo mental** — el poder de entrenar la mente de deportistas, equipos, escuelas y territorios con la metodología Gimnasio Emocional Mentes Brillantes.

## Cómo se navega

Dos ejes, algo poco común en una hoja de vida:

- **Vertical:** las 14 secciones del documento, numeradas como folios citables (`F-01` … `F-14`). Un comité puede decir «vea el folio F-05».
- **Lateral:** los **casos de éxito** y la **trayectoria año por año** se recorren de lado. En celular se desliza con el dedo; en computador hay flechas, y funciona con el teclado (← → Inicio Fin) cuando la pista tiene el foco.

Además, los **8 botones de área de entrenamiento** filtran todo el documento: lo que no pertenece al área se **atenúa, nunca se oculta**, y cada sección declara «3 de 6 registros en esta área». Esos números **no están escritos en el HTML**: los cuenta el JavaScript recorriendo el propio documento, así que el documento no puede exagerar sus propias cifras.

## Los tres PDF

Todos se generan con el navegador, sin librerías. Tamaño **Carta** (no A4, porque se radica en Colombia).

| Botón | Qué sale |
|---|---|
| **Descargar hoja de vida en PDF** | El documento completo con firma y declaración de veracidad. Incluye el portafolio si la casilla está marcada. |
| **Descargar portafolio · 1 hoja** | Solo el portafolio de servicios, en una hoja. Para mandar como propuesta. |
| **Versión enfocada** | Solo lo del área filtrada, sellado con la nota que remite a la versión completa. Se habilita al activar **una** área. |

En el cuadro de impresión: **Destino** Guardar como PDF · **Tamaño** Carta · **Escala** 100 % · **Márgenes** predeterminados · **desmarque** «Encabezados y pies de página». El PDF de referencia se genera en **Chrome o Edge**.

> En convocatorias formales se manda **siempre la versión completa**. La enfocada es para propuestas comerciales.

## Direcciones especiales

- `?revision=1` → **modo revisión de Sebastián.** Pinta en amarillo los 10 datos que faltan, con el detalle exacto de cada uno. Nunca se imprime.
- `?para=Nombre%20de%20la%20entidad` → escribe «Preparado para: …» en la identificación. Sin el parámetro la línea no se dibuja.

## Cómo agregarle cosas

- **Un empleo nuevo:** copie un bloque `<article class="exp">` en la sección `#experiencia`. No lleva `data-areas` — la experiencia es núcleo y ningún filtro la recorta.
- **Un caso de éxito:** copie un `<li class="pista__item caso">` dentro de `#pistaCasos`. Póngale `data-areas` con 1 a 3 áreas.
- **Una referencia:** reemplace la línea de `#referencias` por las filas reales.
- **Las áreas válidas** son: `deportivo`, `emocional`, `duelo`, `caracter`, `equipo`, `genero`, `adicciones`, `territorio`.

## Reglas que NO se deben romper

1. **`.reveal` nace visible** en `styles.css`; solo se oculta bajo `html.js`. Si se invierte, todo lo que el lector no alcance a bajar **sale en blanco en el PDF**, y la página sin JavaScript queda vacía.
2. **Nunca poner `scroll-behavior: smooth` en `.pista__viewport`.** El movimiento de los botones lo maneja `script.js`, con red de seguridad para cuando el navegador no puede animar.
3. **No inventar datos.** Donde falta el dato, la línea **no se dibuja** — nada de «Ciudad: ______» ni «[sin fecha]». Los huecos viven solo en `?revision=1`.
4. **Ningún aval de la OMS.** La hoja de vida original decía que el programa de 12 pasos está «reconocido por la OMS»: es falso y se retiró. Se menciona la técnica sin atribuirle aval.
5. **El nombre visible de la organización es «Gimnasio Emocional Mentes Brillantes»**, no «Fundación Social». El NIT solo en la forma de contratación y el pie.

## Datos que faltan

Abra `?revision=1` para verlos todos, marcados en amarillo sobre el propio documento.

**Publicado el 2026-08-05** con la autorización de Kevin Jiménez confirmada, y sin esperar la tarjeta profesional, por decisión expresa de Sebastián.

Sigue pendiente y conviene resolverlo:

- **Tarjeta profesional de psicología** (Ley 1090 de 2006). Es lo primero que revisa un área jurídica en una contratación pública. No hay ninguna casilla vacía en el documento —una casilla en blanco ahí hunde la hoja de vida— pero cuando llegue el número entra como una fila más de `F-01`.
- Ciudad de residencia · universidad y año de grado de Psicología · institución y año del coach ontológico · año de la Gala de Control Social · títulos de los tres libros · años y objeto de Fundación Resolver · dos referencias · años y torneo exacto del caso de Kevin Jiménez · los demás casos de éxito.

La cédula **52.377.161 está publicada** en el documento por decisión expresa de Sebastián. Queda en una URL pública e indexable por buscadores.
