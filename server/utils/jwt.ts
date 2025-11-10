// /server/utils/jwt.ts
import { getCookie, setCookie, deleteCookie, type H3Event } from 'h3';
// IMPORTANTe: importar como default (CJS interop)
import jwt from 'jsonwebtoken';

const JWT_COOKIE = 'token';

// Tipos desde el namespace del default import
type SignOptions = jwt.SignOptions;
type JwtPayload = jwt.JwtPayload;
type Secret = jwt.Secret;

export const getJwtSecret = (): Secret => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET no configurado');
  return secret as Secret; // jsonwebtoken acepta string | Buffer | KeyObject
};

export const signJwt = (payload: Record<string, unknown>): string => {
  const options: SignOptions = {
    // acepta '7d', '1h' o número (segundos)
    expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn']
  };
  return jwt.sign(payload, getJwtSecret(), options);
};

type AuthPayload = JwtPayload & { id: number; email: string };

export const verifyJwtFromCookie = (event: H3Event): AuthPayload | null => {
  const token = getCookie(event, JWT_COOKIE);
  if (!token) return null;
  try {
    return jwt.verify(token, getJwtSecret()) as AuthPayload;
  } catch {
    return null;
  }
};

export const setJwtCookie = (event: H3Event, token: string) => {
  setCookie(event, JWT_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production', // en dev no requiere HTTPS
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 días
  });
};

export const clearJwtCookie = (event: H3Event) => {
  deleteCookie(event, JWT_COOKIE, { path: '/' });
};


