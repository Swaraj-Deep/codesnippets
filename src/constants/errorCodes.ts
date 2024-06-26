const ERR_001 = 'ERR_001';
const ERR_002 = 'ERR_002';
const ERR_003 = 'ERR_003';
const ERR_004 = 'ERR_004';
const ERR_005 = 'ERR_005';
const ERR_006 = 'ERR_006';
const ERR_007 = 'ERR_007';
const ERR_008 = 'ERR_008';
const ERR_009 = 'ERR_009';
const ERR_010 = 'ERR_010';

export const ERROR_CODES = {
  ERR_001,
  ERR_002,
  ERR_003,
  ERR_004,
  ERR_005,
  ERR_006,
  ERR_007,
  ERR_008,
  ERR_009,
  ERR_010,
} as const;

export const ERROR_CODES_VS_MESSAGE = {
  [ERROR_CODES.ERR_001]: 'Email already registered. Please login to continue.',
  [ERROR_CODES.ERR_002]: 'Email is not valid.',
  [ERROR_CODES.ERR_003]: 'Passwords do not match.',
  [ERROR_CODES.ERR_004]: 'User not registered.',
  [ERROR_CODES.ERR_005]: 'Password not correct.',
  [ERROR_CODES.ERR_006]: 'Token expired. Please login again.',
  [ERROR_CODES.ERR_007]: 'Something went wrong. Please try again later.',
  [ERROR_CODES.ERR_008]: 'Code is not saved yet. Please save and share.',
  [ERROR_CODES.ERR_009]: 'Invaild share Id.',
  [ERROR_CODES.ERR_010]: 'This snippet is not shared with you.',
} as const;
