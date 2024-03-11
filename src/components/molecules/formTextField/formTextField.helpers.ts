import { TextFieldProps } from '../textField';

interface GetTextFieldPropsParams {
  label: string;
  isRequired: boolean;
  isError: boolean;
}

export function getTextFieldProps(
  params: GetTextFieldPropsParams
): Partial<TextFieldProps> {
  const { label, isError, isRequired } = params;

  const inputLabel = label + (isRequired ? ' *' : '');
  const errorClassName = isError ? 'text-red-800' : '';
  const textBoxClassName = isError ? 'focus:border-red-800' : '';

  return {
    label: inputLabel,
    labelClassName: errorClassName,
    className: textBoxClassName,
  };
}
