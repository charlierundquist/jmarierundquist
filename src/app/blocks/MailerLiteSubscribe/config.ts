import { mailerliteSubscribeField } from '@/app/components/MailerLitePopup/mailerliteSubscribe'
import { Block } from 'payload'

export const MailerLiteSubscribe: Block = {
  slug: 'mailer-lite-subscribe',
  interfaceName: 'MailerLiteSubscribe',
  labels: {
    singular: 'MailerLite Subscribe Block',
    plural: 'MailerLite Subscribe Blocks',
  },
  fields: [mailerliteSubscribeField],
}
