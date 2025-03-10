import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET; 

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = await getToken({ req, secret });
    console.log(pathname)

    if (pathname === '/signin' && token) {
        return NextResponse.redirect(new URL(`/dashboard`, req.url));
    }

    if (pathname === '/' && token) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (pathname === '/dashboard' && !token) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard', '/signin'],
};