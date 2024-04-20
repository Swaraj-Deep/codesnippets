const ERR_001 = 'ERR_001';
const ERR_002 = 'ERR_002';
const ERR_003 = 'ERR_003';
const ERR_004 = 'ERR_004';
const ERR_005 = 'ERR_005';

export const ERROR_CODES = {
  ERR_001,
  ERR_002,
  ERR_003,
  ERR_004,
  ERR_005,
} as const;

export const ERROR_CODES_VS_MESSAGE = {
  [ERROR_CODES.ERR_001]: 'Email already registered. Please login to continue.',
  [ERROR_CODES.ERR_002]: 'Email is not valid.',
  [ERROR_CODES.ERR_003]: 'Passwords do not match.',
  [ERROR_CODES.ERR_004]: 'User not registered.',
  [ERROR_CODES.ERR_005]: 'Password not correct.',
} as const;
