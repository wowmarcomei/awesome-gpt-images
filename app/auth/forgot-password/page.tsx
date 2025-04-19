'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { useAuth } from '../../../lib/auth/context';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 实现重置密码逻辑
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader className="text-center">
          <CardTitle>重置密码</CardTitle>
          <CardDescription>
            {isSent 
              ? '重置密码链接已发送到您的邮箱'
              : '输入您的邮箱，我们将发送重置密码链接'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? '发送中...' : '发送重置链接'}
              </Button>
            </form>
          ) : (
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              请检查您的邮箱，点击邮件中的链接重置密码。
              如果没有收到邮件，请检查垃圾邮件文件夹。
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            href="/auth"
            className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
          >
            返回登录
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
} 