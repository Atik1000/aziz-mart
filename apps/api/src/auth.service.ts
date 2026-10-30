import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomBytes } from 'crypto';

export type AdminRole = 'owner' | 'manager' | 'support';

export interface AdminUser {
  email: string;
  name: string;
  role: AdminRole;
}

interface SeedUser extends AdminUser {
  password: string;
}

/**
 * Demo credentials for the in-memory build — see the root README ("Admin access").
 * Production replaces this with hashed passwords in the database and real session
 * management; the token contract (Bearer) stays the same.
 */
const SEED_USERS: SeedUser[] = [
  { email: 'owner@azizmart.test', name: 'Aziz Rahman', role: 'owner', password: 'azizmart-owner' },
  { email: 'manager@azizmart.test', name: 'Shanta Akter', role: 'manager', password: 'azizmart-manager' },
  { email: 'support@azizmart.test', name: 'Rafi Islam', role: 'support', password: 'azizmart-support' },
];

const TOKEN_TTL_MS = 12 * 3600_000;

@Injectable()
export class AuthService {
  private sessions = new Map<string, { user: AdminUser; expires: number }>();

  login(email: string, password: string): { token: string; user: AdminUser } {
    const u = SEED_USERS.find((x) => x.email === (email ?? '').trim().toLowerCase());
    if (!u || u.password !== password) {
      throw new UnauthorizedException('Wrong email or password.');
    }
    const token = randomBytes(24).toString('hex');
    const user: AdminUser = { email: u.email, name: u.name, role: u.role };
    this.sessions.set(token, { user, expires: Date.now() + TOKEN_TTL_MS });
    return { token, user };
  }

  logout(token: string): void {
    this.sessions.delete(token);
  }

  resolve(token: string | undefined): AdminUser | null {
    if (!token) return null;
    const s = this.sessions.get(token);
    if (!s) return null;
    if (s.expires < Date.now()) {
      this.sessions.delete(token);
      return null;
    }
    return s.user;
  }
}
