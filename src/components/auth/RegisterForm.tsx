'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function RegisterForm() {
  const { register } = useAuth();
  const toast = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Введіть ім\'я';
    if (!email.trim()) errs.email = 'Введіть електронну адресу';
    if (password.length < 6) errs.password = 'Пароль мінімум 6 символів';
    if (password !== confirmPassword) errs.confirmPassword = 'Паролі не збігаються';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await register(email, name, password);
      toast.success('Реєстрація успішна');
      window.location.href = '/dashboard';
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Помилка реєстрації');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input label="Ім'я" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} placeholder="Іван Петренко" />
      <Input label="Електронна пошта" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="user@example.com" />
      <Input label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} placeholder="••••••••" />
      <Input label="Підтвердження пароля" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={errors.confirmPassword} placeholder="••••••••" />
      <Button type="submit" fullWidth isLoading={isLoading}>Зареєструватися</Button>
      <p className="text-center text-sm text-slate-400">
        Вже маєте акаунт?{' '}
        <Link href="/auth/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">Увійти</Link>
      </p>
    </form>
  );
}
