export const ROUTES = {
  INDEX: '/',
  SEARCH: '/search',
  CREATE_SNIPPET: '/snippet',
  JOIN_NOW: '/join-now',
  LOGIN: '/login',
} as const;

export const SEARCH_QUERIES = {
  LOGIN: { key: 'login-modal', value: 'true' },
  JOIN_NOW: { key: 'join-now-modal', value: 'true' },
};
