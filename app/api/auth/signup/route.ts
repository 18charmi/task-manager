import { NextResponse } from 'next/server';
import { users } from '../../lib/userStore';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  users.push({ email, password });

  return NextResponse.json({ message: 'Signup successful' }, { status: 201 });
}
