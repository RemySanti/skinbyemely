import { projectId, publicAnonKey } from '../utils/supabase/info';

export interface CheckoutConfig {
  checkoutTitle?: string;
  checkoutMessage?: string;
  termsMessage?: string;
}

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-fd83a735`;

export const checkoutConfigService = {
  async getConfig(): Promise<CheckoutConfig> {
    try {
      const response = await fetch(`${API_URL}/checkout-config`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch checkout config');
      }

      const data = await response.json();
      return data.config || {};
    } catch (error) {
      console.error('Error fetching checkout config:', error);
      return {};
    }
  },

  async saveConfig(config: CheckoutConfig): Promise<void> {
    const response = await fetch(`${API_URL}/checkout-config`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to save checkout config');
    }
  },
};
