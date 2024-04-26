import { CODE } from '@/constants/localstorage';

export function getLocalSavedSnippet(snippetId: string) {
  const savedValue =
    typeof window !== 'undefined' ? localStorage.getItem(CODE) : '';

  const [savedSnippetId, _, savedCode] = savedValue?.split('|') || [];
  return savedSnippetId === snippetId ? savedCode : undefined;
}

export function getLocalSavedVersionNumber(snippetId: string) {
  const savedValue =
    typeof window !== 'undefined' ? localStorage.getItem(CODE) : '';

  const [savedSnippetId, versionNumber] = savedValue?.split('|') || [];
  return savedSnippetId === snippetId ? Number(versionNumber) : -1;
}

export function getCodeSnippetToDisplay(
  snippetId: string,
  dbSavedSnippet: { codeSnippet: string; version: number }
) {
  const localVersion = Number(getLocalSavedVersionNumber(snippetId));
  const { version } = dbSavedSnippet;

  if (version > localVersion) {
    return dbSavedSnippet.codeSnippet;
  }
  return getLocalSavedSnippet(snippetId);
}
