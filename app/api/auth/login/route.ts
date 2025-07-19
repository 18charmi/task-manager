import { NextResponse } from 'next/server';
import { users } from '../../lib/userStore';
import { generateToken } from '../../lib/helper';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = generateToken({ email })
  const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60,
  });

  return response;
}
