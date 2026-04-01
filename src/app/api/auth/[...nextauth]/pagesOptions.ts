import { PagesOptions } from 'next-auth';

export const pagesOptions: Partial<PagesOptions> = {
  signIn: '/landing',   // unauthenticated / logout → landing page first
  error: '/auth/login', // auth errors still show the login form
};
