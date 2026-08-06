/* ═══════════════════════════════════════════════════════════
   ALEXANDRA ORTEGA · Hoja de vida
   1. Marca html.js (para que sin JS la página se vea completa)
   2. Navegación + menú móvil
   3. Riel de progreso
   4. Apariciones al hacer scroll
   5. Pistas: navegación lateral (casos y trayectoria)
   6. Capa de evidencia: filtro por área, con conteos derivados del DOM
   7. Salida a PDF: hoja de vida completa, portafolio y versión enfocada
   8. Parámetros de URL: ?revision=1 y ?para=...
   ═══════════════════════════════════════════════════════════ */

/* 1. PRIMERA INSTRUCCIÓN. Sin esto, styles.css deja el documento
      visible (que es lo correcto) y aquí activamos las animaciones. */
document.documentElement.classList.add("js");

(function () {
  "use strict";

  /* La dirección pública se declara UNA sola vez. Si cambia el dominio,
     se cambia aquí y todos los textos del PDF la toman de acá. */
  const URL_PUBLICA = "alexandra-ortega-cv-web.vercel.app";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Se declaran aquí arriba porque el filtro (6) y la impresión (7) se
  // usan mutuamente: el filtro habilita el botón de la versión enfocada.
  const parametros = new URLSearchParams(window.location.search);
  const btnEnfocado = $("#btnPdfEnfocado");

  const NOMBRES_AREA = {
    deportivo: "Rendimiento deportivo",
    emocional: "Gestión emocional",
    duelo: "Duelo, derrota y lesión",
    caracter: "Carácter y disciplina",
    equipo: "Equipo y convivencia",
    genero: "Liderazgo y enfoque de género",
    adicciones: "Prevención de adicciones",
    territorio: "Territorio y comunidad",
  };

  /* ── 2. Navegación ─────────────────────────────────────── */
  const nav = $("#nav");
  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");

  if (nav) {
    const onScrollNav = () => nav.classList.toggle("nav--solid", window.scrollY > 40);
    window.addEventListener("scroll", onScrollNav, { passive: true });
    onScrollNav();
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const abierto = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(abierto));
      navToggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ── 3. Riel de progreso ───────────────────────────────── */
  const rielBarra = $("#rielBarra");
  if (rielBarra) {
    const pintarRiel = () => {
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      const pct = alto > 0 ? (window.scrollY / alto) * 100 : 0;
      rielBarra.style.width = Math.min(100, Math.max(0, pct)) + "%";
    };
    window.addEventListener("scroll", pintarRiel, { passive: true });
    window.addEventListener("resize", pintarRiel);
    pintarRiel();
  }

  /* ── 4. Apariciones al hacer scroll ────────────────────── */
  const reveals = $$(".reveal");
  reveals.forEach((el) => {
    const hermanos = el.parentElement
      ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"))
      : [el];
    el.style.setProperty("--d", `${Math.min(hermanos.indexOf(el) * 0.1, 0.5)}s`);
  });

  if (reducirMovimiento || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => obs.observe(el));
  }

  /* ── 5. PISTAS: navegación lateral ─────────────────────── */
  $$("[data-pista]").forEach((pista) => {
    const viewport = pista.querySelector(".pista__viewport");
    const items = Array.from(pista.querySelectorAll(".pista__item"));
    const anterior = pista.querySelector('.pista__nav[data-dir="-1"]');
    const siguiente = pista.querySelector('.pista__nav[data-dir="1"]');
    const posicion = pista.querySelector(".pista__pos");
    if (!viewport || !items.length) return;

    // Desplazamiento que deja la ficha i pegada al borde izquierdo
    const offsetDe = (i) => items[i].offsetLeft - items[0].offsetLeft;

    // Índice de la primera ficha visible (la de más a la izquierda).
    // Se mide contra el borde izquierdo, NO contra el centro: cuando caben
    // varias fichas a la vez, el centro cae sobre la segunda y el
    // indicador mentiría diciendo "2 / 5" estando al principio.
    const indiceActual = () => {
      const x = viewport.scrollLeft;
      let mejor = 0;
      let menorDist = Infinity;
      items.forEach((_, i) => {
        const d = Math.abs(offsetDe(i) - x);
        if (d < menorDist) { menorDist = d; mejor = i; }
      });
      return mejor;
    };

    let reintento = null;
    const irA = (i) => {
      const idx = Math.max(0, Math.min(items.length - 1, i));
      const destino = Math.max(0, offsetDe(idx));

      viewport.scrollTo({
        left: destino,
        behavior: reducirMovimiento ? "auto" : "smooth",
      });

      // Red de seguridad: el desplazamiento suave del navegador depende de
      // que la página esté dibujando fotogramas. Si no pudo (pestaña en
      // segundo plano, equipo lento), dejamos la ficha en su sitio igual.
      if (reintento) clearTimeout(reintento);
      reintento = setTimeout(() => {
        if (Math.abs(viewport.scrollLeft - destino) > 4) viewport.scrollLeft = destino;
        refrescar();
      }, 700);
      refrescar();
    };

    const refrescar = () => {
      const i = indiceActual();
      if (posicion) posicion.textContent = `${i + 1} / ${items.length}`;
      // Tolerancia de 8 px: el viewport tiene relleno, así que en reposo
      // scrollLeft vale ~5 y no 0. Con tolerancia de 2 el botón «anterior»
      // nunca se deshabilitaba al principio.
      const alPrincipio = viewport.scrollLeft <= 8;
      const alFinal = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 8;
      if (anterior) anterior.disabled = alPrincipio;
      if (siguiente) siguiente.disabled = alFinal;
    };

    if (anterior) anterior.addEventListener("click", () => irA(indiceActual() - 1));
    if (siguiente) siguiente.addEventListener("click", () => irA(indiceActual() + 1));

    // Teclado: flechas izquierda y derecha cuando la pista tiene el foco
    viewport.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); irA(indiceActual() + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); irA(indiceActual() - 1); }
      if (e.key === "Home") { e.preventDefault(); irA(0); }
      if (e.key === "End") { e.preventDefault(); irA(items.length - 1); }
    });

    let tmr = null;
    viewport.addEventListener("scroll", () => {
      if (tmr) clearTimeout(tmr);
      tmr = setTimeout(refrescar, 90);
    }, { passive: true });
    window.addEventListener("resize", refrescar);
    refrescar();
  });

  /* ── 6. CAPA DE EVIDENCIA ──────────────────────────────── */
  const capa = $("#capa");
  const registros = $$("[data-areas]");
  const botonesArea = $$(".capa__boton");
  const btnLimpiar = $("#capaLimpiar");
  const activas = new Set();

  // Los conteos NO están escritos en el HTML: se derivan del documento,
  // así el documento no puede exagerar sus propios números.
  const areasDe = (el) => (el.dataset.areas || "").split(/\s+/).filter(Boolean);

  if (capa && registros.length) {
    capa.hidden = false;

    const secciones = $$("[data-seccion]").map((sec) => ({
      el: sec,
      nombre: sec.dataset.seccion,
      salida: sec.querySelector(".seccion__n"),
      registros: Array.from(sec.querySelectorAll("[data-areas]")),
    }));

    const aplicar = () => {
      const hayFiltro = activas.size > 0;

      registros.forEach((el) => {
        const coincide = !hayFiltro || areasDe(el).some((a) => activas.has(a));
        el.classList.toggle("is-atenuado", hayFiltro && !coincide);
      });

      secciones.forEach((s) => {
        if (!s.salida) return;
        if (!hayFiltro) {
          s.salida.textContent = "";
        } else {
          const n = s.registros.filter((r) => areasDe(r).some((a) => activas.has(a))).length;
          s.salida.textContent = `${n} de ${s.registros.length} registros en esta área`;
        }
        // Aviso honesto cuando la sección no tiene nada del área elegida
        let aviso = s.el.querySelector(".aviso-vacio");
        const vacia = hayFiltro && s.registros.length > 0 &&
          !s.registros.some((r) => areasDe(r).some((a) => activas.has(a)));
        if (vacia && !aviso) {
          aviso = document.createElement("p");
          aviso.className = "aviso-vacio";
          aviso.textContent = "Sin registros documentados en esta área.";
          (s.el.querySelector(".container") || s.el).appendChild(aviso);
        } else if (!vacia && aviso) {
          aviso.remove();
        }
      });

      if (btnLimpiar) btnLimpiar.hidden = !hayFiltro;
      if (btnEnfocado) btnEnfocado.disabled = activas.size !== 1;
    };

    botonesArea.forEach((b) => {
      b.addEventListener("click", () => {
        const area = b.dataset.area;
        const prendido = b.getAttribute("aria-pressed") === "true";
        b.setAttribute("aria-pressed", String(!prendido));
        if (prendido) activas.delete(area); else activas.add(area);
        aplicar();
      });
    });

    const limpiar = () => {
      activas.clear();
      botonesArea.forEach((b) => b.setAttribute("aria-pressed", "false"));
      aplicar();
    };
    if (btnLimpiar) btnLimpiar.addEventListener("click", limpiar);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && activas.size) limpiar();
    });
  }

  /* ── 7. SALIDA A PDF ───────────────────────────────────── */
  const panelDescarga = $("#descargaPanel");
  const btnPdf = $("#btnPdf");
  const btnPortafolio = $("#btnPortafolio");
  const casillaAnexo = $("#impAnexo");
  const sello = $("#selloEnfoque");
  const tituloOriginal = document.title;

  if (panelDescarga) panelDescarga.hidden = false;

  const fechaLarga = () =>
    new Date().toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });

  // Fechas y direcciones que solo se ven en el PDF
  const fFirma = $("#firmaFecha");
  if (fFirma) fFirma.textContent = fechaLarga();
  $$(".url-publica-txt").forEach((el) => (el.textContent = URL_PUBLICA));
  const pie = $("#printPie");
  if (pie) {
    pie.textContent =
      `Hoja de vida · Alexandra Ortega · yaosproactiva@hotmail.com · +57 320 841 3878 · ${URL_PUBLICA} · Impreso el ${fechaLarga()}`;
  }

  // Cinturón: además de la red de seguridad del CSS, forzamos que todo
  // esté visible antes de imprimir. Es el fallo que dejaría medio PDF en blanco.
  function prepararImpresion() {
    $$(".reveal").forEach((el) => el.classList.add("is-visible"));
    document.body.classList.remove("modo-revision");
  }

  function aplicarAnexo() {
    if (!casillaAnexo) return;
    document.body.classList.toggle("sin-anexo", !casillaAnexo.checked);
  }
  if (casillaAnexo) {
    casillaAnexo.addEventListener("change", aplicarAnexo);
    aplicarAnexo();
  }

  if (btnPdf) {
    btnPdf.addEventListener("click", () => {
      document.body.classList.remove("print-enfocado", "print-portafolio");
      prepararImpresion();
      window.print();
    });
  }

  if (btnPortafolio) {
    btnPortafolio.addEventListener("click", () => {
      document.body.classList.remove("print-enfocado");
      document.body.classList.add("print-portafolio");
      prepararImpresion();
      window.print();
    });
  }

  if (btnEnfocado) {
    btnEnfocado.addEventListener("click", () => {
      if (activas.size !== 1) return;
      const area = Array.from(activas)[0];
      const nombre = NOMBRES_AREA[area] || area;
      if (sello) {
        sello.textContent =
          `Versión enfocada en «${nombre}». La hoja de vida completa está en ${URL_PUBLICA}`;
      }
      document.body.classList.remove("print-portafolio");
      document.body.classList.add("print-enfocado");
      prepararImpresion();
      window.print();
    });
  }

  // Chrome usa document.title como nombre sugerido del archivo PDF.
  window.addEventListener("beforeprint", () => {
    prepararImpresion();
    if (document.body.classList.contains("print-portafolio")) {
      document.title = "Portafolio de servicios - Gimnasio Emocional Mentes Brillantes";
    } else if (document.body.classList.contains("print-enfocado") && activas.size === 1) {
      const nombre = NOMBRES_AREA[Array.from(activas)[0]] || "";
      document.title = `Hoja de vida - Alexandra Ortega - enfoque ${nombre}`;
    } else {
      document.title = "Hoja de vida - Alexandra Ortega";
    }
  });

  window.addEventListener("afterprint", () => {
    document.title = tituloOriginal;
    document.body.classList.remove("print-enfocado", "print-portafolio");
    if (parametros.get("revision") === "1") document.body.classList.add("modo-revision");
  });

  /* ── 8. Parámetros de URL ──────────────────────────────── */
  // ?revision=1 → muestra los huecos de datos. Es para Sebastián, no se imprime.
  if (parametros.get("revision") === "1") {
    document.body.classList.add("modo-revision");
  }

  // ?para=Nombre%20de%20la%20entidad → línea «Preparado para:» en F-01
  const para = parametros.get("para");
  const lineaPara = $("#identPara");
  if (para && lineaPara) {
    const limpio = para.trim().slice(0, 60);
    if (/^[\p{L}\p{N} .,·—-]+$/u.test(limpio)) {
      lineaPara.textContent = `Preparado para: ${limpio}`;
      lineaPara.hidden = false;
    }
  }

  /* ── Año dinámico ──────────────────────────────────────── */
  const anio = $("#year");
  if (anio) anio.textContent = new Date().getFullYear();
})();
