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
import { FaGoogle, FaGithub } from 'react-icons/fa6';
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
  
  const { signInWithEmail, signInWithGitHub, signInWithGoogle } = useAuth();
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

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          {/* 标题 */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">欢迎回来</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">选择登录方式继续</p>
          </div>

          {/* 登录/注册标签页 */}
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="w-full grid grid-cols-2 gap-4 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-xl h-12">
              <TabsTrigger 
                value="login"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm transition-all"
              >
                登录
              </TabsTrigger>
              <TabsTrigger 
                value="register"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm transition-all"
              >
                注册
              </TabsTrigger>
            </TabsList>

            {/* 登录表单 */}
            <TabsContent value="login" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">密码</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="h-11"
                  />
                </div>
                <Button 
                  className="w-full h-11 text-base"
                  onClick={handleLogin}
                >
                  {isLoading ? '登录中...' : '登录'}
                </Button>
              </div>
            </TabsContent>

            {/* 注册表单 */}
            <TabsContent value="register" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">邮箱</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="name@example.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">密码</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">确认密码</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11"
                  />
                </div>
                <Button 
                  className="w-full h-11 text-base"
                  onClick={handleRegister}
                >
                  {isLoading ? '注册中...' : '注册'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* 分隔线 */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                或使用以下方式登录
              </span>
            </div>
          </div>

          {/* 社交登录按钮 */}
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-11"
              onClick={() => signInWithGoogle()}
            >
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button 
              variant="outline"
              className="h-11"
              onClick={() => signInWithGitHub()}
            >
              <FaGithub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>

          {/* 服务条款 */}
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            点击登录或注册即表示同意
            <Link href="/terms" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              服务条款
            </Link>
            和
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              隐私政策
            </Link>
            。
          </p>
        </div>
      </div>
    </div>
  );
} 