import Link from 'next/link';

// Types
import { VARIANTS } from '@/types/buttonVariants';

// Helpers
import { getClassname } from '@/helpers/buttonClassnames';

export interface LinkButtonProps {
  href: string;
  label: string;
  className?: string;
  variant?: VARIANTS;
}

function LinkButton(props: LinkButtonProps) {
  const { href, label, className = '', variant = 'primary' } = props;
  const buttonClassname = getClassname(variant);

  return (
    <Link
      href={href}
      className={`flex justify-center items-center ${buttonClassname} ${className}`}
    >
      <h6>{label}</h6>
    </Link>
  );
}

export default LinkButton;
