/**
 * Square API Configuration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://developer.squareup.com/
 * 2. Create an application (or use existing)
 * 3. Copy your Access Token from the Credentials page
 * 4. Replace 'YOUR_SQUARE_ACCESS_TOKEN_HERE' below with your actual token
 * 
 * IMPORTANT SECURITY NOTES:
 * - For production: Use environment variables instead of hardcoding
 * - Never commit real API keys to version control
 * - Use Sandbox credentials for testing
 * - Use Production credentials only when going live
 */

export const SQUARE_CONFIG = {
  // Replace with your Square Access Token
  accessToken: 'EAAAl4HHKiDzV69KvVVIYZp4qdguGQdxB3dq1V65mnR-xcqgyFGE-VWeq-LLXL3F',
  
  // Square Application ID (found in Developer Dashboard)
  applicationId: 'EAAAl4HHKiDzV69KvVVIYZp4qdguGQdxB3dq1V65mnR-xcqgyFGE-VWeq-LLXL3F',
  
  // Location ID (found in Square Dashboard > Locations)
  locationId: 'LMVSQK9C6PR4T', // Your current Brandon location ID
  
  // Environment: 'sandbox' for testing, 'production' for live
  environment: 'production' as 'sandbox' | 'production',
  
  // API Base URL (auto-configured based on environment)
  get baseUrl() {
    return this.environment === 'production'
      ? 'https://connect.squareup.com'
      : 'https://connect.squareupsandbox.com';
  },
  
  // API Version
  apiVersion: '2024-12-18',
};

/**
 * Check if Square API is configured
 */
export function isSquareConfigured(): boolean {
  return (
    SQUARE_CONFIG.accessToken !== 'YOUR_SQUARE_ACCESS_TOKEN_HERE' &&
    SQUARE_CONFIG.applicationId !== 'YOUR_SQUARE_APPLICATION_ID_HERE'
  );
}

/**
 * Get API headers for Square requests
 */
export function getSquareHeaders(): HeadersInit {
  return {
    'Square-Version': SQUARE_CONFIG.apiVersion,
    'Authorization': `Bearer ${SQUARE_CONFIG.accessToken}`,
    'Content-Type': 'application/json',
  };
}