// Temporary script to fetch Square Service IDs
const SQUARE_CONFIG = {
  accessToken: 'EAAAl4HHKiDzV69KvVVIYZp4qdguGQdxB3dq1V65mnR-xcqgyFGE-VWeq-LLXL3F',
  baseUrl: 'https://connect.squareup.com',
  apiVersion: '2024-12-18',
};

async function fetchSquareServices() {
  try {
    const response = await fetch(`${SQUARE_CONFIG.baseUrl}/v2/catalog/list`, {
      method: 'POST',
      headers: {
        'Square-Version': SQUARE_CONFIG.apiVersion,
        'Authorization': `Bearer ${SQUARE_CONFIG.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        types: ['ITEM'],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Square API Error:', errorData);
      return;
    }

    const data = await response.json();
    const items = data.objects || [];

    // Filter for appointment services
    const services = items.filter(item => {
      return item.item_data?.variations?.some(
        v => v.item_variation_data?.service_duration
      );
    });

    console.log('\n=== YOUR SQUARE SERVICES ===\n');
    
    services.forEach(service => {
      const name = service.item_data?.name || 'Unnamed';
      const description = service.item_data?.description || '';
      const variationId = service.item_data?.variations?.[0]?.id || service.id;
      const duration = service.item_data?.variations?.[0]?.item_variation_data?.service_duration;
      
      console.log(`Service: ${name}`);
      if (description) console.log(`Description: ${description}`);
      if (duration) console.log(`Duration: ${duration} minutes`);
      console.log(`SERVICE VARIATION ID: ${variationId}`);
      console.log(`Item ID: ${service.id}`);
      console.log('---\n');
    });

    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
  }
}

fetchSquareServices();
