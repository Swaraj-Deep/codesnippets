interface TextFieldIndicatorParams {
  isError: boolean;
  errorMessage: string;
  helperText: string;
}

export function renderFormTextFieldIndicators(
  textFieldIndicatorParams: TextFieldIndicatorParams
) {
  const { errorMessage, helperText, isError } = textFieldIndicatorParams;

  const errorNode = (
    <span className="block mt-1 text-red-800">{errorMessage}</span>
  );

  const helperTextNode = <span className="block mt-1">{helperText}</span>;

  return isError ? errorNode : !!helperText ? helperTextNode : null;
}
