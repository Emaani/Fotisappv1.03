declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Add the id property
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
