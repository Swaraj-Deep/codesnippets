import { InputHTMLAttributes, ReactNode, memo } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  endIcon?: ReactNode;
}

function Input(props: InputProps) {
  const { className, endIcon, ...rest } = props;
  return (
    <input
      {...rest}
      className={`bg-inherit border border-gray-700 outline-none rounded-sm px-4 py-2 w-full ${className}`}
    />
  );
}

export default memo(Input);
