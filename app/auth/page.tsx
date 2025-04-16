'use client';

import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuth } from '../../lib/auth/context';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { toast } from 'sonner';

export default function AuthPage() {
  // 登录状态
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // 注册状态
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // 加载状态
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  
  const { signIn, signInWithEmail } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 处理URL参数中的状态
  useEffect(() => {
    const error = searchParams.get('error');
    const verified = searchParams.get('verified');

    if (error === 'missing_token') {
      toast.error('验证链接无效');
    } else if (error === 'verification_failed') {
      toast.error('邮箱验证失败，请重试');
    }

    if (verified === 'true') {
      toast.success('邮箱验证成功，请登录');
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error('请填写邮箱和密码');
      return;
    }

    try {
      setIsLoading(true);
      await signInWithEmail(loginEmail, loginPassword);
      toast.success('登录成功');
      router.push('/');
    } catch (error) {
      console.error('登录失败:', error);
      toast.error('登录失败，请检查邮箱和密码');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    if (!registerEmail || !registerPassword || !confirmPassword) {
      toast.error('请填写所有必填项');
      return;
    }

    if (registerPassword.length < 6) {
      toast.error('密码长度至少为6位');
      return;
    }

    if (registerPassword !== confirmPassword) {
      toast.error('两次输入的密码不一致');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '注册失败，请稍后重试');
      }

      // 注册成功，显示验证邮件提示
      setIsEmailSent(true);
      toast.success('注册成功，请查收验证邮件');
    } catch (error) {
      console.error('注册失败:', error);
      toast.error(error instanceof Error ? error.message : '注册失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(true);
      await signIn(provider);
    } catch (error) {
      console.error(`${provider}登录失败:`, error);
      toast.error(`${provider === 'google' ? 'Google' : 'GitHub'}登录失败，请重试`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          Awesome GPT Images
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "这个网站帮助我找到了很多优秀的 AI 图片生成案例，对我的工作帮助很大。"
            </p>
            <footer className="text-sm">某设计师</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              欢迎回来
            </h1>
            <p className="text-sm text-muted-foreground">
              选择登录方式继续
            </p>
          </div>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">登录</TabsTrigger>
              <TabsTrigger value="register">注册</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card>
                <div className="p-6 space-y-4">
                  <div className="grid gap-2">
                    <div className="grid gap-1">
                      <Label htmlFor="email">邮箱</Label>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="password">密码</Label>
                      <Input
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        autoComplete="current-password"
                        disabled={isLoading}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                    <Button disabled={isLoading} onClick={handleLogin}>
                      {isLoading ? '登录中...' : '登录'}
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        或使用以下方式登录
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      disabled={isLoading}
                      onClick={() => handleSocialLogin('google')}
                    >
                      <FaGoogle className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      disabled={isLoading}
                      onClick={() => handleSocialLogin('github')}
                    >
                      <FaGithub className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="register">
              <Card>
                <div className="p-6 space-y-4">
                  <div className="grid gap-2">
                    <div className="grid gap-1">
                      <Label htmlFor="register-email">邮箱</Label>
                      <Input
                        id="register-email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="register-password">密码</Label>
                      <Input
                        id="register-password"
                        placeholder="••••••••"
                        type="password"
                        autoComplete="new-password"
                        disabled={isLoading}
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="confirm-password">确认密码</Label>
                      <Input
                        id="confirm-password"
                        placeholder="••••••••"
                        type="password"
                        autoComplete="new-password"
                        disabled={isLoading}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <Button disabled={isLoading} onClick={handleRegister}>
                      {isLoading ? '注册中...' : '注册'}
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        或使用以下方式注册
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      disabled={isLoading}
                      onClick={() => handleSocialLogin('google')}
                    >
                      <FaGoogle className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      disabled={isLoading}
                      onClick={() => handleSocialLogin('github')}
                    >
                      <FaGithub className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
          <p className="px-8 text-center text-sm text-muted-foreground">
            点击登录或注册即表示您同意我们的{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              服务条款
            </Link>{' '}
            和{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              隐私政策
            </Link>
            。
          </p>
        </div>
      </div>
    </div>
  );
} 