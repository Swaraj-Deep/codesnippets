import { InputHTMLAttributes } from 'react';

// Components
import Label from '@/components/atoms/label';
import Input from '@/components/atoms/input';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
}

function TextField(props: TextFieldProps) {
  const { id, label, labelClassName, ...rest } = props;
  return (
    <>
      <Label htmlFor={id} className={`mb-1 ${labelClassName}`}>
        {label}
      </Label>
      <Input id={id} {...rest} />
    </>
  );
}

export default TextField;
