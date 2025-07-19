import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { validateToken } from '../../lib/helper';

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const userDetails = validateToken(token);
        return NextResponse.json({ message: 'Success', data: userDetails });
    } catch {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}
