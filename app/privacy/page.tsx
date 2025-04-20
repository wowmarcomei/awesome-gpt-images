'use client';

import { motion } from 'framer-motion';
import { useI18n } from '../../lib/i18n/context';

export default function PrivacyPage() {
  const { t, locale } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">
        {locale === 'zh' ? '隐私政策' : 'Privacy Policy'}
      </h1>

      <div className="prose dark:prose-invert max-w-none">
        {locale === 'zh' ? (
          <>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">信息收集和使用</h2>
              <p className="mb-4">
                我们收集的信息用于提供和改进服务。除非本隐私政策中另有说明，否则我们不会与任何人共享或出售您的信息。
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>账户信息：电子邮件地址和密码</li>
                <li>使用数据：浏览历史、搜索记录和交互数据</li>
                <li>设备信息：IP地址、浏览器类型和操作系统</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">数据安全</h2>
              <p className="mb-4">
                我们采用行业标准的安全措施保护您的个人信息，包括但不限于：
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>数据加密传输和存储</li>
                <li>定期安全审计</li>
                <li>访问控制和认证</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Cookie 使用</h2>
              <p className="mb-4">
                我们使用 Cookie 和类似技术来改善用户体验和提供个性化服务。您可以通过浏览器设置控制 Cookie 的使用。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">隐私政策更新</h2>
              <p className="mb-4">
                我们可能会不时更新本隐私政策。任何重大变更都会通过网站通知或电子邮件通知您。
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information Collection and Use</h2>
              <p className="mb-4">
                The information we collect is used to provide and improve our services. We will not share or sell your information with anyone except as described in this Privacy Policy.
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Account Information: Email address and password</li>
                <li>Usage Data: Browsing history, search records, and interaction data</li>
                <li>Device Information: IP address, browser type, and operating system</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security measures to protect your personal information, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Data encryption in transit and at rest</li>
                <li>Regular security audits</li>
                <li>Access control and authentication</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Use of Cookies</h2>
              <p className="mb-4">
                We use cookies and similar technologies to improve user experience and provide personalized services. You can control the use of cookies through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Privacy Policy Updates</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. Any significant changes will be notified through the website or email.
              </p>
            </section>
          </>
        )}
      </div>
    </motion.div>
  );
} 