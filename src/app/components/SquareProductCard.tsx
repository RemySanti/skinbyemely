/**
 * Square Product Card Component
 * Displays a product from Square Catalog with purchase functionality
 */

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ShoppingCart, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import type { SquareProduct } from '../services/squareService';
import { cartService } from '../services/cartService';
import { stripHtml } from './ui/utils';
import { motion } from 'motion/react';
import { productCardHover, EASE_LUXURY } from '../utils/motion';

interface SquareProductCardProps {
  product: SquareProduct;
  onAddToCart?: (product: SquareProduct) => void;
}

export function SquareProductCard({ product, onAddToCart }: SquareProductCardProps) {
  const [isInCart, setIsInCart] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    // Check initial state
    setIsInCart(cartService.isInCart(product.id));

    // Subscribe to cart changes
    const unsubscribe = cartService.subscribeToCart(() => {
        setIsInCart(cartService.isInCart(product.id));
    });

    return unsubscribe;
  }, [product.id]);

  const handleAction = () => {
    if (isInCart) {
        // Open cart drawer
        window.dispatchEvent(new Event('open-cart-drawer'));
    } else {
        // Add to cart
        if (onAddToCart) {
            onAddToCart(product);
        }
        // Fallback if onAddToCart doesn't use the service directly (though it probably should/does)
        // But assuming onAddToCart calls cartService.addToCart, the subscription will update isInCart.
        
        // Show immediate feedback
        setJustAdded(true);
        setTimeout(() => {
            setJustAdded(false);
            // Open drawer after short delay for feedback visibility
             window.dispatchEvent(new Event('open-cart-drawer'));
        }, 800);
    }
  };

  return (
    <motion.div 
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      variants={productCardHover}
      className="group bg-white p-8 border border-[#b8956a]/15 transition-colors relative flex flex-col h-full"
    >
      {/* Product Image */}
      {product.imageUrl && product.imageUrl.startsWith('http') ? (
        <div className="aspect-square mb-6 overflow-hidden rounded">
          <motion.img
            transition={{ duration: 0.5, ease: EASE_LUXURY }}
            variants={{
              hover: { scale: 1.05 }
            }}
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-square mb-6 overflow-hidden rounded bg-[#faf8f5] flex items-center justify-center">
           <ShoppingBag className="w-12 h-12 text-[#b8956a]/30" />
        </div>
      )}

      {/* Category Badge */}
      {product.category && (
        <div className="text-xs tracking-wider text-[#b8956a] mb-4">
          {product.category}
        </div>
      )}

      {/* Product Name */}
      <h3 className="text-xl font-serif text-[#2c2c2c] mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        {product.name}
      </h3>

      {/* Description */}
      {product.description && (
        <p className="text-[#6b6b6b] mb-6 leading-relaxed line-clamp-2">
          {stripHtml(product.description)}
        </p>
      )}

      {/* Price & Add to Cart */}
      <div className="flex items-center justify-between pt-6 border-t border-[#b8956a]/15 mt-auto">
        <div className="text-2xl font-serif text-[#2c2c2c]">
          ${product.price.toFixed(2)}
        </div>
        
        <motion.div
          className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
        >
          <Button
            onClick={handleAction}
            className={`
              ${(isInCart || justAdded) ? 'bg-[#2c2c2c] hover:bg-[#1a1a1a] text-white' : 'btn-bronze'}
              px-6 py-3 rounded transition-all min-w-[140px]
            `}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Added
              </>
            ) : isInCart ? (
              <>
                Go to Cart
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Variations (if any) */}
      {product.variations && product.variations.length > 1 && (
        <div className="mt-4 pt-4 border-t border-[#b8956a]/15">
          <div className="text-xs tracking-wider text-[#b8956a] mb-2">
            AVAILABLE OPTIONS
          </div>
          <div className="space-y-1">
            {product.variations.map((variation) => (
              <div
                key={variation.id}
                className="flex justify-between text-sm text-[#6b6b6b]"
              >
                <span>{variation.name}</span>
                <span>${variation.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
