export const FIELD_IDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
} as const;

export const FORM_VALUE = {
  value: '',
  isError: false,
  errorMessage: '',
};

export const DEFAULT_FORM_VALUES = {
  [FIELD_IDS.EMAIL]: FORM_VALUE,
  [FIELD_IDS.PASSWORD]: FORM_VALUE,
};

export const FIELD_ID_VS_ERROR_MESSAGES = {
  [FIELD_IDS.EMAIL]: {
    REQUIRED_ERROR: 'Email cannot be empty',
    DATA_INVALID_ERROR: 'Email is not valid',
  },
  [FIELD_IDS.PASSWORD]: {
    REQUIRED_ERROR: 'Password cannot be empty',
  },
};
