'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function LoginForm() {
  const { login } = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!email) { setErrors((p) => ({ ...p, email: 'Введіть електронну адресу' })); return; }
    if (!password) { setErrors((p) => ({ ...p, password: 'Введіть пароль' })); return; }

    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Вхід успішний');
      window.location.href = '/dashboard';
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Помилка входу');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input label="Електронна пошта" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="user@example.com" />
      <Input label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} placeholder="••••••••" />
      <Button type="submit" fullWidth isLoading={isLoading}>Увійти</Button>
      <p className="text-center text-sm text-slate-400">
        Немає акаунту?{' '}
        <Link href="/auth/register" className="text-indigo-400 hover:text-indigo-300 transition-colors">Зареєструватися</Link>
      </p>
    </form>
  );
}
