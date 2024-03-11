import {
  ChangeEvent,
  FormEvent,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from 'react';

// Utils
import { ValueOf } from '@/utils/type';

// Constants
import {
  DEFAULT_FORM_VALUES,
  FIELD_IDS,
  FORM_VALUE,
} from './joinNowForm.constants';

// Components
import FormTextField from '@/components/molecules/formTextField';
import { validateFieldData, validateFormData } from './joinNowForm.helpers';

export type FormData = {
  [fieldName in ValueOf<typeof FIELD_IDS>]: typeof FORM_VALUE;
};

interface JoinNowFormProps {
  onSubmit: (data: FormData, e?: FormEvent<HTMLFormElement>) => void;
}

const JoinNowForm = forwardRef<HTMLFormElement, JoinNowFormProps>(
  (props: JoinNowFormProps, ref) => {
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
          if (!hasFormError) onSubmit(formData, e);
        }}
        ref={ref}
      >
        <div className="flex gap-2">
          <FormTextField
            id={FIELD_IDS.FIRST_NAME}
            label="First Name"
            errorMessage={formData[FIELD_IDS.FIRST_NAME].errorMessage}
            isError={formData[FIELD_IDS.FIRST_NAME].isError}
            isRequired
            className="basis-3/6"
            value={formData[FIELD_IDS.FIRST_NAME].value}
            onChange={onFieldChange}
            autoFocus
          />
          <FormTextField
            id={FIELD_IDS.LAST_NAME}
            label="Last Name"
            errorMessage={formData[FIELD_IDS.LAST_NAME].errorMessage}
            isError={formData[FIELD_IDS.LAST_NAME].isError}
            isRequired
            className="basis-3/6"
            value={formData[FIELD_IDS.LAST_NAME].value}
            onChange={onFieldChange}
          />
        </div>
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
        <FormTextField
          id={FIELD_IDS.CONFIRM_PASSWORD}
          label="Confirm Password"
          errorMessage={formData[FIELD_IDS.CONFIRM_PASSWORD].errorMessage}
          isError={formData[FIELD_IDS.CONFIRM_PASSWORD].isError}
          isRequired
          type="password"
          value={formData[FIELD_IDS.CONFIRM_PASSWORD].value}
          onChange={onFieldChange}
        />
      </form>
    );
  }
);

JoinNowForm.displayName = 'JoinNowForm';

export default JoinNowForm;
