// Types
import { FormData } from './JoinNowForm';

// Utils
import { ValueOf } from '@/utils/type';

// Constants
import {
  FIELD_ID_VS_ERROR_MESSAGES,
  FIELD_IDS,
  FORM_VALUE,
} from './joinNowForm.constants';

export interface ValidateFormDataResponse {
  updatedFormData: FormData;
  hasFormError: boolean;
}

export function validateFieldData(
  currentFieldValue: typeof FORM_VALUE,
  fieldId: ValueOf<typeof FIELD_IDS>,
  formData?: FormData
): {
  updatedErrorValues: {
    [fieldName in Partial<ValueOf<typeof FIELD_IDS>>]?: Partial<
      typeof FORM_VALUE
    >;
  };
  hasFieldError: boolean;
} {
  if (fieldId === FIELD_IDS.PASSWORD) {
    const passwordValue = currentFieldValue.value;
    const confirmPasswordValue = formData?.confirmPassword.value;

    if (passwordValue === '') {
      return {
        updatedErrorValues: {
          password: {
            isError: true,
            errorMessage:
              FIELD_ID_VS_ERROR_MESSAGES[FIELD_IDS.PASSWORD].REQUIRED_ERROR,
          },
        },
        hasFieldError: true,
      };
    }

    if (passwordValue !== confirmPasswordValue && confirmPasswordValue !== '') {
      return {
        updatedErrorValues: {
          confirmPassword: {
            isError: true,
            errorMessage:
              FIELD_ID_VS_ERROR_MESSAGES[FIELD_IDS.CONFIRM_PASSWORD]
                .DATA_INVALID_ERROR,
          },
          password: {
            isError: false,
            errorMessage: '',
          },
        },
        hasFieldError: true,
      };
    }
    if (passwordValue !== confirmPasswordValue && confirmPasswordValue === '') {
      return {
        updatedErrorValues: {
          confirmPassword: {
            isError: true,
            errorMessage:
              FIELD_ID_VS_ERROR_MESSAGES[FIELD_IDS.CONFIRM_PASSWORD]
                .REQUIRED_ERROR,
          },
          password: {
            isError: false,
            errorMessage: '',
          },
        },
        hasFieldError: true,
      };
    }

    return {
      updatedErrorValues: {
        confirmPassword: {
          isError: false,
          errorMessage: '',
        },
        password: {
          isError: false,
          errorMessage: '',
        },
      },
      hasFieldError: false,
    };
  }

  if (fieldId === FIELD_IDS.CONFIRM_PASSWORD) {
    const confirmPasswordValue = currentFieldValue.value;
    const passwordValue = formData?.password.value;

    if (confirmPasswordValue === '') {
      return {
        updatedErrorValues: {
          confirmPassword: {
            isError: true,
            errorMessage:
              FIELD_ID_VS_ERROR_MESSAGES[FIELD_IDS.CONFIRM_PASSWORD]
                .REQUIRED_ERROR,
          },
        },
        hasFieldError: true,
      };
    }

    if (confirmPasswordValue !== passwordValue) {
      return {
        updatedErrorValues: {
          confirmPassword: {
            isError: true,
            errorMessage:
              FIELD_ID_VS_ERROR_MESSAGES[FIELD_IDS.CONFIRM_PASSWORD]
                .DATA_INVALID_ERROR,
          },
          password: {
            isError: false,
            errorMessage: '',
          },
        },
        hasFieldError: true,
      };
    }

    return {
      updatedErrorValues: {
        confirmPassword: {
          isError: false,
          errorMessage: '',
        },
        password: {
          isError: false,
          errorMessage: '',
        },
      },
      hasFieldError: false,
    };
  }

  if (currentFieldValue.value === '') {
    return {
      updatedErrorValues: {
        [fieldId]: {
          isError: true,
          errorMessage: FIELD_ID_VS_ERROR_MESSAGES[fieldId].REQUIRED_ERROR,
        },
      },
      hasFieldError: true,
    };
  }

  return {
    updatedErrorValues: {
      [fieldId]: {
        isError: false,
        errorMessage: '',
      },
    },
    hasFieldError: false,
  };
}

export function validateFormData(formData: FormData): ValidateFormDataResponse {
  const fieldNames: ValueOf<typeof FIELD_IDS>[] = Object.keys(
    formData
  ) as ValueOf<typeof FIELD_IDS>[];
  const { updatedFormData, hasFormError }: ValidateFormDataResponse =
    fieldNames.reduce(
      (acc, currentFieldName) => {
        const currentFieldValue = formData[currentFieldName];

        const { updatedErrorValues, hasFieldError } = validateFieldData(
          currentFieldValue,
          currentFieldName,
          formData
        );

        const updatedValues = Object.entries(updatedErrorValues).map(
          ([fieldName, fieldErrorValue]) => {
            if (fieldName === currentFieldName) {
              return {
                [currentFieldName]: {
                  ...currentFieldValue,
                  ...fieldErrorValue,
                },
              };
            }
            const fieldValue = formData[fieldName as ValueOf<typeof FIELD_IDS>];

            return {
              [fieldName]: {
                ...fieldValue,
                ...fieldErrorValue,
              },
            };
          }
        );

        return {
          hasFormError: hasFieldError || acc.hasFormError,
          updatedFormData: Object.assign(
            {},
            acc.updatedFormData,
            ...updatedValues
          ),
        };
      },
      { hasFormError: false, updatedFormData: {} } as ValidateFormDataResponse
    );

  return { updatedFormData, hasFormError };
}
