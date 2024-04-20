import {
  ChangeEvent,
  FormEvent,
  forwardRef,
  useCallback,
  useState,
} from 'react';

// Utils
import { ValueOf } from '@/utils/type';

// Constants
import {
  DEFAULT_FORM_VALUES,
  FIELD_IDS,
  FORM_VALUE,
} from './loginForm.constants';

// Components
import FormTextField from '@/components/molecules/formTextField';
import { validateFieldData, validateFormData } from './loginForm.helpers';

export type FormData = {
  [fieldName in ValueOf<typeof FIELD_IDS>]: typeof FORM_VALUE;
};

interface LoginFormProps {
  onSubmit?: (data: FormData, e?: FormEvent<HTMLFormElement>) => void;
}

const LoginForm = forwardRef<HTMLFormElement, LoginFormProps>(
  (props: LoginFormProps, ref) => {
    const { onSubmit } = props;

    const [isUntouched, setIsUntouched] = useState(true);
    const [formData, setFormData] = useState(DEFAULT_FORM_VALUES);

    const onFieldChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const currentFieldName = e.target.name as ValueOf<typeof FIELD_IDS>;

        setFormData((prevFormData) => {
          const currentFieldValue = prevFormData[currentFieldName];

          const updatedFieldValue: typeof currentFieldValue = {
            ...currentFieldValue,
            value: e.target.value,
          };

          const { updatedErrorValues } = validateFieldData(
            updatedFieldValue,
            currentFieldName,
            prevFormData
          );

          const updatedValues = Object.entries(updatedErrorValues).map(
            ([fieldName, fieldErrorValue]) => {
              if (fieldName === currentFieldName) {
                return {
                  [currentFieldName]: {
                    ...updatedFieldValue,
                    ...(!isUntouched && fieldErrorValue),
                  },
                };
              }
              const fieldValue =
                prevFormData[fieldName as ValueOf<typeof FIELD_IDS>];

              return {
                [fieldName]: {
                  ...fieldValue,
                  ...(!isUntouched && fieldErrorValue),
                },
              };
            }
          );

          return Object.assign({}, prevFormData, ...updatedValues);
        });
      },
      [isUntouched]
    );

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsUntouched(false);
          const { updatedFormData, hasFormError } = validateFormData(formData);
          setFormData(updatedFormData);
          if (!hasFormError && onSubmit) onSubmit(formData, e);
        }}
        ref={ref}
      >
        <FormTextField
          id={FIELD_IDS.EMAIL}
          label="Email"
          errorMessage={formData[FIELD_IDS.EMAIL].errorMessage}
          isError={formData[FIELD_IDS.EMAIL].isError}
          isRequired
          placeholder="someone@example.com"
          value={formData[FIELD_IDS.EMAIL].value}
          onChange={onFieldChange}
        />
        <FormTextField
          id={FIELD_IDS.PASSWORD}
          label="Password"
          errorMessage={formData[FIELD_IDS.PASSWORD].errorMessage}
          isError={formData[FIELD_IDS.PASSWORD].isError}
          isRequired
          type="password"
          value={formData[FIELD_IDS.PASSWORD].value}
          onChange={onFieldChange}
        />
      </form>
    );
  }
);

LoginForm.displayName = 'LoginForm';

export default LoginForm;
