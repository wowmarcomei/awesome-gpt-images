import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;

  try {
    const data = await resend.emails.send({
      from: 'Awesome GPT Images Prompt <noreply@awesome-gpt-images.com>',
      to: email,
      subject: '验证您的邮箱地址',
      html: `
        <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; color: #374151; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #111827; font-size: 24px; font-weight: 600; margin-bottom: 16px;">
            验证您的邮箱地址
          </h1>
          
          <p style="margin-bottom: 24px; font-size: 16px; line-height: 24px;">
            感谢您注册 Awesome GPT Images Prompt！请点击下面的按钮验证您的邮箱地址：
          </p>
          
          <div style="margin-bottom: 24px;">
            <a href="${confirmLink}"
               style="display: inline-block; background-color: #2563eb; color: white; font-weight: 500; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              验证邮箱地址
            </a>
          </div>
          
          <p style="margin-bottom: 24px; font-size: 16px; line-height: 24px;">
            或者复制以下链接到浏览器地址栏：
          </p>
          
          <p style="margin-bottom: 24px; font-size: 14px; line-height: 20px; color: #6b7280; word-break: break-all;">
            ${confirmLink}
          </p>
          
          <p style="margin-bottom: 12px; font-size: 14px; line-height: 20px; color: #6b7280;">
            如果这不是您的操作，请忽略此邮件。
          </p>
          
          <hr style="margin: 24px 0; border: 0; border-top: 1px solid #e5e7eb;" />
          
          <p style="font-size: 14px; line-height: 20px; color: #6b7280;">
            此邮件由系统自动发送，请勿回复。
          </p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error('发送验证邮件失败:', error);
    return { success: false, error };
  }
} 