import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import ResetPasswordMail from '~/emails/reset-password'
import { db } from './db'
import { account, session, user, verification } from './db/schema'
import { resend } from './resend'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: { user, session, account, verification },
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      // need to get and validate a custom domain for resend
      await resend.emails.send({
        from: 'admin@yukiyami.cc',
        to: user.email,
        subject: 'Reset your password',
        react: <ResetPasswordMail name={user.name} url={url} />,
      })
    },
  },
})
