
import { parse } from "npm:csv-parse/sync";
import { readFileSync, writeFileSync } from "node:fs";

const csvContent = readFileSync("products.csv", "utf-8");
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true
});

const products = records.map(record => {
  const price = parseFloat(record["Price"]);
  const priceInCents = isNaN(price) ? 0 : Math.round(price * 100);
  
  return {
    type: "ITEM",
    id: record["Token"],
    item_data: {
      name: record["Item Name"],
      description: record["Description"],
      category_id: record["Categories"], // Mapping Categories to category_id for now, or just keep it in metadata
      // Storing extra fields for reference, though square-products-data.ts structure is strict.
      // I'll add them to item_data so they can be accessed.
      seo_title: record["SEO Title"],
      seo_description: record["SEO Description"],
      permalink: record["Permalink"],
      gtin: record["GTIN"],
      visibility: record["Square Online Item Visibility"],
      item_type: record["Item Type"],
      weight: record["Weight (lb)"],
      shipping_enabled: record["Shipping Enabled"],
      variations: [
        {
          id: `var-${record["Token"]}`, // Generating a variation ID
          item_variation_data: {
            name: record["Variation Name"] || "Regular",
            price_money: {
              amount: priceInCents,
              currency: "USD"
            }
          }
        }
      ]
    }
  };
});

const fileContent = `export const SQUARE_PRODUCTS_DATA = ${JSON.stringify(products, null, 2)};`;

writeFileSync("config/square-products-data.ts", fileContent);
console.log("Updated config/square-products-data.ts");
