import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
// Hack for TypeScript before 5.2
const Response = NextResponse;

import { verify } from 'jsonwebtoken';
import { ERROR_CODES, ERROR_CODES_VS_MESSAGE } from '@/constants/errorCodes';
import { AUTH_TOKEN } from '@/constants/localstorageAuthKeys';

export async function GET() {
  const jwtToken = cookies().get(AUTH_TOKEN)?.value || '';
  try {
    const { firstName } = verify(jwtToken, process.env.JWT_SECRET_KEY!) as {
      firstName: string;
    };
    return Response.json(
      {
        success: true,
        data: {
          user: {
            firstName,
          },
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: {
          message: ERROR_CODES_VS_MESSAGE[ERROR_CODES.ERR_006],
        },
      },
      { status: 401 }
    );
  }
}
