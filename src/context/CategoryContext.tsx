import React, { createContext, useContext, useState } from 'react';

export const CATEGORIES = [
  'ALL',
  'WOMEN',
  'MEN',
  'FRAGRANCES',
  'MAKEUP',
  'LEATHER GOODS',
  'JEWELRY',
  'WATCHES',
  'SURPRISES & GIFTS'
] as const;

export type Category = (typeof CATEGORIES)[number];

interface CategoryContextType {
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');

  return (
    <CategoryContext.Provider value={{ activeCategory, setActiveCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
}
