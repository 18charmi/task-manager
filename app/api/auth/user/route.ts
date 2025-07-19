import { NextRequest, NextResponse } from 'next/server';
import { users } from '../../lib/userStore';
import { generateToken, validateToken } from '../../lib/helper';
import { User } from '@/types/user';

export async function POST(req: NextRequest) {
    const { action, username, password } = await req.json();

    if (action === 'signup') {
        if (users.find(u => u.username === username)) {
            return NextResponse.json({ message: 'User already exists' }, { status: 409 });
        }
        users.push({ username, password });
        return NextResponse.json({ message: 'Signup successful' }, { status: 201 });
    }

    if (action === 'login') {
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = generateToken({ username });
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

    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
}

export async function DELETE() {
    const response = NextResponse.json({ message: 'Logged out' }, { status: 200 });
    response.cookies.set('token', '', {
        httpOnly: true,
        path: '/',
        expires: new Date(0),
    });
    return response;
}

export async function GET(request: NextRequest) {
    const token = request.cookies.get('token')?.value || '';
    if (!token) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }
    const userData = validateToken(token) as User;
    if (!userData?.username) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const user = users.find(u => u.username === userData.username);
    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Don't send password or sensitive data
    const { password, ...safeUser } = user;
    return NextResponse.json({ user: safeUser }, { status: 200 });
}
