import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
// Hack for TypeScript before 5.2
const Response = NextResponse;

import { api } from '@/convex/generated/api';
import { fetchMutation } from 'convex/nextjs';

import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { EMIAL_REGEX } from '@/constants/common';
import { ERROR_CODES, ERROR_CODES_VS_MESSAGE } from '@/constants/errorCodes';
import { AUTH_TOKEN } from '@/constants/localstorageAuthKeys';

export async function POST(request: Request) {
  const payload = await request.json();
  const password = payload.password;
  const email = payload.email;
  const isValidEmail = email.match(EMIAL_REGEX);

  if (!isValidEmail) {
    return Response.json(
      {
        success: false,
        error: {
          message: 'Invalid Email',
        },
      },
      { status: 400 }
    );
  }

  try {
    const {
      password: hashedPassword,
      _id: userId,
      firstName,
    } = await fetchMutation(api.users.getUser, {
      data: { email },
    });

    const isPasswordEqual = await bcrypt.compare(password, hashedPassword);
    if (isPasswordEqual) {
      const token = sign({ userId, firstName }, process.env.JWT_SECRET_KEY!, {
        expiresIn: '24h',
        notBefore: '0',
        algorithm: 'HS256',
      });

      cookies().set(AUTH_TOKEN, token, { secure: true });

      return Response.json(
        {
          success: true,
          data: {
            token,
            user: {
              firstName,
            },
          },
        },
        { status: 200 }
      );
    }
    return Response.json(
      {
        success: false,
        error: { message: ERROR_CODES_VS_MESSAGE[ERROR_CODES.ERR_005] },
      },
      { status: 401 }
    );
  } catch (err: any) {
    const { code } = err.data;
    if (code === ERROR_CODES.ERR_004) {
      return Response.json(
        {
          success: false,
          error: { message: ERROR_CODES_VS_MESSAGE[ERROR_CODES.ERR_004] },
        },
        { status: 401 }
      );
    }
  }
}
