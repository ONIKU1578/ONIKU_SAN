'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TicketsPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch('/api/tickets');
        const data = await res.json();

        if (data.success) {
          setTickets(data.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-muted text-muted-foreground';
      case 'open':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'in_progress':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'completed':
        return 'bg-green-500/10 text-green-700 border-green-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'high':
        return 'bg-orange-500/10 text-orange-700 border-orange-500/20';
      case 'medium':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/20">
        <div className="container py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-12 w-96 bg-muted rounded-xl"></div>
            <div className="space-y-4">
              <div className="card-premium h-32"></div>
              <div className="card-premium h-32"></div>
              <div className="card-premium h-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="mb-2">チケット一覧</h1>
            <p className="text-muted-foreground">
              すべての依頼を管理・追跡できます
            </p>
          </div>
          <Link href="/tickets/new" className="btn-primary">
            新規作成
          </Link>
        </div>

        {tickets.length === 0 ? (
          <div className="card-premium p-16 text-center">
            <div className="w-24 h-24 rounded-2xl bg-muted mx-auto mb-8 flex items-center justify-center">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="mb-4">チケットがまだありません</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              最初のチケットを作成して、バックオフィス業務の管理を始めましょう
            </p>
            <Link href="/tickets/new" className="btn-primary">
              最初のチケットを作成
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Link key={ticket.id} href={`/tickets/${ticket.id}`}>
                <div className="card-premium p-8 transition-smooth group">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="group-hover:text-accent transition-colors">{ticket.title}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${getStatusColor(ticket.status)}`}>
                        {ticket.status === 'draft' && '下書き'}
                        {ticket.status === 'open' && 'オープン'}
                        {ticket.status === 'in_progress' && '進行中'}
                        {ticket.status === 'completed' && '完了'}
                      </span>
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority === 'urgent' && '緊急'}
                        {ticket.priority === 'high' && '高'}
                        {ticket.priority === 'medium' && '中'}
                        {ticket.priority === 'low' && '低'}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                    {ticket.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link href="/dashboard" className="btn-secondary">
            ダッシュボードに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
