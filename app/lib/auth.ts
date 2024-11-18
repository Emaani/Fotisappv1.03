import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function getUser() {
  const token = cookies().get('token')?.value;
  if (!token) return null;

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return verified.payload;
  } catch {
    return null;
  }
}
