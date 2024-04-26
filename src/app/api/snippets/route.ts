import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
// Hack for TypeScript before 5.2
const Response = NextResponse;

import { AUTH_TOKEN } from '@/constants/localstorageAuthKeys';
import { fetchMutation } from 'convex/nextjs';
import { api } from '@/convex/generated/api';
import { ERROR_CODES, ERROR_CODES_VS_MESSAGE } from '@/constants/errorCodes';
import { verify } from 'jsonwebtoken';

export async function POST(request: Request) {
  const payload = await request.json();
  const code = payload.code;
  const snippetId = payload.snippetId;
  const jwtToken = cookies().get(AUTH_TOKEN)?.value || 'userId';

  try {
    const { userId } = verify(jwtToken, process.env.JWT_SECRET_KEY!) as {
      userId: string;
    };
    await fetchMutation(api.code.createCode, {
      data: { snippetId, code },
    });
    await fetchMutation(api.snippets.createSnippet, {
      data: { snippetId, userId },
    });
    return Response.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (err: any) {
    if (err.name === 'JsonWebTokenError') {
      return Response.json(
        {
          success: false,
          error: { message: ERROR_CODES_VS_MESSAGE[ERROR_CODES.ERR_006] },
        },
        { status: 401 }
      );
    }
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const snippetId = searchParams.get('snippetId') || '';
  const jwtToken = cookies().get(AUTH_TOKEN)?.value || 'userId';

  try {
    const { userId } = verify(jwtToken, process.env.JWT_SECRET_KEY!) as {
      userId: string;
    };
    const { codeSnippet, version } = await fetchMutation(
      api.snippets.fetchSnippet,
      {
        data: { snippetId, userId },
      }
    );
    return Response.json(
      {
        success: true,
        data: { codeSnippet, version },
      },
      { status: 200 }
    );
  } catch (err: any) {
    if (err.name === 'JsonWebTokenError') {
      return Response.json(
        {
          success: false,
          error: { message: ERROR_CODES_VS_MESSAGE[ERROR_CODES.ERR_006] },
        },
        { status: 401 }
      );
    }
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
