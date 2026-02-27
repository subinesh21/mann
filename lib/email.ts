import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email transporter configuration error:', error);
  } else {
    console.log('Email transporter is ready');
  }
});

export async function sendEmail(options: EmailOptions) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@yourapp.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateOTPHTML(otp: string, purpose: 'registration' | 'reset-password'): string {
  const title = purpose === 'registration' ? 'Account Verification' : 'Password Reset';
  const message = purpose === 'registration' 
    ? 'Thank you for registering! Please use the following OTP to verify your account:'
    : 'You have requested to reset your password. Please use the following OTP to proceed:';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background-color: #52dd28ff; padding: 30px 20px; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 24px;">${title}</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 30px 20px;">
                  <p style="font-size: 16px; color: #333; margin: 0 0 20px 0;">Hello,</p>
                  
                  <p style="font-size: 16px; color: #666; margin: 0 0 30px 0; line-height: 1.5;">
                    ${message}
                  </p>
                  
                  <!-- OTP Box -->
                  <div style="background-color: #f8f9fa; border: 2px dashed #52dd28ff; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                    <p style="font-size: 14px; color: #666; margin: 0 0 10px 0;">Your OTP Code:</p>
                    <h2 style="font-size: 32px; color: #52dd28ff; margin: 0; letter-spacing: 5px; font-weight: bold;">${otp}</h2>
                    <p style="font-size: 12px; color: #999; margin: 10px 0 0 0;">This code expires in 10 minutes</p>
                  </div>
                  
                  <p style="font-size: 14px; color: #666; margin: 30px 0 0 0; line-height: 1.5;">
                    If you didn't request this ${purpose === 'registration' ? 'registration' : 'password reset'}, please ignore this email.
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
                  <p style="font-size: 12px; color: #999; margin: 0;">
                    &copy; 2026 Your Company. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}