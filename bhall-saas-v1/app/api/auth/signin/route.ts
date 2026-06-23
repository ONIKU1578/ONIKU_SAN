import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/lib/auth';
import { ApiResponse } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'メールアドレスとパスワードを入力してください' },
        { status: 400 }
      );
    }

    const result = await signIn(email, password);

    if (!result.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: result.error },
        { status: 401 }
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
      maxAge: 60 * 60 * 24 * 7, // 7日間
    });

    return response;
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || '認証エラー' },
      { status: 400 }
    );
  }
}
