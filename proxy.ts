import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedTeacherRoutes = ['/enseignant'];
const protectedStudentRoutes = ['/dashboard'];

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // Protection enseignant
  if (protectedTeacherRoutes.some((route) => pathname.startsWith(route))) {
    if (!token || token.role !== 'teacher') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protection élève
  if (protectedStudentRoutes.some((route) => pathname.startsWith(route))) {
    if (!token || token.role !== 'student') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}
