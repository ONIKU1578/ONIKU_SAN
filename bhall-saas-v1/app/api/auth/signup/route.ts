import { NextRequest, NextResponse } from 'next/server';
import { signUp } from '@/lib/auth';
import { ApiResponse } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, companyName } = body;

    if (!email || !password || !name || !companyName) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'すべての項目を入力してください' },
        { status: 400 }
      );
    }

    const result = await signUp(email, password, name, companyName);

    if (!result.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    const response = NextResponse.json<ApiResponse>({
      success: true,
      data: { user: result.user },
    });

    // セッションクッキー設定
    response.cookies.set('session', result.token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || '登録エラー' },
      { status: 400 }
    );
  }
}
