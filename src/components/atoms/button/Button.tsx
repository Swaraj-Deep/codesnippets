import { ButtonHTMLAttributes } from 'react';

// Types
import { VARIANTS } from '@/types/buttonVariants';
import { getClassname } from '@/helpers/buttonClassnames';
import { Loader } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: VARIANTS;
  isLoading?: boolean;
}

function Button(props: ButtonProps) {
  const {
    label,
    className = '',
    variant = 'primary',
    isLoading,
    ...rest
  } = props;
  const variantClassname = getClassname(variant);
  const loadingClassName = isLoading ? 'pointer-events-none  gap-2' : '';
  return (
    <button
      {...rest}
      className={`px-5 flex items-center justify-center h-11 ${variantClassname} ${loadingClassName} ${className}`}
    >
      {isLoading ? <Loader className="animate-spin-slow" /> : label}
    </button>
  );
}

export default Button;
