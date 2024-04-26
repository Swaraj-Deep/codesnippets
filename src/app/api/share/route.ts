import { ERROR_CODES, ERROR_CODES_VS_MESSAGE } from '@/constants/errorCodes';
import { api } from '@/convex/generated/api';
import { fetchMutation } from 'convex/nextjs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const snippetId = searchParams.get('snippetId') || '';

  try {
    const snippet = await fetchMutation(api.snippets.markSnippetShareable, {
      data: { snippetId },
    });
    if (snippet) {
      return Response.json(
        {
          success: true,
          data: { id: snippet.id },
        },
        { status: 200 }
      );
    }
    return Response.json(
      {
        success: false,
        error: { message: ERROR_CODES_VS_MESSAGE[ERROR_CODES.ERR_008] },
      },
      { status: 404 }
    );
  } catch (err: any) {
    const { code } = err.data;
    if (code === ERROR_CODES.ERR_007) {
      return Response.json(
        {
          success: false,
          error: { message: ERROR_CODES_VS_MESSAGE[ERROR_CODES.ERR_007] },
        },
        { status: 500 }
      );
    }
  }
}
