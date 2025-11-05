# 🚀 Guía de Despliegue en GitHub Pages

Esta guía te ayudará a desplegar el sitio web de Web3TrustX en GitHub Pages paso a paso.

## 📋 Pre-requisitos

- Cuenta de GitHub
- Repositorio creado (público o privado con GitHub Pro)
- Git instalado localmente
- Node.js 18+ instalado

---

## 🔧 Configuración Inicial

### 1. Crear Repositorio en GitHub

```bash
# Opción A: Crear desde GitHub.com
# 1. Ve a github.com y crea un nuevo repositorio
# 2. Nombre sugerido: web3trustx-website
# 3. NO inicialices con README (ya tenemos uno)

# Opción B: Usar GitHub CLI
gh repo create web3trustx-website --public --source=. --remote=origin
```

### 2. Configurar next.config.js

**IMPORTANTE**: Antes de subir a GitHub, actualiza `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // CAMBIA 'web3trustx-website' por el nombre de tu repositorio
  basePath: process.env.NODE_ENV === 'production' ? '/web3trustx-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/web3trustx-website/' : '',
  trailingSlash: true,
}

module.exports = nextConfig
```

### 3. Inicializar Git y Subir Código

```bash
# Si aún no has inicializado git
git init

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "Initial commit: Web3TrustX website"

# Conectar con GitHub (reemplaza con tu URL)
git remote add origin https://github.com/tu-usuario/web3trustx-website.git

# Subir a GitHub
git push -u origin main
```

---

## ⚙️ Configurar GitHub Pages

### Método 1: Usando GitHub Actions (Recomendado)

El proyecto ya incluye `.github/workflows/deploy.yml` configurado.

1. **Ve a tu repositorio en GitHub**
2. **Settings** → **Pages**
3. **Source**: Selecciona "GitHub Actions"
4. **Haz push a main** y el despliegue se ejecutará automáticamente

```bash
# Cualquier push a main desplegará automáticamente
git add .
git commit -m "Update content"
git push origin main
```

✅ **Ventajas**:
- Despliegue automático en cada push
- Build en la nube (no necesitas construir localmente)
- Historial de despliegues visible

### Método 2: Despliegue Manual

Si prefieres control manual:

```bash
# 1. Instalar dependencias
npm install

# 2. Construir el sitio
npm run build

# 3. Exportar a carpeta 'out'
npm run export

# 4. Desplegar (requiere gh-pages instalado)
npm run deploy
```

Configuración en GitHub:
1. **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: Selecciona `gh-pages` → `/ (root)` → Save

---

## 🌐 Configurar Dominio Personalizado (Opcional)

### Si tienes un dominio (ej: web3trustx.com)

#### 1. Agregar archivo CNAME

Crea el archivo `public/CNAME` con tu dominio:

```
www.web3trustx.com
```

#### 2. Configurar DNS en tu proveedor

**Para subdomain (www.web3trustx.com)**:
```
Type: CNAME
Name: www
Value: tu-usuario.github.io
TTL: 3600
```

**Para apex domain (web3trustx.com)**:
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

#### 3. Configurar en GitHub

1. **Settings** → **Pages**
2. **Custom domain**: Ingresa `www.web3trustx.com`
3. Espera verificación DNS (puede tomar hasta 24h)
4. ✅ Marca "Enforce HTTPS"

#### 4. Actualizar next.config.js

```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // ELIMINAR basePath y assetPrefix si usas dominio personalizado
  trailingSlash: true,
}
```

---

## 🔍 Verificación Post-Despliegue

### 1. URLs a Verificar

Después del despliegue, verifica estas URLs:

```
https://tu-usuario.github.io/web3trustx-website/
https://tu-usuario.github.io/web3trustx-website/about/
https://tu-usuario.github.io/web3trustx-website/ecosystem/
https://tu-usuario.github.io/web3trustx-website/roadmap/
```

### 2. Checklist de Funcionalidad

- [ ] Home page se carga correctamente
- [ ] Navegación funciona (todas las páginas accesibles)
- [ ] Toggle de idioma (ES/EN) funciona
- [ ] Imágenes y favicon se muestran
- [ ] Animaciones de Framer Motion funcionan
- [ ] Formulario de contacto responde
- [ ] Links de redes sociales funcionan
- [ ] Diseño responsive (mobile, tablet, desktop)
- [ ] Sin errores en consola del navegador

