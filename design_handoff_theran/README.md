# Handoff: THERAN — Sitio web de clínica de medicina y estética

> **Idioma del sitio:** Español (es). Toda la copy está en español. Mantenerlo.

## Overview
Sitio web de presentación para **THERAN**, una clínica privada de medicina y estética en Barcelona. El objetivo es transmitir lujo discreto ("quiet luxury") con una paleta de neutros cálidos, generar confianza médica y conducir al visitante a **solicitar una valoración** (formulario de reserva). Dos páginas: **Home** y **Tratamientos**.

## About the Design Files
Los archivos de este paquete (`index.html`, `Tratamientos.html`, `styles.css`, `app.js`) son **referencias de diseño creadas en HTML** — prototipos que muestran el aspecto y comportamiento deseados, **no código de producción para copiar tal cual**.

La tarea es **recrear estos diseños en el entorno del codebase destino** (React/Next, Vue/Nuxt, Astro, etc.) usando sus patrones y librerías establecidos. Si no hay codebase aún, para un sitio de marketing estático como este la recomendación es **Astro** o **Next.js (App Router)** con CSS modules o Tailwind. El HTML/CSS aquí es limpio, semántico y traducible casi 1:1 a componentes.

## Fidelity
**Alta fidelidad (hi-fi).** Colores, tipografía, espaciado e interacciones son finales. Recrear la UI con precisión. Los valores exactos están en la sección *Design Tokens*. El propio `styles.css` es la fuente de verdad y está organizado por secciones con comentarios.

---

## Screens / Views

### 1. Home (`index.html`)
Secciones, en orden:

1. **Nav (fija)** — Logo de texto **THERAN** (componente `.brand`, renderizado en mayúsculas con tracking ancho vía CSS). Enlaces: Tratamientos · Protocolos · Filosofía · Contacto. CTA con borde: "Reservar valoración" (abre modal). En móvil (<720px) se colapsa a un botón hamburguesa que abre un overlay a pantalla completa. La nav gana fondo translúcido + blur al hacer scroll (>40px) vía clase `.nav--scrolled`.
2. **Hero** — Grid 2 columnas (1.05fr / 0.95fr), `min-height: 100svh`. Izquierda: eyebrow, titular grande en serif ("Cada protocolo empieza por comprenderte.", con "comprenderte." en itálica), subtítulo, botón sólido "Solicitar valoración" + link "Ver tratamientos". Derecha: foto vertical (`images/hero.jpg`, interior de la clínica). En <980px pasa a 1 columna, imagen debajo.
3. **Filosofía** (`#filosofia`) — Grid 2 columnas. Izquierda: eyebrow + titular. Derecha: cita en serif itálica grande + 2 párrafos.
4. **Categorías** (`#tratamientos`) — Cabecera de sección + grid 2×2 de tarjetas (`.cats`/`.cat`), separadas por líneas de 1px. Cada tarjeta: número en serif itálico, h3, descripción, link "Explorar". Hover: fondo cambia a `--marfil`. En móvil pasa a 1 columna.
5. **Protocolos Exclusivos** (`#protocolos`) — **Sección con fondo oscuro** (`--negro`). Cabecera + 2 bloques `.protocol` (Glow Recovery, Sculpt & Lift) en grid 2 columnas, alternando lado de la imagen (el 2º usa `.protocol--rev`). Imagen 4:5 (`glow.jpg`, `sculpt.jpg`).
6. **Experiencia / Pilares** — Fondo `--marfil`. Cabecera + 3 columnas (`.pillars`/`.pillar`) con numeral romano, h3 y texto.
7. **Contacto** (`#contacto`) — Grid 2 columnas. Izquierda: eyebrow, titular, lead, bloque de datos (Dirección / Teléfono / Correo) y botón "Solicitar valoración". Derecha: `<iframe>` de Google Maps con filtro CSS desaturado/cálido (`.contact__map`). En <900px pasa a 1 columna.
8. **Footer** — Fondo `--negro`. 4 columnas (marca + 3 listas: Tratamientos, Clínica, Contacto). Barra inferior con copyright y enlaces legales.
9. **Modal de reserva** — Overlay fijo con panel centrado; formulario "Solicitar valoración".

