export const FIELD_IDS = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
} as const;

export const FORM_VALUE = {
  value: '',
  isError: false,
  errorMessage: '',
};

export const DEFAULT_FORM_VALUES = {
  [FIELD_IDS.FIRST_NAME]: FORM_VALUE,
  [FIELD_IDS.LAST_NAME]: FORM_VALUE,
  [FIELD_IDS.EMAIL]: FORM_VALUE,
  [FIELD_IDS.PASSWORD]: FORM_VALUE,
  [FIELD_IDS.CONFIRM_PASSWORD]: FORM_VALUE,
};

export const FIELD_ID_VS_ERROR_MESSAGES = {
  [FIELD_IDS.FIRST_NAME]: { REQUIRED_ERROR: 'First name cannot be empty' },
  [FIELD_IDS.LAST_NAME]: { REQUIRED_ERROR: 'Last name cannot be empty' },
  [FIELD_IDS.EMAIL]: {
    REQUIRED_ERROR: 'Email cannot be empty',
    DATA_INVALID_ERROR: 'Email is not valid',
  },
  [FIELD_IDS.PASSWORD]: {
    REQUIRED_ERROR: 'Password cannot be empty',
    DATA_INVALID_ERROR: 'Passwords should match',
  },
  [FIELD_IDS.CONFIRM_PASSWORD]: {
    REQUIRED_ERROR: 'Confirm password cannot be empty',
    DATA_INVALID_ERROR: 'Passwords should match',
  },
};
