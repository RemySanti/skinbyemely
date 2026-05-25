const fs = require('fs');
const path = require('path');

// Configuration from config/square.ts
const SQUARE_CONFIG = {
  accessToken: 'EAAAl4HHKiDzV69KvVVIYZp4qdguGQdxB3dq1V65mnR-xcqgyFGE-VWeq-LLXL3F',
  baseUrl: 'https://connect.squareup.com',
  apiVersion: '2024-12-18',
};

async function fetchProducts() {
  console.log('Fetching products from Square API...');
  
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
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const items = data.objects || [];
    
    console.log(`Successfully fetched ${items.length} products.`);
    
    // Define path to save (relative to script location)
    const outputPath = path.join(__dirname, 'config', 'square-products.json');
    
    // Save to file
    fs.writeFileSync(outputPath, JSON.stringify(items, null, 2));
    console.log(`Saved product data to: ${outputPath}`);
    console.log('You can now see your products in the application.');
    
  } catch (error) {
    console.error('Failed to fetch products:', error);
    process.exit(1);
  }
}

fetchProducts();