### 2. Tratamientos (`Tratamientos.html`)
1. **Nav** (idéntica, con "Tratamientos" activo).
2. **Page header** — eyebrow + titular grande + lead.
3. **Filter bar (sticky)** — Botones: Todos / Medicina Estética / Estética Facial / Corporales / Protocolos Exclusivos. Al pulsar, filtra qué secciones `[data-group]` se muestran (lógica en `app.js`).
4. **3 bloques de categoría** (`#medicina`, `#facial`, `#corporal`) — cada uno con cabecera (cat-tag + h2) y una **lista editorial "carte"** (`.treat-list`/`.treat`): índice en serif itálico (col 1), nombre en serif (col 2), descripción (col 3). Hover: la fila se desplaza con `padding-left`. En <900px pasa a 1 columna y oculta el índice. Botón CTA al final de cada bloque.
5. **Protocolos Exclusivos** (`#protocolos`) — fondo `--marfil`, 2 bloques `.sig` (feature con imagen 5:6, alternando lado).
6. **CTA band** — fondo `--negro`, centrado, botón claro.
7. **Footer** + **Modal** (idénticos a Home).

Contenido completo de tratamientos: ver directamente `Tratamientos.html` (Medicina Estética = 6 ítems, Estética Facial = 9, Corporales = 9, Protocolos = 2).

---

## Interactions & Behavior
Toda la lógica está en `app.js` (vanilla JS, sin dependencias):

- **Sticky nav**: añade `.nav--scrolled` cuando `scrollY > 40`.
- **Menú móvil**: el botón `#navToggle` alterna `.open` en `#mobileMenu` y bloquea el scroll del body. Los enlaces (no los que abren modal) lo cierran.
- **Scroll reveal**: elementos con `.reveal` se animan al entrar en viewport vía `IntersectionObserver` (threshold 0.1, `rootMargin: '0px 0px -6% 0px'`), añadiendo la clase `.in`. Clases de retardo `.reveal-d1/-d2/-d3` (0.08/0.16/0.24s). **Patrón de mejora progresiva importante:** el estado oculto solo se aplica si `<html>` tiene la clase `js` (se añade inline en `<head>` y en `app.js`). Sin JS, el contenido es visible. Failsafe: `setTimeout(revealAll, 2400)`. Respeta `prefers-reduced-motion`.
- **Modal de reserva**: cualquier elemento `[data-open-modal]` lo abre; `[data-close-modal]` y `Escape` lo cierran. Gestiona foco (foco al primer input al abrir; devuelve foco al disparador al cerrar) y bloquea scroll del body.
- **Validación del formulario** (cliente): nombre ≥2 chars, teléfono ≥6 chars, email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, área de interés requerida. Campos inválidos reciben `.error` (borde rojizo + mensaje). Al enviar válido, oculta `#formView` y muestra `#successView`. **No hay backend** — al integrar, conectar el submit a un endpoint/servicio de email real (ver "Pendientes").
- **Filtro de tratamientos**: botones `[data-filter]`; muestra/oculta secciones `[data-group]` cuyo valor coincide (o `all`).

### Transiciones / easing
- Easing global: `--ease: cubic-bezier(0.22, 0.61, 0.36, 1)`.
- Reveal: opacity + translateY(26px) → 0, duración 1s.
- Botones: transición de fondo/color 0.5s. Links con subrayado animado (scaleX).
- Modal: overlay fade 0.45s; panel translateY(18px)→0 0.5s.

---

## State Management
Mínimo, todo local en el DOM (no hay store):
- `navScrolled` (bool) — derivado del scroll.
- `mobileMenuOpen` (bool).
- `modalOpen` (bool) + `lastFocus` (elemento) para restaurar foco.
- `formSubmitted` (bool) — alterna vista formulario/éxito.
- `activeFilter` (string) — categoría visible en Tratamientos.

Al portar a React/Vue: estos se vuelven `useState`/`ref`. El `IntersectionObserver` → un hook `useReveal` o equivalente. El bloqueo de scroll del body, manéjalo en efectos con cleanup.

---

## Design Tokens
Definidos como CSS custom properties en `:root` (ver inicio de `styles.css`).

### Colores (paleta de neutros cálidos — "evitar colores estridentes")
| Token | Hex | Uso |
|---|---|---|
| `--blanco-roto` | `#f7f2ea` | Fondo principal (canvas) |
| `--marfil` | `#f0e8db` | Superficies / secciones alternas |
| `--arena` | `#e7dac6` | Fondo de placeholders |
| `--beige` | `#dcccb2` | Selección de texto |
| `--piedra` | `#a89a85` | Etiquetas, líneas, texto tenue |
| `--piedra-soft` | `#c8bca8` | — |
| `--bronce` | `#9a8060` | Acento cálido muy puntual (hover de enlaces) |
| `--negro` | `#211d17` | Negro elegante (texto, secciones oscuras) |
| `--tinta` | `#3a342b` | Texto principal |
| `--humo` | `#6c6356` | Texto secundario |
| `--line` | `rgba(33,29,23,0.13)` | Líneas / bordes |
| `--line-soft` | `rgba(33,29,23,0.07)` | Líneas suaves |

