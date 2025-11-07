import { useState, useEffect, useCallback, useRef } from 'react';

export const API_BASE = 'https://api.web3trustx.com/api/leaderboard';
const TTL = 30000; // 30 segundos - Time To Live para caché

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string | null;
  x: string | null;
  verified: boolean;
  referralsCount: number;
  selfPoints: number;
  referralPoints: number;
  totalPoints: number;
}

export interface LeaderboardResponse {
  updatedAt: string;
  page: number;
  pages: number;
  total: number;
  data: LeaderboardEntry[];
  match?: LeaderboardEntry; // Solo cuando se busca por userId
}

interface CacheEntry {
  data: LeaderboardResponse;
  timestamp: number;
}

const cache: Map<string, CacheEntry> = new Map();

export const useLeaderboardApi = (
  type: 'participant' | 'influencer' = 'participant',
  page: number = 1,
  pageSize: number = 20,
  userId?: string
) => {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    // Crear clave de caché
    const cacheKey = `${type}-${page}-${pageSize}-${userId || 'none'}`;
    
    // Verificar caché
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < TTL) {
      setData(cached.data);
      setLoading(false);
      setError(null);
      return;
    }

    // Cancelar request anterior si existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Crear nuevo AbortController
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        type,
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      if (userId) {
        params.append('userId', userId);
      }

      const response = await fetch(`${API_BASE}?${params.toString()}`, {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: LeaderboardResponse = await response.json();

      // Guardar en caché
      cache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
      });

      setData(result);
      setError(null);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Request fue cancelado, no hacer nada
        return;
      }
      setError(err.message || 'Error al cargar los datos');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [type, page, pageSize, userId]);

  useEffect(() => {
    fetchLeaderboard();

    // Cleanup: cancelar request si el componente se desmonta
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchLeaderboard]);

  const refetch = useCallback(() => {
    // Limpiar caché para forzar nueva petición
    const cacheKey = `${type}-${page}-${pageSize}-${userId || 'none'}`;
    cache.delete(cacheKey);
    fetchLeaderboard();
  }, [type, page, pageSize, userId, fetchLeaderboard]);

  return { data, loading, error, refetch };
};

// Hook para búsqueda manual de usuario
export const useSearchUser = () => {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchUser = useCallback(async (
    userId: string,
    type: 'participant' | 'influencer' = 'participant'
  ) => {
    if (!userId.trim()) {
      setError('Por favor ingresa un Telegram ID válido');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const params = new URLSearchParams({
        type,
        userId: userId.trim(),
        page: '1',
        pageSize: '20',
      });

      const response = await fetch(`${API_BASE}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: LeaderboardResponse = await response.json();

      if (!result.match) {
        setError('Usuario no encontrado');
        setData(null);
      } else {
        setData(result);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || 'Error al buscar usuario');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, searchUser };
};
