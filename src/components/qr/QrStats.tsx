'use client';

import { useEffect, useState } from 'react';
import { StatsResponse, QrContentType } from '@/types';
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import { getContentTypeLabel } from '@/lib/qr-generator';

export default function QrStats() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/qr/stats');
        const result = await res.json();
        if (result.success) setStats(result.data);
      } catch (err) {
        console.error('Stats fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (isLoading) return <div className="flex justify-center py-8"><Spinner /></div>;
  if (!stats) return null;

  const items = [
    { label: 'Всього QR-кодів', value: stats.totalCodes, gradient: 'from-indigo-500 to-purple-500' },
    { label: 'В обраному', value: stats.favoriteCount, gradient: 'from-amber-500 to-orange-500' },
    { label: 'Теги', value: stats.tagCount, gradient: 'from-emerald-500 to-teal-500' },
    { label: 'Папки', value: stats.folderCount, gradient: 'from-blue-500 to-cyan-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient} text-white shadow-lg`}>
                <span className="text-lg font-bold">{s.value}</span>
              </div>
              <p className="text-xs text-slate-400">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {Object.keys(stats.byContentType).length > 0 && (
        <Card>
          <CardHeader><h3 className="text-sm font-medium text-slate-300">За типом вмісту</h3></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.byContentType).map(([type, count]) => {
                const pct = stats.totalCodes > 0 ? Math.round((count / stats.totalCodes) * 100) : 0;
                return (
                  <div key={type} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">{getContentTypeLabel(type as QrContentType)}</span>
                      <span className="text-slate-300 font-medium">{count} ({pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-700/50 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
