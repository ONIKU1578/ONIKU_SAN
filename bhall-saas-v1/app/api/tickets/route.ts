import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { db } from '@/lib/db';
import { isBacklly, isAdmin } from '@/lib/rbac';
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

  // 運営・管理者は全チケット、顧客は自社チケットのみ
  let tickets;
  if (isBacklly(user) || isAdmin(user)) {
    tickets = db.getAllTickets();
  } else if (user.companyId) {
    tickets = db.getTicketsByCompanyId(user.companyId);
  } else {
    tickets = [];
  }

  return NextResponse.json<ApiResponse>({ success: true, data: tickets });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('session')?.value;
  if (!token) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: '認証が必要です' },
      { status: 401 }
    );
  }

  const user = await verifySession(token);
  if (!user || !user.companyId) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: '会社情報が必要です' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();

    const ticket = db.createTicket({
      companyId: user.companyId,
      title: body.title,
      description: body.description,
      status: 'draft',
      priority: body.priority || 'medium',
      assignedTo: null,
      createdBy: user.id,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      attachments: [],
    });

    // 監査ログ
    db.createAuditLog({
      userId: user.id,
      companyId: user.companyId,
      action: 'ticket_create',
      resource: 'ticket',
      resourceId: ticket.id,
      details: { title: ticket.title },
    });

    return NextResponse.json<ApiResponse>({ success: true, data: ticket });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