### Tipografía
- **Display/serif**: `"Cormorant Garamond"` (Google Fonts), pesos 300/400/500, con itálicas. Para titulares; peso 300, `letter-spacing: -0.01em`, `line-height: 1.04`.
- **Sans**: `"Jost"` (Google Fonts), pesos 300/400/500. Body, eyebrows, botones, nav. Body 17px / `line-height 1.75` / peso 300.
- **Eyebrow**: Jost 400, 0.7rem, `letter-spacing: 0.32em`, uppercase, color `--piedra`.
- Tamaños de titular fluidos con `clamp()` — ver cada componente en `styles.css`.
- Import: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap`

### Espaciado / layout
- `--pad-x: clamp(1.5rem, 6vw, 9rem)` (padding horizontal de secciones).
- `--maxw: 1380px` (ancho máximo del contenedor `.wrap`).
- Padding vertical de secciones: `clamp(5rem, 11vw, 11rem)`.
- Sin border-radius en ningún sitio (estética editorial, esquinas rectas) — `border-radius: 0` en botones e inputs es intencional.
- Inputs: sin borde salvo `border-bottom: 1px solid var(--line)`, fondo transparente.

### Breakpoints
- `980px` — hero, filosofía, categorías, protocolos, pilares → 1 columna; footer → 2 columnas.
- `900px` — contacto, listas de tratamientos, bloques `.sig` → 1 columna.
- `720px` — oculta nav-links/CTA y muestra hamburguesa; footer → 1 columna; formulario → 1 columna.

---

## Assets
En `images/` (fotografía propia del cliente, ya optimizada a 1500px de ancho, ~200–330KB, JPEG calidad 0.86; los originales eran 4000×6000):
- `hero.jpg` — interior de la clínica (corredor cálido). Usada en el hero de Home.
- `glow.jpg` — tratamiento facial. Protocolo *Glow Recovery* (Home + Tratamientos).
- `sculpt.jpg` — tratamiento corporal. Protocolo *Sculpt & Lift* (Home + Tratamientos).

Las imágenes van dentro de un wrapper `.ph` (`object-fit: cover`). El `.ph` sin `<img>` muestra un placeholder con etiqueta — útil si añaden más fotos luego.

Fuentes: Google Fonts (Cormorant Garamond, Jost). Sin librerías de iconos. Sin imágenes SVG decorativas.

---

## Datos reales del cliente (ya en el código)
- **Nombre:** THERAN
- **Dirección:** Ronda General Mitre 108, 08021 Barcelona, España
- **Teléfono:** +34 636 869 022 (`tel:+34636869022`)
- **Correo:** info@theranclinic.com
- **Dominio:** theranclinic.com
- **Horario** (del brief, aún NO está en la web — añadir si se desea): L–V 10:00–19:30; Sáb 9:30–14:30
- **Mapa:** iframe de Google Maps apuntando a la dirección, con filtro CSS desaturado.

---

## Pendientes al implementar (importante)
1. **Logo de marca:** Actualmente la marca es **texto** ("THERAN" en el componente `.brand`). Si el cliente tiene un logo vectorial real, sustituir el texto por el SVG/imagen del logo en nav y footer.
2. **Formulario sin backend:** El submit solo muestra un mensaje de éxito en el cliente. Conectar a un servicio real (email/CRM/API) y añadir protección anti-spam + consentimiento RGPD (checkbox de política de privacidad — requerido en España).
3. **Enlaces legales placeholder:** "Aviso legal · Privacidad · Cookies" en el footer no apuntan a nada. Crear esas páginas (obligatorio en España: aviso legal, política de privacidad, política de cookies + banner de consentimiento).
4. **Horario:** no está publicado; valorar añadirlo en Contacto/Footer.
5. **SEO/meta:** añadir meta description, Open Graph, favicon, `lang="es"` (ya está), datos estructurados de `MedicalBusiness`/`LocalBusiness` (schema.org) con dirección, teléfono y horario.

---

## Files
- `index.html` — Home.
- `Tratamientos.html` — Página de tratamientos (contenido completo de todos los tratamientos).
- `styles.css` — Sistema de diseño completo (tokens, componentes, responsive). Fuente de verdad.
- `app.js` — Toda la interactividad (nav, menú móvil, reveals, modal, validación, filtro).
- `images/` — hero.jpg, glow.jpg, sculpt.jpg.
