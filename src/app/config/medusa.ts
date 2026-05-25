/**
 * Medusa Configuration
 * 
 * IMPORTANT: Set your Medusa backend URL
 * 
 * To use Medusa with this app:
 * 1. Set up a Medusa backend server (https://docs.medusajs.com/create-medusa-app)
 * 2. Update MEDUSA_BACKEND_URL below with your server URL
 * 3. Ensure Stripe is configured as a payment provider in your Medusa backend
 * 4. Create products in your Medusa admin dashboard
 */

export const MEDUSA_BACKEND_URL = 
  // Use environment variable if available, otherwise fallback to localhost
  (typeof window !== 'undefined' && (window as any).MEDUSA_BACKEND_URL) ||
  'http://localhost:9000'; // Change this to your Medusa backend URL

export const MEDUSA_PUBLISHABLE_API_KEY = 
  // Optional: If your Medusa backend requires an API key
  (typeof window !== 'undefined' && (window as any).MEDUSA_PUBLISHABLE_API_KEY) ||
  undefined;
