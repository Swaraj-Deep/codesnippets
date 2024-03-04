import { ButtonHTMLAttributes } from 'react';

// Types
import { VARIANTS } from '@/types/buttonVariants';
import { getClassname } from '@/helpers/buttonClassnames';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: VARIANTS;
}

function Button(props: ButtonProps) {
  const { label, className = '', variant = 'primary', ...rest } = props;
  const variantClassname = getClassname(variant);
  return (
    <button {...rest} className={`px-5 ${variantClassname} ${className}`}>
      {label}
    </button>
  );
}

export default Button;
