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

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-muted rounded mb-8"></div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1>チケット一覧</h1>
        <Link
          href="/tickets/new"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          新規作成
        </Link>
      </div>

      {tickets.length === 0 ? (
        <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
          <p className="text-muted-foreground mb-4">チケットがまだありません</p>
          <Link
            href="/tickets/new"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            最初のチケットを作成
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Link key={ticket.id} href={`/tickets/${ticket.id}`}>
              <div className="rounded-lg border bg-card p-6 shadow-sm hover:bg-accent transition-colors cursor-pointer">
                <h3 className="font-semibold mb-2">{ticket.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {ticket.description}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                    {ticket.status}
                  </span>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                    {ticket.priority}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
