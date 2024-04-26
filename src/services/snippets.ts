import { BASE_URL, SHARED_SNIPPET, SHARE_SNIPPET, SNIPPETS } from './services.constants';

function saveSnippet(
  snippet: { snippetId: string; code: string },
  onSuccess: () => void,
  onError: (error: {
    success: boolean;
    error: { message: string; title: string };
  }) => void,
  onFinally: () => void
) {
  const path = BASE_URL + SNIPPETS;

  fetch(path, {
    method: 'POST',
    body: JSON.stringify(snippet),
  })
    .then((resp) => {
      if (!resp.ok) {
        return Promise.reject(resp);
      }
      return resp.json();
    })
    .then(({ success }) => {
      if (success) {
        onSuccess();
      }
    })
    .catch((err) => {
      err?.json()?.then(onError);
    })
    .finally(onFinally);
}

export function getSnippet(
  snippet: { snippetId: string },
  onSuccess: (data: { codeSnippet: string; version: number }) => void,
  onError: (error: {
    success: boolean;
    error: { message: string; title: string };
  }) => void,
  onFinally?: () => void
) {
  const { snippetId } = snippet;
  const path = BASE_URL + SNIPPETS;

  fetch(`${path}/?snippetId=${snippetId}`, {
    method: 'GET',
  })
    .then((resp) => {
      if (!resp.ok) {
        return Promise.reject(resp);
      }
      return resp.json();
    })
    .then(({ data, success }) => {
      if (success) {
        const { codeSnippet, version } = data;
        onSuccess({ codeSnippet, version });
      }
    })
    .catch((err) => {
      err?.json()?.then(onError);
    })
    .finally(onFinally);
}

export function shareSnippet(
  snippet: { snippetId: string },
  onSuccess: (data: { id: string }) => void,
  onError: (error: {
    success: boolean;
    error: { message: string; title: string };
  }) => void,
  onFinally?: () => void
) {
  const { snippetId } = snippet;
  const path = BASE_URL + SHARE_SNIPPET;

  fetch(`${path}/?snippetId=${snippetId}`, {
    method: 'GET',
  })
    .then((resp) => {
      if (!resp.ok) {
        return Promise.reject(resp);
      }
      return resp.json();
    })
    .then(({ data, success }) => {
      if (success) {
        const { id } = data;
        onSuccess({ id });
      }
    })
    .catch((err) => {
      err?.json()?.then(onError);
    })
    .finally(onFinally);
}

export function getSharedSnippet(
  code: { codeId: string },
  onSuccess: (data: { codeSnippet: string }) => void,
  onError: (error: {
    success: boolean;
    error: { message: string; title: string };
  }) => void,
  onFinally?: () => void
) {
  const { codeId } = code;
  const path = BASE_URL + SHARED_SNIPPET;

  fetch(`${path}/?codeId=${codeId}`, {
    method: 'GET',
  })
    .then((resp) => {
      if (!resp.ok) {
        return Promise.reject(resp);
      }
      return resp.json();
    })
    .then(({ data, success }) => {
      if (success) {
        const { codeSnippet } = data;
        onSuccess({ codeSnippet });
      }
    })
    .catch((err) => {
      err?.json()?.then(onError);
    })
    .finally(onFinally);
}

export default saveSnippet;
