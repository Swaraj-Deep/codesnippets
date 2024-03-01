// Types
import { VARIANTS } from '@/types/buttonVariants';

function getVariantClassname(variant: VARIANTS) {
  switch (variant) {
    case 'primary':
      return 'bg-gray-600 border-gray-600 hover:bg-gray-700 hover:border-gray-700';
    case 'accent':
      return 'bg-stone-600 border-stone-600 hover:bg-stone-700 hover:border-stone-700';
    case 'outline':
      return 'border-gray-600 hover:bg-gray-600';
  }
}

export function getClassname(variant: VARIANTS) {
  const baseClassname = 'p-2 border rounded-sm';
  const variantClassname = getVariantClassname(variant);
  return baseClassname + ' ' + variantClassname;
}