### 3. Herramientas de Testing

```bash
# Lighthouse (en Chrome DevTools)
# 1. F12 → Lighthouse → Generate Report
# Objetivo: Score 90+ en todas las categorías

# GTmetrix
# https://gtmetrix.com
# Pega tu URL y analiza performance

# Google PageSpeed Insights
# https://pagespeed.web.dev
```

---

## 🐛 Solución de Problemas Comunes

### Problema 1: Página en blanco después de desplegar

**Causa**: `basePath` mal configurado

**Solución**:
```javascript
// next.config.js - Verifica que el nombre coincida con tu repositorio
basePath: '/NOMBRE-EXACTO-DE-TU-REPO',
```

### Problema 2: CSS no se aplica

**Causa**: Assets no se cargan correctamente

**Solución**:
```javascript
// next.config.js - Asegúrate de tener:
assetPrefix: process.env.NODE_ENV === 'production' ? '/tu-repo/' : '',
```

### Problema 3: 404 al navegar directamente a una página

**Causa**: GitHub Pages no maneja rutas de SPA correctamente

**Solución**: Ya está implementado con `trailingSlash: true` y exportación estática

### Problema 4: Imágenes no se muestran

**Causa**: Next.js Image Optimization no funciona en export estático

**Solución**: Ya configurado con:
```javascript
images: {
  unoptimized: true,
}
```

### Problema 5: GitHub Actions falla

**Pasos de debug**:
1. Ve a **Actions** tab en GitHub
2. Clic en el workflow fallido
3. Revisa logs de error
4. Errores comunes:
   - `npm ci` falla → Verifica `package-lock.json` existe
   - Build falla → Prueba `npm run build` localmente primero
   - Permisos denegados → Verifica Settings → Actions → Workflow permissions

---

## 📊 Monitoreo y Analytics

### Google Analytics 4 (Opcional)

1. **Crear propiedad en GA4**:
   - https://analytics.google.com
   - Crear propiedad → Obtener ID (G-XXXXXXXXXX)

2. **Agregar a `pages/_document.tsx`**:
```tsx
<script async src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} />
<script dangerouslySetInnerHTML={{
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `
}} />
```

### Plausible Analytics (Alternativa Privacy-Friendly)

```tsx
// pages/_document.tsx
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🔄 Workflow de Actualización

### Para cambios de contenido:

```bash
# 1. Editar archivos
# Ejemplo: cambiar texto en lib/translations.ts

# 2. Probar localmente
npm run dev

# 3. Commit y push
git add .
git commit -m "Update: descripción del cambio"
git push origin main

# 4. Esperar despliegue automático (2-3 min)
# Verifica en Actions tab
```

### Para cambios estructurales:

```bash
# 1. Crear rama de desarrollo
git checkout -b dev/nueva-feature

# 2. Realizar cambios y probar
npm run dev

# 3. Build y verificar
npm run build
npm run start

# 4. Push y crear Pull Request
git push origin dev/nueva-feature

# 5. Merge a main después de review
```

---

## 📞 Soporte

Si encuentras problemas:

1. **Revisa logs de GitHub Actions**
2. **Compara con `next.config.js` de ejemplo**
3. **Verifica nombres de repositorio coinciden**
4. **Prueba build local**: `npm run build && npm run export`
5. **Contacta al equipo**: contact@web3trustx.com

---

## ✅ Checklist Final

Antes de considerar el despliegue completo:

- [ ] Código subido a GitHub
- [ ] GitHub Pages configurado
- [ ] Despliegue exitoso (verde en Actions)
- [ ] URL pública funcional
- [ ] Todas las páginas accesibles
- [ ] Toggle de idioma funciona
- [ ] Responsive en móvil
- [ ] Sin errores en consola
- [ ] Lighthouse score 90+
- [ ] README actualizado con tu URL
- [ ] (Opcional) Dominio personalizado configurado
- [ ] (Opcional) Analytics integrado

---

**¡Felicidades! Tu sitio Web3TrustX está en producción 🎉**

URL de ejemplo: `https://tu-usuario.github.io/web3trustx-website/`

---

*Última actualización: Noviembre 2025*
