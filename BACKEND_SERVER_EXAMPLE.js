// ============================================================================
// LEADERBOARD API - Web3TrustX
// ============================================================================
// Este archivo debe copiarse a tu VM de Google Cloud en:
// /home/web3trustx/web3trustx-api/server.js
//
// Instalación en la VM:
// 1. npm install express cors
// 2. node server.js
// ============================================================================

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// ============================================================================
// CONFIGURACIÓN DE RUTAS DE DATOS
// ============================================================================
const DATA_DIR = '/home/web3trustx/web3trustx-bot';
const SCORES_FILE = path.join(DATA_DIR, 'scores.json');
const REFERRALS_FILE = path.join(DATA_DIR, 'referrals.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const X_USERS_FILE = path.join(DATA_DIR, 'x_users.json');

// ============================================================================
// CONFIGURACIÓN DE CORS
// ============================================================================
const allowedOrigins = [
  'https://web3trustx.com',
  'https://www.web3trustx.com',
  'https://api.web3trustx.com',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173', // Vite default
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log(`[CORS] ✅ Permitido: ${origin}`);
      callback(null, true);
    } else {
      console.warn(`[CORS] ⚠️  Bloqueado: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// ============================================================================
// FUNCIONES DE LECTURA DE DATOS
// ============================================================================

/**
 * Lee y normaliza scores.json
 * Soporta tanto formato objeto { "userId": {...} } como array
 */
function loadScores() {
  try {
    if (!fs.existsSync(SCORES_FILE)) {
      console.error(`[ERROR] scores.json no encontrado en: ${SCORES_FILE}`);
      return {};
    }

    const raw = fs.readFileSync(SCORES_FILE, 'utf-8');
    const data = JSON.parse(raw);

    // Si ya es un objeto con IDs como claves, retornarlo directamente
    if (!Array.isArray(data)) {
      console.log(`[diag] scores.json cargado como objeto con ${Object.keys(data).length} entradas`);
      return data;
    }

    // Si es array, convertir a objeto indexado por userId
    const normalized = {};
    data.forEach(entry => {
      if (entry.userId || entry.id) {
        const id = entry.userId || entry.id;
        normalized[id] = entry;
      }
    });

    console.log(`[diag] scores.json cargado como array, normalizado a ${Object.keys(normalized).length} entradas`);
    return normalized;
  } catch (error) {
    console.error(`[ERROR] Error al leer scores.json:`, error.message);
    return {};
  }
}

/**
 * Lee referrals.json
 */
function loadReferrals() {
  try {
    if (!fs.existsSync(REFERRALS_FILE)) {
      console.log(`[diag] referrals.json no encontrado, usando objeto vacío`);
      return {};
    }

    const raw = fs.readFileSync(REFERRALS_FILE, 'utf-8');
    const data = JSON.parse(raw);
    console.log(`[diag] referrals.json cargado con ${Object.keys(data).length} referidores`);
    return data;
  } catch (error) {
    console.error(`[ERROR] Error al leer referrals.json:`, error.message);
    return {};
  }
}

/**
 * Lee users.json (opcional - mapea userId a username)
 */
function loadUsers() {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      return {};
    }
    const raw = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.log(`[diag] users.json no disponible o inválido`);
    return {};
  }
}

/**
 * Lee x_users.json (opcional - mapea userId a handle de X/Twitter)
 */
function loadXUsers() {
  try {
    if (!fs.existsSync(X_USERS_FILE)) {
      return {};
    }
    const raw = fs.readFileSync(X_USERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.log(`[diag] x_users.json no disponible o inválido`);
    return {};
  }
}

// ============================================================================
// CÁLCULO DE PUNTOS
// ============================================================================

/**
 * Calcula los puntos propios del usuario basado en follows
 */
function calculateSelfPoints(user) {
  const telegramFollow = user.telegramFollow || false;
  const xFollow = user.xFollow || false;

  // 10 puntos si sigue ambos
  if (telegramFollow && xFollow) {
    return 10;
  }

  // 3 puntos si sigue solo uno
  if (telegramFollow || xFollow) {
    return 3;
  }

  // 0 puntos si no sigue ninguno
  return 0;
}

/**
 * Calcula los puntos totales del usuario incluyendo referidos
 */
function calculateTotalPoints(userId, scores, referrals) {
  const user = scores[userId];
  if (!user) return { selfPoints: 0, referralPoints: 0, totalPoints: 0 };

  // Puntos propios
  const selfPoints = calculateSelfPoints(user);

  // Puntos por referidos (mismo sistema de puntos que sus referidos)
  let referralPoints = 0;
  const userReferrals = referrals[userId] || [];
  
  userReferrals.forEach(ref => {
    const referredUser = scores[ref.userId];
    if (referredUser) {
      referralPoints += calculateSelfPoints(referredUser);
    }
  });

  return {
    selfPoints,
    referralPoints,
    totalPoints: selfPoints + referralPoints
  };
}

// ============================================================================
// CONSTRUCCIÓN DEL LEADERBOARD
// ============================================================================

/**
 * Construye el array completo del leaderboard
 */
function buildLeaderboard(type = 'participant') {
  const scores = loadScores();
  const referrals = loadReferrals();
  const users = loadUsers();
  const xUsers = loadXUsers();

  const entries = [];

  // Iterar sobre todas las claves (userIds) en scores
  for (const [userId, userData] of Object.entries(scores)) {
    // Filtrar por tipo
    const userType = userData.userType || 'participant';
    if (type !== 'all' && userType !== type) {
      continue;
    }

    // Calcular puntos
    const points = calculateTotalPoints(userId, scores, referrals);

    // Contar referidos
    const userReferrals = referrals[userId] || [];
    const referralsCount = userReferrals.length;

    // Obtener username y handle de X
    const username = userData.username || users[userId] || null;
    const x = xUsers[userId] || null;

    entries.push({
      userId: userId,
      username: username,
      x: x,
      verified: userData.verified || false,
      referralsCount: referralsCount,
      selfPoints: points.selfPoints,
      referralPoints: points.referralPoints,
      totalPoints: points.totalPoints,
      userType: userType
    });
  }

  // Ordenar por totalPoints (descendente), luego por referralsCount
  entries.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    return b.referralsCount - a.referralsCount;
  });

  // Asignar ranks
  entries.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  console.log(`[diag] Leaderboard construido: ${entries.length} entradas (tipo: ${type})`);
  if (entries.length > 0) {
    console.log(`[diag] Primeros 3 userIds: ${entries.slice(0, 3).map(e => e.userId).join(', ')}`);
  }

  return entries;
}

// ============================================================================
// ENDPOINT: /api/leaderboard
// ============================================================================

app.get('/api/leaderboard', (req, res) => {
  try {
    const { type = 'participant', page = 1, pageSize = 20, userId } = req.query;

    console.log(`[API] GET /api/leaderboard - type: ${type}, page: ${page}, pageSize: ${pageSize}, userId: ${userId || 'none'}`);

    // Construir leaderboard completo
    const fullLeaderboard = buildLeaderboard(type);

    // Si se solicita un userId específico, buscarlo
    let match = null;
    let pageForUser = 1;

    if (userId) {
      const userEntry = fullLeaderboard.find(entry => entry.userId === userId);
      if (userEntry) {
        match = userEntry;
        // Calcular en qué página está el usuario
        pageForUser = Math.ceil(userEntry.rank / parseInt(pageSize));
        console.log(`[API] Usuario ${userId} encontrado en rank ${userEntry.rank}, página ${pageForUser}`);
      } else {
        console.log(`[API] Usuario ${userId} no encontrado`);
      }
    }

    // Paginación
    const pageInt = parseInt(page);
    const pageSizeInt = parseInt(pageSize);
    const totalEntries = fullLeaderboard.length;
    const totalPages = Math.ceil(totalEntries / pageSizeInt);
    const startIndex = (pageInt - 1) * pageSizeInt;
    const endIndex = startIndex + pageSizeInt;
    const paginatedData = fullLeaderboard.slice(startIndex, endIndex);

    // Respuesta
    const response = {
      updatedAt: new Date().toISOString(),
      page: pageInt,
      pages: totalPages,
      total: totalEntries,
      data: paginatedData,
    };

    // Agregar match si se buscó un usuario
    if (match) {
      response.match = match;
      response.pageForUser = pageForUser;
    }

    res.json(response);
  } catch (error) {
    console.error('[ERROR] Error en /api/leaderboard:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// ============================================================================
// ENDPOINT: /api/debug
// ============================================================================

app.get('/api/debug', (req, res) => {
  try {
    const scores = loadScores();
    const referrals = loadReferrals();

    const scoresCount = Object.keys(scores).length;
    const referralsCount = Object.keys(referrals).length;
    const firstScoreIds = Object.keys(scores).slice(0, 5);
    const firstReferralIds = Object.keys(referrals).slice(0, 5);

    res.json({
      status: 'ok',
      dataDir: DATA_DIR,
      files: {
        scores: {
          exists: fs.existsSync(SCORES_FILE),
          count: scoresCount,
          firstIds: firstScoreIds
        },
        referrals: {
          exists: fs.existsSync(REFERRALS_FILE),
          count: referralsCount,
          firstIds: firstReferralIds
        }
      },
      sampleEntry: scoresCount > 0 ? scores[firstScoreIds[0]] : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// ENDPOINT: Health Check
// ============================================================================

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================================================
// INICIO DEL SERVIDOR
// ============================================================================

app.listen(PORT, '0.0.0.0', () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 LEADERBOARD API - Web3TrustX');
  console.log('='.repeat(60));
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`📂 Directorio de datos: ${DATA_DIR}`);
  console.log(`🌐 CORS habilitado para: ${allowedOrigins.join(', ')}`);
  console.log('='.repeat(60));
  
  // Diagnóstico inicial
  console.log('\n📊 DIAGNÓSTICO INICIAL:');
  const scores = loadScores();
  const referrals = loadReferrals();
  console.log(`   - Usuarios en scores.json: ${Object.keys(scores).length}`);
  console.log(`   - Referidores en referrals.json: ${Object.keys(referrals).length}`);
  
  if (Object.keys(scores).length > 0) {
    const firstIds = Object.keys(scores).slice(0, 3);
    console.log(`   - Primeros IDs: ${firstIds.join(', ')}`);
  }
  
  console.log('\n🔗 Endpoints disponibles:');
  console.log(`   - GET /api/leaderboard?type=participant&page=1&pageSize=20`);
  console.log(`   - GET /api/leaderboard?userId=123456789`);
  console.log(`   - GET /api/debug`);
  console.log(`   - GET /health`);
  console.log('='.repeat(60) + '\n');
});

// ============================================================================
// MANEJO DE ERRORES NO CAPTURADOS
// ============================================================================

process.on('uncaughtException', (error) => {
  console.error('[FATAL] Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[FATAL] Unhandled Rejection at:', promise, 'reason:', reason);
});
