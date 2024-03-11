import { LabelHTMLAttributes, memo } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

function Label(props: LabelProps) {
  const { className, ...rest } = props;
  return <label {...rest} className={`block ${className}`} />;
}

export default memo(Label);
