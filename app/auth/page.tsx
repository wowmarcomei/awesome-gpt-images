'use client';

import { useState, useEffect, Suspense } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuth } from '../../lib/auth/context';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaGoogle, FaGithub, FaXTwitter } from 'react-icons/fa6';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';
import { useI18n } from '../../lib/i18n/context';

// 使用 Suspense 边界包裹的 SearchParams 组件
function SearchParamsHandler() {
  const searchParams = useSearchParams();
  const { t } = useI18n();
  
  // 处理URL参数中的状态
  useEffect(() => {
    const error = searchParams.get('error');
    const verified = searchParams.get('verified');

    if (error === 'missing_token') {
      toast.error(t('auth.error.invalid_token'));
    } else if (error === 'verification_failed') {
      toast.error(t('auth.error.verification_failed'));
    }

    if (verified === 'true') {
      toast.success(t('auth.success.email_verified'));
    }
  }, [searchParams, t]);
  
  return null;
}

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
  
  const { signInWithEmail, signInWithGitHub, signInWithGoogle, signInWithTwitter } = useAuth();
  const router = useRouter();
  const { t } = useI18n();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error(t('auth.error.required_fields'));
      return;
    }

    try {
      setIsLoading(true);
      await signInWithEmail(loginEmail, loginPassword);
      toast.success(t('auth.success.login'));
      router.push('/');
    } catch (error) {
      console.error('登录失败:', error);
      toast.error(t('auth.error.login_failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerEmail || !registerPassword || !confirmPassword) {
      toast.error(t('auth.error.required_fields'));
      return;
    }

    if (registerPassword.length < 6) {
      toast.error(t('auth.error.password_length'));
      return;
    }

    if (registerPassword !== confirmPassword) {
      toast.error(t('auth.error.password_mismatch'));
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
        throw new Error(data.error || t('auth.error.register_failed'));
      }

      setIsEmailSent(true);
      toast.success(t('auth.success.register'));
    } catch (error) {
      console.error('注册失败:', error);
      toast.error(error instanceof Error ? error.message : t('auth.error.register_failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gray-50/50 dark:bg-gray-900/50">
      <Suspense fallback={null}>
        <SearchParamsHandler />
      </Suspense>
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          {/* 标题 */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('auth.welcome_back')}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('auth.choose_method')}</p>
          </div>

          {/* 登录/注册标签页 */}
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="w-full grid grid-cols-2 gap-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl h-12">
              <TabsTrigger 
                value="login"
                className={cn(
                  "rounded-lg transition-all",
                  "data-[state=active]:bg-white data-[state=active]:shadow-sm",
                  "dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:text-white",
                  "dark:text-gray-300 dark:hover:text-white"
                )}
              >
                {t('auth.login')}
              </TabsTrigger>
              <TabsTrigger 
                value="register"
                className={cn(
                  "rounded-lg transition-all",
                  "data-[state=active]:bg-white data-[state=active]:shadow-sm",
                  "dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:text-white",
                  "dark:text-gray-300 dark:hover:text-white"
                )}
              >
                {t('auth.register')}
              </TabsTrigger>
            </TabsList>

            {/* 登录表单 */}
            <TabsContent value="login" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">{t('auth.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('auth.email_placeholder')}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={cn(
                      "h-11",
                      "bg-white dark:bg-gray-800",
                      "border-gray-200 dark:border-gray-700",
                      "focus:border-blue-500 dark:focus:border-blue-400",
                      "text-gray-900 dark:text-gray-100",
                      "placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-200">{t('auth.password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t('auth.password_placeholder')}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={cn(
                      "h-11",
                      "bg-white dark:bg-gray-800",
                      "border-gray-200 dark:border-gray-700",
                      "focus:border-blue-500 dark:focus:border-blue-400",
                      "text-gray-900 dark:text-gray-100",
                      "placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    )}
                  />
                </div>
                <Button 
                  className={cn(
                    "w-full h-11 text-base",
                    "bg-blue-500 hover:bg-blue-600 text-white",
                    "dark:bg-blue-600 dark:hover:bg-blue-700",
                    "transition-colors"
                  )}
                  onClick={handleLogin}
                >
                  {isLoading ? t('auth.logging_in') : t('auth.login')}
                </Button>
              </div>
            </TabsContent>

            {/* 注册表单 */}
            <TabsContent value="register" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-gray-700 dark:text-gray-200">{t('auth.email')}</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder={t('auth.email_placeholder')}
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className={cn(
                      "h-11",
                      "bg-white dark:bg-gray-800",
                      "border-gray-200 dark:border-gray-700",
                      "focus:border-blue-500 dark:focus:border-blue-400",
                      "text-gray-900 dark:text-gray-100",
                      "placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-gray-700 dark:text-gray-200">{t('auth.password')}</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder={t('auth.password_placeholder')}
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className={cn(
                      "h-11",
                      "bg-white dark:bg-gray-800",
                      "border-gray-200 dark:border-gray-700",
                      "focus:border-blue-500 dark:focus:border-blue-400",
                      "text-gray-900 dark:text-gray-100",
                      "placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-gray-700 dark:text-gray-200">{t('auth.confirm_password')}</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder={t('auth.confirm_password_placeholder')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={cn(
                      "h-11",
                      "bg-white dark:bg-gray-800",
                      "border-gray-200 dark:border-gray-700",
                      "focus:border-blue-500 dark:focus:border-blue-400",
                      "text-gray-900 dark:text-gray-100",
                      "placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    )}
                  />
                </div>
                <Button 
                  className={cn(
                    "w-full h-11 text-base",
                    "bg-blue-500 hover:bg-blue-600 text-white",
                    "dark:bg-blue-600 dark:hover:bg-blue-700",
                    "transition-colors"
                  )}
                  onClick={handleRegister}
                >
                  {isLoading ? t('auth.registering') : t('auth.register')}
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
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                {t('auth.or_continue_with')}
              </span>
            </div>
          </div>

          {/* 社交登录按钮 */}
          <div className="grid grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className={cn(
                "h-11",
                "bg-white dark:bg-gray-800",
                "hover:bg-gray-50 dark:hover:bg-gray-700",
                "text-gray-900 dark:text-gray-100",
                "border-gray-200 dark:border-gray-600",
                "hover:border-gray-300 dark:hover:border-gray-500"
              )}
              onClick={() => signInWithGoogle()}
            >
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button 
              variant="outline"
              className={cn(
                "h-11",
                "bg-white dark:bg-gray-800",
                "hover:bg-gray-50 dark:hover:bg-gray-700",
                "text-gray-900 dark:text-gray-100",
                "border-gray-200 dark:border-gray-600",
                "hover:border-gray-300 dark:hover:border-gray-500"
              )}
              onClick={() => signInWithTwitter()}
            >
              <FaXTwitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
            <Button 
              variant="outline" 
              className={cn(
                "h-11",
                "bg-white dark:bg-gray-800",
                "hover:bg-gray-50 dark:hover:bg-gray-700",
                "text-gray-900 dark:text-gray-100",
                "border-gray-200 dark:border-gray-600",
                "hover:border-gray-300 dark:hover:border-gray-500"
              )}
              onClick={() => signInWithGitHub()}
            >
              <FaGithub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>

          {/* 服务条款 */}
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            {t('auth.terms_prefix')}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              {t('auth.terms_of_service')}
            </Link>
            {t('auth.terms_and')}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              {t('auth.privacy_policy')}
            </Link>
            {t('auth.terms_suffix')}
          </p>
        </div>
      </div>
    </div>
  );
} 