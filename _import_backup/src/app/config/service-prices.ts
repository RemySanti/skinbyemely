/**
 * Service Prices Configuration
 * Single source of truth for all Square booking service prices.
 * 
 * These are fetched dynamically from the Square catalog on the backend
 * and cached in KV. The defaults below act as fallback values.
 * 
 * To refresh from Square: call the /square-services-refresh endpoint
 * from the Owner Dashboard.
 */

import { projectId, publicAnonKey } from '../utils/supabase/info';
import { SQUARE_CONFIG } from './square';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-fd83a735`;

export interface ServicePrice {
  id: string;
  title: string;
  price: string;       // e.g. "$75"
  priceNum: number;    // e.g. 75
  duration: string;    // e.g. "60 Min"
  description: string;
  link: string;
}

// Default fallback prices (updated from Square)
const DEFAULT_SERVICE_PRICES: ServicePrice[] = [
  {
    id: 'new-client-facial',
    title: 'New Client Facial',
    price: '$80',
    priceNum: 80,
    duration: '60 Min',
    description: 'Perfect introduction to professional skincare with comprehensive analysis and customized treatment.',
    link: '/services/new-client-facial',
  },
  {
    id: 'microdermabrasion',
    title: 'Microdermabrasion',
    price: '$135',
    priceNum: 135,
    duration: '60 Min',
    description: 'Clinical-grade exfoliation to renew skin texture and reveal your radiance with minimal downtime.',
    link: '/services/microdermabrasion',
  },
  {
    id: 'dermaplane-deluxe',
    title: 'Dermaplane Deluxe',
    price: '$135',
    priceNum: 135,
    duration: '90 Min',
    description: 'Instant radiance and silky-smooth texture by removing vellus hair and dead skin cells.',
    link: '/services/dermaplane-deluxe',
  },
  {
    id: 'cranberry-peel',
    title: 'Cranberry Turnover Peel',
    price: '$125',
    priceNum: 125,
    duration: '60 Min',
    description: 'Powerhouse exfoliation for acne-prone skin and texture refinement. Expect 4-5 days of flaking.',
    link: '/services/cranberry-peel',
  },
  {
    id: 'nanoneedling',
    title: 'Nanoneedling',
    price: '$170',
    priceNum: 170,
    duration: '60 Min',
    description: 'Advanced infusion for texture, firmness & radiance without needles or downtime.',
    link: '/services/nanoneedling',
  },
];

// In-memory cache for service prices
let cachedPrices: ServicePrice[] | null = null;

/**
 * Fetch service prices from the backend (Square catalog cache).
 * If the cache is empty, automatically triggers a refresh by passing
 * the Square access token from the frontend config.
 * Falls back to defaults if the backend is unavailable.
 */
export async function fetchServicePrices(): Promise<ServicePrice[]> {
  if (cachedPrices) return cachedPrices;

  try {
    // 1. Try to get from KV cache
    const response = await fetch(`${API_BASE}/square-services`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.services && Array.isArray(data.services) && data.services.length > 0) {
        // Safety filter: strip any add-ons that slipped through from stale cache
        const filtered = data.services.filter((s: any) => {
          const n = (s.title || s.name || '').toLowerCase();
          return !n.includes('add-on') && !n.includes('add on') && !n.includes('addon') && !n.includes('add - on') && !n.includes('add_on');
        });
        cachedPrices = filtered.length > 0 ? filtered : DEFAULT_SERVICE_PRICES;
        return cachedPrices;
      }
    }

    // 2. Cache was empty — auto-refresh by posting the Square access token
    if (SQUARE_CONFIG.accessToken && SQUARE_CONFIG.accessToken !== 'YOUR_SQUARE_ACCESS_TOKEN_HERE') {
      console.log('Service cache empty, auto-refreshing from Square...');
      const refreshResponse = await fetch(`${API_BASE}/square-services-refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          accessToken: SQUARE_CONFIG.accessToken,
          isSandbox: SQUARE_CONFIG.environment === 'sandbox',
        }),
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        if (refreshData.services && Array.isArray(refreshData.services) && refreshData.services.length > 0) {
          cachedPrices = refreshData.services;
          return cachedPrices;
        }
      }
    }
  } catch (e) {
    console.warn('Failed to fetch service prices from backend, using defaults', e);
  }

  cachedPrices = DEFAULT_SERVICE_PRICES;
  return cachedPrices;
}

/**
 * Get a specific service price by ID.
 */
export function getServiceById(services: ServicePrice[], id: string): ServicePrice | undefined {
  return services.find(s => s.id === id);
}

/**
 * Get all default service prices (synchronous, for initial render).
 */
export function getDefaultServicePrices(): ServicePrice[] {
  return DEFAULT_SERVICE_PRICES;
}

/**
 * Clear the in-memory cache so next fetch goes to backend.
 */
export function clearServicePriceCache(): void {
  cachedPrices = null;
}

/**
 * Manually refresh service prices from Square (for Owner Dashboard).
 */
export async function refreshServiceCache(): Promise<{ success: boolean; count?: number; message?: string; error?: string }> {
  try {
    if (!SQUARE_CONFIG.accessToken || SQUARE_CONFIG.accessToken === 'YOUR_SQUARE_ACCESS_TOKEN_HERE') {
      return { success: false, error: 'Square access token not configured' };
    }

    const response = await fetch(`${API_BASE}/square-services-refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        accessToken: SQUARE_CONFIG.accessToken,
        isSandbox: SQUARE_CONFIG.environment === 'sandbox',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      return { success: false, error: errorData.error || `HTTP ${response.status}` };
    }

    const data = await response.json();
    
    // Clear in-memory cache so next fetch gets fresh data
    clearServicePriceCache();
    
    return {
      success: true,
      count: data.count,
      message: data.message || 'Services refreshed successfully',
    };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to refresh services' };
  }
}