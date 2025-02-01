import { categories, resources } from './data';
import type { Category, Resource } from './types';

export interface SearchResult {
  type: 'category' | 'resource';
  category: Category;
  resource?: Resource;
  matchReason: string;
}

export function searchContent(query: string): SearchResult[] {
  if (!query.trim()) return [];
  
  const searchTerms = query.toLowerCase().split(' ');
  const results: SearchResult[] = [];

  // Search through categories
  categories.forEach(category => {
    const categoryText = `${category.title} ${category.description}`.toLowerCase();
    
    if (searchTerms.some(term => categoryText.includes(term))) {
      results.push({
        type: 'category',
        category,
        matchReason: 'Found in category description'
      });
    }

    // Search through resources in this category
    const categoryResources = resources[category.id] || [];
    categoryResources.forEach(resource => {
      const resourceText = `
        ${resource.title} 
        ${resource.description} 
        ${resource.details?.openingHours || ''} 
        ${resource.details?.address || ''} 
        ${resource.details?.requirements || ''}
      `.toLowerCase();

      if (searchTerms.some(term => resourceText.includes(term))) {
        results.push({
          type: 'resource',
          category,
          resource,
          matchReason: 'Found in resource details'
        });
      }
    });
  });

  return results;
}