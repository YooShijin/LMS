"use client";

import { Category } from "@prisma/client";

import { IconType } from "react-icons";

import {
  FcMusic,
  FcFilmReel,
  FcMultipleDevices,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  CDS: FcSportsMode,
  "Bihar Board": FcFilmReel,
  JEE: FcMultipleDevices,
  NEET: FcOldTimeCamera,
  NDA: FcSalesPerformance,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
