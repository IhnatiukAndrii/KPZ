'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import Dropdown, { DropdownItem } from '@/components/ui/Dropdown';
import { getInitials } from '@/lib/utils';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Генератор' },
    { href: '/dashboard', label: 'Мої QR-коди' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
              QR Generator
            </span>
          </Link>

          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    rounded-lg px-3 py-2 text-sm font-medium transition-colors
                    ${pathname === link.href
                      ? 'bg-slate-700/50 text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <Dropdown
              trigger={
                <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-slate-700/50 transition-colors">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white">
                    {getInitials(user.name)}
                  </div>
                  <span className="hidden sm:block text-sm text-slate-300">{user.name}</span>
                  <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              }
            >
              <div className="px-4 py-2 border-b border-slate-700">
                <p className="text-sm font-medium text-slate-200">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              <DropdownItem onClick={logout} danger>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Вийти
              </DropdownItem>
            </Dropdown>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">Увійти</Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Реєстрація</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
