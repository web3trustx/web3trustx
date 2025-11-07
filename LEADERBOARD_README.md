# 🏆 Web3TrustX Leaderboard - Documentación

## 📋 Descripción

Sistema completo de leaderboard para el airdrop de Web3TrustX, mostrando el ranking de participantes e influencers con búsqueda, paginación y actualización en tiempo real.

## 🚀 Características

- ✅ **Tabs dinámicos**: Participantes e Influencers
- 🔍 **Búsqueda inteligente**: Por Telegram ID con resaltado automático
- 📊 **Tabla completa**: Rank, Telegram ID, Points, Referrals
- ⏮️⏭️ **Paginación**: 20 elementos por página
- 💾 **Caché inteligente**: 30 segundos para reducir llamadas a la API
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- 🎨 **Animaciones**: Transiciones suaves con Framer Motion
- 🌐 **Multiidioma**: Soporte para Español e Inglés

## 🔗 API Endpoint

**Base URL**: `https://api.web3trustx.com/api/leaderboard`

### Parámetros de consulta

| Parámetro | Tipo | Valores | Descripción |
|-----------|------|---------|-------------|
| `type` | string | `participant` \| `influencer` | Tipo de ranking a mostrar |
| `page` | number | >= 1 | Número de página actual |
| `pageSize` | number | 1-100 | Cantidad de elementos por página |
| `userId` | string | opcional | Telegram ID para búsqueda específica |

### Ejemplo de llamada

```bash
GET https://api.web3trustx.com/api/leaderboard?type=participant&page=1&pageSize=20
```

### Respuesta JSON

```typescript
{
  "updatedAt": "2025-11-07T12:30:00.000Z",
  "page": 1,
  "pages": 50,
  "total": 1000,
  "data": [
    {
      "rank": 1,
      "userId": "123456789",
      "points": 15000,
      "referralsCount": 250
    },
    // ... más entradas
  ],
  "match": { // Solo cuando se busca por userId
    "rank": 42,
    "userId": "987654321",
    "points": 5000,
    "referralsCount": 50
  }
}
```

## 📁 Estructura de Archivos

```
web3trustx-website/
├── components/
│   ├── Leaderboard.tsx          # Componente principal del leaderboard
│   ├── TopFiveWidget.tsx        # Widget Top 5 para la home
│   └── Header.tsx               # Navbar con link a leaderboard
├── pages/
│   ├── leaderboard.tsx          # Página del leaderboard
│   └── index.tsx                # Home con widget Top 5
├── lib/
│   ├── useLeaderboardApi.ts     # Hook y lógica de API
│   ├── translations.ts          # Traducciones ES/EN
│   └── LanguageContext.tsx      # Contexto de idioma
└── LEADERBOARD_README.md        # Esta documentación
```

## 🛠️ Componentes Principales

### 1. `useLeaderboardApi` Hook

**Ubicación**: `lib/useLeaderboardApi.ts`

**Constantes**:
```typescript
export const API_BASE = 'https://api.web3trustx.com/api/leaderboard';
const TTL = 30000; // 30 segundos - Time To Live para caché
```

**Funciones**:

#### `useLeaderboardApi(type, page, pageSize, userId?)`
Hook principal para cargar datos del leaderboard.

**Parámetros**:
- `type`: 'participant' | 'influencer'
- `page`: número de página (default: 1)
- `pageSize`: elementos por página (default: 20)
- `userId`: Telegram ID opcional para búsqueda

**Retorna**:
```typescript
{
  data: LeaderboardResponse | null,
  loading: boolean,
  error: string | null,
  refetch: () => void
}
```

#### `useSearchUser()`
Hook para búsqueda específica de usuarios.

**Retorna**:
```typescript
{
  data: LeaderboardResponse | null,
  loading: boolean,
  error: string | null,
  searchUser: (userId: string, type: string) => Promise<void>
}
```

### 2. `Leaderboard` Component

**Ubicación**: `components/Leaderboard.tsx`

Componente completo con:
- Tabs para cambiar entre Participants e Influencers
- Buscador con icono y tooltip
- Tabla con datos paginados
- Resaltado automático de fila encontrada
- Scroll automático a la fila resaltada
- Paginación con botones Prev/Next
- Estados de loading y error

### 3. `TopFiveWidget` Component

**Ubicación**: `components/TopFiveWidget.tsx`

Widget compacto para la home mostrando:
- Top 5 participantes
- Medallas para las primeras 3 posiciones
- Link al ranking completo
- Se oculta automáticamente si hay error

## 🎯 Funcionalidades UX

### Búsqueda de Usuario
1. Introduce el Telegram ID en el buscador
2. Presiona Enter o click en "Buscar"
3. El sistema:
   - Busca el usuario en la API
   - Navega a la página correcta
   - Resalta la fila con fondo amarillo
   - Hace scroll automático para centrar la fila

