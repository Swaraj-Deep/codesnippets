import { ERROR_CODES, ERROR_CODES_VS_MESSAGE } from '@/constants/errorCodes';
import { api } from '@/convex/generated/api';
import { fetchMutation } from 'convex/nextjs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const codeId = searchParams.get('codeId') || '';

  try {
    const snippet = await fetchMutation(api.snippets.fetchSharedSnippet, {
      data: { codeId },
    });
    return Response.json(
      {
        success: true,
        data: { codeSnippet: snippet?.codeSnippet },
      },
      { status: 200 }
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
    if (code === ERROR_CODES.ERR_009) {
      return Response.json(
        {
          success: false,
          error: { message: ERROR_CODES_VS_MESSAGE[ERROR_CODES.ERR_009] },
        },
        { status: 500 }
      );
    }
    if (code === ERROR_CODES.ERR_010) {
      return Response.json(
        {
          success: false,
          error: { message: ERROR_CODES_VS_MESSAGE[ERROR_CODES.ERR_010] },
        },
        { status: 500 }
      );
    }
  }
}
