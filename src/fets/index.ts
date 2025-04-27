import { Response, createRouter } from 'fets'
import { auth } from '~/auth'

export const fetsRouter = createRouter({
  swaggerUI: {
    endpoint: '/api/fets/docs',
  },
  openAPI: {
    info: {
      title: 'FETS openapi',
      description: 'FETS openapi example',
      version: '1.0.0',
    },
  },
}).route({
  path: '/api/fets/hello',
  method: 'GET',
  schemas: {
    responses: {
      200: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
        required: ['message'],
        additionalProperties: false,
      },
    },
  },
  async handler(request) {
    const session = await auth.api.getSession({
      headers: request.headers as Headers,
    })

    console.log(session)

    return Response.json({
      message: 'Hello from feTS!',
    })
  },
})
