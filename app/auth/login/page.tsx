'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useAuth } from '../../../lib/auth/context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(true);
      await signIn(provider);
    } catch (error) {
      console.error('登录失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="mb-8 flex flex-col items-center">
        <Link href="/" className="flex items-center gap-2 mb-4">
          <Image
            src="/favicon/ms-icon-310x310.png"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-lg"
          />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            Awesome GPT-4 Images
          </span>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          欢迎回来
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
          登录您的账号继续访问
        </p>
      </div>

      <Card className="w-full max-w-[400px] border-0 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="w-full h-11 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FaGoogle className="mr-2 h-5 w-5 text-red-500" />
              <span className="text-base">使用 Google 账号登录</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('github')}
              disabled={isLoading}
              className="w-full h-11 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FaGithub className="mr-2 h-5 w-5" />
              <span className="text-base">使用 GitHub 账号登录</span>
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  或者使用邮箱登录
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </div>
              <Button className="w-full h-11 text-base">
                登录
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pb-6 pt-2">
          <div className="flex items-center justify-between w-full text-sm">
            <Link
              href="/auth/register"
              className="text-primary hover:text-primary/90 font-medium"
            >
              注册新账号
            </Link>
            <Link
              href="/auth/forgot-password"
              className="text-primary hover:text-primary/90 font-medium"
            >
              忘记密码？
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 