import { Html, Link, Text } from '@react-email/components'

export type ResetPasswordMailProps = {
  name: string
  url: string
}

export default function ResetPasswordMail({
  name = 'Eric',
  url = 'https://google.com',
}: ResetPasswordMailProps) {
  return (
    <Html>
      <Text>Hi {name}</Text>
      <Text>
        Click the link to reset your password: <Link href={url}>reset</Link>
      </Text>
    </Html>
  )
}
