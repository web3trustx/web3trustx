# 🚀 Guía de Inicio Rápido - Web3TrustX Website

## ⚡ Iniciar en 3 Pasos

### 1. Instalar Dependencias
```bash
cd web3trustx-website
npm install
```

### 2. Ejecutar en Desarrollo
```bash
npm run dev
```

### 3. Abrir Navegador
```
http://localhost:3000
```

---

## 📁 Estructura Simplificada

```
web3trustx-website/
├── pages/           → Páginas del sitio (rutas automáticas)
├── components/      → Componentes reutilizables (Header, Footer, etc.)
├── lib/            → Traducciones y contextos
├── styles/         → CSS global (Tailwind)
├── public/         → Assets estáticos (favicon, imágenes)
└── README.md       → Documentación completa
```

---

## ✏️ Ediciones Rápidas

### Cambiar Textos (Español/Inglés)

Edita: **`lib/translations.ts`**

```typescript
es: {
  home: {
    hero: {
      title: 'TU NUEVO TÍTULO',
      description: 'Tu nueva descripción...'
    }
  }
}
```

### Añadir Nueva Página

1. Crea archivo en `pages/`: **`pages/nueva-pagina.tsx`**
2. Copia estructura de otra página existente
3. Añade al menú en **`components/Header.tsx`**

### Cambiar Colores

Edita: **`tailwind.config.js`**

```javascript
colors: {
  primary: {
    DEFAULT: '#00B5AD',  // Tu color principal
  }
}
```

---

## 🌐 Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Modo desarrollo (con hot-reload) |
| `npm run build` | Compilar para producción |
| `npm run start` | Servidor producción local |
| `npm run export` | Exportar sitio estático |
| `npm run deploy` | Desplegar a GitHub Pages |

---

## 🎨 Personalización Rápida

### Logo
Reemplaza: `public/favicon.svg`

### Links Sociales
Edita: `components/Footer.tsx` (línea ~18)

### Email de Contacto
Busca: `contact@web3trustx.com` y reemplaza

### Dominio
Actualiza: `next.config.js` (basePath) y `public/CNAME`

---

## 🆘 Problemas Comunes

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Puerto 3000 ocupado
```bash
npm run dev -- -p 3001
```

### Cambios no se reflejan
1. Ctrl+C para detener
2. `npm run dev` de nuevo
3. Ctrl+Shift+R (hard refresh en navegador)

---

## 📚 Documentación Completa

- **README.md** → Guía técnica completa
- **DEPLOYMENT.md** → Despliegue en GitHub Pages
- **Código comentado** → Revisa los archivos .tsx

---

## 🔗 Enlaces Rápidos

- **Next.js Docs**: https://nextjs.org/docs
- **TailwindCSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/

---

**¿Listo para empezar? 🚀**

```bash
npm install && npm run dev
```

*Sitio creado para Web3TrustX - Building Trust Across Web3*
