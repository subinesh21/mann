import { getIronSession, SessionOptions } from 'iron-session';

export interface SessionData {
  userId?: string;
  email?: string;
  isLoggedIn: boolean;
}

const defaultOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long',
  cookieName: 'cgg-eha-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: 'lax' as const,
  },
};

export function getSessionOptions(): SessionOptions {
  return {
    ...defaultOptions,
    password: process.env.SESSION_SECRET || defaultOptions.password,
  };
}

export async function getSession(req: Request, res: Response) {
  // iron-session expects Node req/res; cast for Next.js compatibility
  return getIronSession<SessionData>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res as any,
    getSessionOptions()
  );
}
