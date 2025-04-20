'use client';

import { motion } from 'framer-motion';
import { useI18n } from '../../lib/i18n/context';

export default function TermsPage() {
  const { t, locale } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">
        {locale === 'zh' ? '服务条款' : 'Terms of Service'}
      </h1>

      <div className="prose dark:prose-invert max-w-none">
        {locale === 'zh' ? (
          <>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">服务使用条款</h2>
              <p className="mb-4">
                欢迎使用我们的服务。使用我们的服务即表示您同意遵守以下条款和条件。
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>您必须遵守所有适用的法律和法规</li>
                <li>您不得滥用或干扰我们的服务</li>
                <li>您需要对您的账户安全负责</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">用户责任</h2>
              <p className="mb-4">
                作为用户，您需要：
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>提供准确的注册信息</li>
                <li>保护您的账户密码</li>
                <li>对您账户下的所有活动负责</li>
                <li>遵守知识产权和其他相关法律</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">内容规范</h2>
              <p className="mb-4">
                用户生成的内容必须：
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>遵守法律法规</li>
                <li>尊重他人的知识产权</li>
                <li>不包含有害、欺诈或违法内容</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">服务变更</h2>
              <p className="mb-4">
                我们保留随时修改或终止服务的权利。重大变更将提前通知用户。
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Terms of Use</h2>
              <p className="mb-4">
                Welcome to our service. By using our service, you agree to comply with the following terms and conditions.
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>You must comply with all applicable laws and regulations</li>
                <li>You must not abuse or interfere with our services</li>
                <li>You are responsible for your account security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
              <p className="mb-4">
                As a user, you are required to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate registration information</li>
                <li>Protect your account password</li>
                <li>Be responsible for all activities under your account</li>
                <li>Comply with intellectual property and other relevant laws</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Content Guidelines</h2>
              <p className="mb-4">
                User-generated content must:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Comply with laws and regulations</li>
                <li>Respect intellectual property rights</li>
                <li>Not contain harmful, fraudulent, or illegal content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Service Changes</h2>
              <p className="mb-4">
                We reserve the right to modify or terminate the service at any time. Users will be notified of significant changes in advance.
              </p>
            </section>
          </>
        )}
      </div>
    </motion.div>
  );
} 