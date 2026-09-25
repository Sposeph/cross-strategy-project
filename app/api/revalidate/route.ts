import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookBody = {
  _type: string
  slug?: { current: string }
}

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<WebhookBody>(
      req,
      process.env.SANITY_WEBHOOK_SECRET
    )

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new Response('Bad request', { status: 400 })
    }

    switch (body._type) {
      case 'homePage':
        revalidatePath('/')
        break
      case 'aboutPage':
        revalidatePath('/about')
        break
      case 'blogPage':
        revalidatePath('/blog')
        revalidatePath('/blog/[slug]', 'page')
        break
      case 'siteSettings':
        revalidatePath('/', 'layout')
        break
      case 'blogPost':
        revalidatePath('/blog')
        if (body.slug?.current) {
          revalidatePath(`/blog/${body.slug.current}`)
        } else {
          revalidatePath('/blog/[slug]', 'page')
        }
        break
      case 'blogCategory':
      case 'blogTag':
        revalidatePath('/blog')
        revalidatePath('/blog/[slug]', 'page')
        break
      default:
        revalidatePath('/', 'layout')
    }

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    return new Response(`Webhook error: ${(err as Error).message}`, { status: 400 })
  }
}
