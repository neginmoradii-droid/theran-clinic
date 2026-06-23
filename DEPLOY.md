# Despliegue THERAN

## Inicio local

```bash
npm run dev
```

Abrirá el servidor en `http://localhost:3000`

## Build para producción

```bash
npm run build
```

Esto genera la carpeta `dist/` con el sitio estático listo para desplegar.

## Desplegar en Netlify

### Opción 1: Desde Git

1. **Crea un repositorio Git**
   ```bash
   git init
   git add .
   git commit -m "Initial THERAN site"
   git remote add origin https://github.com/tuusuario/theran-clinic.git
   git push -u origin main
   ```

2. **Conecta en Netlify**
   - Ve a [netlify.com](https://netlify.com)
   - Haz clic en "New site from Git"
   - Selecciona tu repositorio
   - Configuración automática para Astro
   - Deploy completado ✅

### Opción 2: Drag & Drop

```bash
npm run build
```

Arrastra la carpeta `dist/` a https://app.netlify.com/drop

## Desplegar en Vercel

### Desde Git

1. **Crea un repositorio Git**
   ```bash
   git init
   git add .
   git commit -m "Initial THERAN site"
   git remote add origin https://github.com/tuusuario/theran-clinic.git
   git push -u origin main
   ```

2. **Conecta en Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "Import Project"
   - Selecciona tu repositorio
   - Framework: **Astro**
   - Deploy completado ✅

## Apuntar dominio theranclinic.com

### En Netlify/Vercel:

1. Vete a **Site Settings** → **Domain Management**
2. Añade tu dominio personalizado
3. Sigue las instrucciones para configurar DNS

### En tu proveedor de dominios (GoDaddy, Namecheap, etc.):

- Apunta los DNS a los servidores de Netlify/Vercel
- O usa CNAME según las instrucciones del sitio de despliegue

## Variables de entorno (si necesarias)

Crea un archivo `.env.local`:

```env
PUBLIC_SITE_URL=https://theranclinic.com
PUBLIC_GOOGLE_MAPS_API_KEY=tu_clave_aqui
```

## Estructura del proyecto

```
/src
  /pages
    index.astro           # Página principal
    tratamientos.astro    # Página de tratamientos
  /layouts
    Layout.astro          # Layout compartido (nav + footer + modal)
  /styles
    global.css            # Estilos globales
  /scripts
    app.js                # JavaScript vanilla (nav, modal, filtros)
/public
  /images
    hero.jpg
    glow.jpg
    sculpt.jpg
package.json
astro.config.mjs
```

## Próximos pasos

1. **Integración backend**
   - El formulario modal actualmente es client-side
   - Conectar a: Formspree, EmailJS, tu propio servidor, etc.
   - Ver `src/scripts/app.js` línea ~100

2. **SEO & Meta tags**
   - Actualizar meta descriptions
   - Añadir Open Graph tags
   - Schema.org (MedicalBusiness)

3. **Analytics**
   - Añadir Google Analytics
   - Hotjar u otra herramienta de comportamiento

4. **Política de privacidad & Legal**
   - Crear páginas en `/src/pages/privacy.astro`, `/src/pages/legal.astro`
   - Incluir RGPD compliance

5. **Email para clientes**
   - Configurar confirmación automática cuando recibas solicitudes
   - Implementar newsletter (opcional)

## Support & Documentación

- Docs Astro: https://docs.astro.build
- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs
