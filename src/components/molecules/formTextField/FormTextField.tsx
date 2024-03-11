import { memo } from 'react';

// Helpers
import { getTextFieldProps } from './formTextField.helpers';

// Components
import TextField, { TextFieldProps } from '@/components/molecules/textField';
import { renderFormTextFieldIndicators } from './formTextField.components';

interface FormTextFieldProps extends TextFieldProps {
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string;
  helperText?: string;
  className?: string;
}

function FormTextField(props: FormTextFieldProps) {
  const {
    isRequired = false,
    isError = false,
    errorMessage = '',
    helperText = '',
    label = '',
    className,
    id,
    ...rest
  } = props;

  const textFieldProps = getTextFieldProps({ isError, isRequired, label });

  return (
    <div className={`h-[101px] ${className}`}>
      <TextField {...textFieldProps} name={id} {...rest} />
      {renderFormTextFieldIndicators({ isError, errorMessage, helperText })}
    </div>
  );
}

export default memo(FormTextField);
