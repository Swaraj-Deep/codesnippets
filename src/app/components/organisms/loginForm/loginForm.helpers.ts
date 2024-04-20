// Types
import { FormData } from './loginForm';

// Utils
import { ValueOf } from '@/utils/type';

// Constants
import {
  FIELD_ID_VS_ERROR_MESSAGES,
  FIELD_IDS,
  FORM_VALUE,
} from './loginForm.constants';
import { EMIAL_REGEX } from '@/constants/common';

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
  if (fieldId === FIELD_IDS.EMAIL) {
    const email = currentFieldValue.value;
    const isValidEmail = email.toLowerCase().match(EMIAL_REGEX);
    if (email === '') {
      return {
        updatedErrorValues: {
          email: {
            isError: true,
            errorMessage:
              FIELD_ID_VS_ERROR_MESSAGES[FIELD_IDS.EMAIL].REQUIRED_ERROR,
          },
        },
        hasFieldError: true,
      };
    }
    if (!isValidEmail) {
      return {
        updatedErrorValues: {
          email: {
            isError: true,
            errorMessage:
              FIELD_ID_VS_ERROR_MESSAGES[FIELD_IDS.EMAIL].DATA_INVALID_ERROR,
          },
        },
        hasFieldError: true,
      };
    }
    return {
      updatedErrorValues: {
        email: {
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
