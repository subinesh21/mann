// Mobile OTP Utility Functions

export function generateOTP(length: number = 6): string {
  return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
}

export async function sendMobileOTP(mobile: string, otp: string): Promise<void> {
  // Mock SMS sending - replace with actual SMS service (Twilio, AWS SNS, etc.)
  console.log(`📱 SMS OTP ${otp} sent to ${mobile}`);
  
  // For production, integrate with SMS service provider:
  /*
  // Example with Twilio:
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  
  await client.messages.create({
    body: `Your CGG EHA verification code is: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: mobile
  });
  */
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
}