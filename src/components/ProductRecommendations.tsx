'use client';

import { useApp } from '@/context/AppContext';
import { Product } from '@/types';
import { ChevronRight } from 'lucide-react';

interface ProductRecommendationsProps {
  customerId: string;
}

export default function ProductRecommendations({ customerId }: ProductRecommendationsProps) {
  const { products, transactions } = useApp();

  // Get customer's purchase history
  const customerTransactions = transactions.filter(
    (t) => t.customerId === customerId && t.type === 'earn' && t.productIds
  );

  // Get all product IDs the customer has purchased
  const purchasedProductIds = new Set(
    customerTransactions.flatMap((t) => t.productIds || [])
  );

  // Count frequency of each product
  const productFrequency: Record<string, number> = {};
  customerTransactions.forEach((t) => {
    t.productIds?.forEach((pid) => {
      productFrequency[pid] = (productFrequency[pid] || 0) + 1;
    });
  });

  // Get customer's favorite categories
  const categoryFrequency: Record<string, number> = {};
  customerTransactions.forEach((t) => {
    t.productIds?.forEach((pid) => {
      const product = products.find((p) => p.id === pid);
      if (product) {
        categoryFrequency[product.category] = (categoryFrequency[product.category] || 0) + 1;
      }
    });
  });

  // Sort categories by frequency
  const favoriteCategories = Object.entries(categoryFrequency)
    .sort(([, a], [, b]) => b - a)
    .map(([cat]) => cat);

  // Recommendation algorithm
  const getRecommendations = (): Product[] => {
    const recommendations: Product[] = [];

    // 1. Products they frequently buy (top 2)
    const frequentProducts = Object.entries(productFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([pid]) => products.find((p) => p.id === pid))
      .filter((p): p is Product => p !== undefined);

    recommendations.push(...frequentProducts);

    // 2. Products from their favorite categories they haven't tried
    const categoryRecommendations = products.filter(
      (p) =>
        favoriteCategories.includes(p.category) &&
        !purchasedProductIds.has(p.id) &&
        p.popular
    ).slice(0, 3);

    recommendations.push(...categoryRecommendations);

    // 3. Popular products they haven't tried
    const popularRecommendations = products.filter(
      (p) => p.popular && !purchasedProductIds.has(p.id)
    ).slice(0, 2);

    recommendations.push(...popularRecommendations);

    // Remove duplicates and limit to 5
    const uniqueRecommendations = Array.from(
      new Map(recommendations.map((p) => [p.id, p])).values()
    ).slice(0, 5);

    return uniqueRecommendations;
  };

  const recommendedProducts = getRecommendations();

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-xl font-heading font-bold text-gray-900">Recommended For You</h3>
          <p className="text-sm text-gray-600 mt-1">Based on your favorites</p>
        </div>
        <button className="text-starbucks-green hover:text-starbucks-light-green transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Horizontal scrolling product cards */}
      <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide -mx-2 px-2">
        {recommendedProducts.map((product) => {
          const isPurchased = purchasedProductIds.has(product.id);
          const frequency = productFrequency[product.id] || 0;

          return (
            <div
              key={product.id}
              className="flex-shrink-0 w-48 bg-starbucks-cream rounded-2xl overflow-hidden border-2 border-transparent hover:border-starbucks-green transition-all cursor-pointer group"
            >
              {/* Product Image */}
              <div className="bg-gradient-to-br from-starbucks-cream to-starbucks-tan p-8 text-center relative">
                <div className="text-6xl group-hover:scale-110 transition-transform">{product.image}</div>
                {isPurchased && frequency > 0 && (
                  <div className="absolute top-2 right-2 bg-starbucks-green text-white text-xs font-bold px-2 py-1 rounded-full">
                    ♥ {frequency}x
                  </div>
                )}
                {!isPurchased && product.popular && (
                  <div className="absolute top-2 left-2 bg-starbucks-gold text-white text-xs font-bold px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h4 className="font-bold text-gray-900 mb-1 text-sm line-clamp-1">
                  {product.name}
                </h4>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-starbucks-green">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500">
                    +{Math.floor(product.price * 10)} ⭐
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category insight */}
      {favoriteCategories.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-600 text-center">
            You love{' '}
            <span className="font-bold text-starbucks-green">
              {favoriteCategories[0].replace('-', ' ')}
            </span>
            {favoriteCategories.length > 1 && (
              <>
                {' '}and{' '}
                <span className="font-bold text-starbucks-green">
                  {favoriteCategories[1].replace('-', ' ')}
                </span>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
