import {
  Outlet,
  createFileRoute,
  redirect,
  useMatch,
  useMatchRoute,
} from '@tanstack/react-router'
import { css } from 'styled-system/css'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'

import { useMemo } from 'react'
// @ts-ignore
import miku from './miku.png?url'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (context.session) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const matchRoute = useMatchRoute()
  const isSignup = Boolean(matchRoute({ to: '/signup' }))
  const isResetPassword = Boolean(matchRoute({ to: '/reset-password' }))

  const title = useMemo(() => {
    if (isSignup) return 'Create an account'

    if (isResetPassword) return 'Reset password'

    return 'Sign in'
  }, [isSignup, isResetPassword])

  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'bg.default',
          borderRadius: 'xl',
          smDown: { height: '100%', borderRadius: 'none' },
          borderTopWidth: 'medium',
          borderTopStyle: 'groove',
          borderTopColor: 'colorPalette.text',
        })}
      >
        <div
          className={css({
            display: 'flex',
            columnGap: '24',
            padding: '9',
            flexWrap: 'wrap',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDir: 'column',
              gap: '4',
              width: '256px',
              smDown: {
                width: '100%',
                alignItems: 'center',
              },
            })}
          >
            <img src={miku} alt="Miku logo" className={css({ width: '20' })} />
            <Heading as="h1" size="4xl">
              {title}
            </Heading>
            <Text>to continue to the app</Text>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
