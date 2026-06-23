import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { ApiResponse } from '@/lib/types';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('session')?.value;

  if (!token) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: '認証が必要です' },
      { status: 401 }
    );
  }

  const user = await verifySession(token);

  if (!user) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'セッションが無効です' },
      { status: 401 }
    );
  }

  return NextResponse.json<ApiResponse>({
    success: true,
    data: user,
  });
}