### Paginación
- Botones Prev/Next deshabilitados cuando no hay más páginas
- Al cambiar página, hace scroll automático al top de la tabla
- Texto informativo: "Página X / Y • Z total"

### Caché
- Caché en memoria de 30 segundos por combinación de parámetros
- Reduce llamadas innecesarias a la API
- Clave de caché: `${type}-${page}-${pageSize}-${userId}`

### Estados
- **Loading**: Spinner animado mientras carga
- **Error**: Mensaje de error con borde rojo
- **Empty**: Manejo de datos vacíos
- **Success**: Tabla con animaciones de entrada

## 🌐 Internacionalización

Traducciones disponibles en `lib/translations.ts`:

### Español (ES)
```typescript
leaderboard: {
  title: 'Airdrop Leaderboard',
  tabs: {
    participants: 'Participantes',
    influencers: 'Influencers',
  },
  search: {
    placeholder: 'Buscar por Telegram ID...',
    // ...
  },
  // ...
}
```

### Inglés (EN)
```typescript
leaderboard: {
  title: 'Airdrop Leaderboard',
  tabs: {
    participants: 'Participants',
    influencers: 'Influencers',
  },
  // ...
}
```

## 🚀 Cómo Ejecutar en Local

### Requisitos
- Node.js 16+ 
- npm o yarn

### Instalación

```bash
# Navegar al directorio del proyecto
cd "c:\Users\SANTOS\Desktop\Proyecto Crypto\3.0.- Desarrollo App\web3trustx-website"

# Instalar dependencias (si no están instaladas)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Acceder

Abre tu navegador en:
- **Local**: http://localhost:3000
- **Leaderboard**: http://localhost:3000/leaderboard

## 🧪 Testing

### Tests manuales recomendados:

1. **Tab Navigation**
   - [ ] Cambiar entre Participants e Influencers
   - [ ] Verificar que los datos cambian correctamente

2. **Búsqueda**
   - [ ] Buscar un userId existente
   - [ ] Verificar resaltado amarillo
   - [ ] Verificar scroll automático
   - [ ] Buscar userId inexistente (mensaje de error)

3. **Paginación**
   - [ ] Navegar a página siguiente
   - [ ] Navegar a página anterior
   - [ ] Verificar scroll al top de tabla
   - [ ] Botones deshabilitados en primera/última página

4. **Estados**
   - [ ] Loading spinner mientras carga
   - [ ] Mensaje de error si falla API
   - [ ] Caché funciona (segunda llamada instantánea)

5. **Responsive**
   - [ ] Vista móvil correcta
   - [ ] Vista tablet correcta
   - [ ] Vista desktop correcta

## 📦 Deployment a GitHub Pages

### Preparar cambios

```bash
# Ver archivos modificados
git status

# Agregar todos los archivos
git add .

# Commit con mensaje descriptivo
git commit -m "Add leaderboard feature with HTTPS API integration"

# Push a GitHub
git push origin main
```

### Build para producción

```bash
# Crear build optimizado
npm run build

# Exportar para static hosting
npm run export  # Si está configurado
```

## 🔧 Variables de Entorno (Opcionales)

Si deseas hacer configurable la URL de la API:

```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://api.web3trustx.com/api/leaderboard
```

Luego actualizar en `lib/useLeaderboardApi.ts`:
```typescript
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.web3trustx.com/api/leaderboard';
```

## 📝 Notas Adicionales

### Timeout de Requests
- AbortController con timeout de 15 segundos (configurable)
- Previene requests colgados

### Límites de la API
- Respeta los límites de rate limiting del servidor
- Caché ayuda a reducir llamadas

### Rendimiento
- Animaciones optimizadas con Framer Motion
- Lazy loading con React hooks
- Memoización de componentes pesados

## 🐛 Troubleshooting

### Error: "No se puede conectar a la API"
- Verificar que la API esté online: `https://api.web3trustx.com/api/leaderboard`
- Revisar configuración de CORS
- Verificar firewall/antivirus

### El caché no funciona
- Verificar que TTL no sea 0
- Limpiar caché del navegador
- Verificar que las claves de caché sean únicas

### Problemas de scroll
- Verificar que `tableRef` y `highlightedRowRef` estén correctamente asignados
- Ajustar timing del scroll (actualmente 300ms)

## 📞 Soporte

Para problemas o preguntas:
- GitHub Issues: https://github.com/web3trustx/web3trustx
- Telegram: [Tu canal de soporte]
- Email: [Tu email de contacto]

---

**Versión**: 1.0.0  
**Última actualización**: 7 de noviembre de 2025  
**Autor**: Web3TrustX Team
