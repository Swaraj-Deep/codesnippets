import { NextResponse } from 'next/server';
// Hack for TypeScript before 5.2
const Response = NextResponse;
import { api } from '@/convex/generated/api';
import { fetchMutation } from 'convex/nextjs';
import { EMIAL_REGEX } from '@/constants/common';
import bcrypt from 'bcrypt';
import { ERROR_CODES, ERROR_CODES_VS_MESSAGE } from '@/constants/errorCodes';

export async function POST(request: Request) {
  const payload = await request.json();
  const confirmPassword = payload.confirmPassword;
  const password = payload.password;
  const email = payload.email;
  const isValidEmail = email.match(EMIAL_REGEX);

  if (!isValidEmail) {
    return Response.json(
      {
        success: false,
        error: {
          message: ERROR_CODES_VS_MESSAGE[ERROR_CODES.ERR_002],
        },
      },
      { status: 400 }
    );
  }

  if (confirmPassword !== password) {
    return Response.json(
      {
        success: false,
        error: { message: ERROR_CODES_VS_MESSAGE[ERROR_CODES.ERR_003] },
      },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const data = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    password: hashedPassword,
  };
  try {
    await fetchMutation(api.users.createUser, { data });
    return Response.json({ success: true }, { status: 200 });
  } catch (err: any) {
    if (err.data.code === ERROR_CODES.ERR_001) {
      return Response.json(
        {
          success: false,
          error: { message: ERROR_CODES_VS_MESSAGE[ERROR_CODES.ERR_001] },
        },
        { status: 400 }
      );
    }
  }
}
