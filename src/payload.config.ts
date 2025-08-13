// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { resendAdapter } from '@payloadcms/email-resend'
import { BeforeEmail } from '@payloadcms/plugin-form-builder/types'
import { FormSubmission } from '@/payload-types'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Header } from './app/components/Header/config'
import { Books } from './collections/Books'
import { SiteDetails } from './app/components/SiteDetails/config'
import { Footer } from './app/components/Footer/config'
import { env } from 'process'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: ({ collectionConfig, data }) =>
        `/${collectionConfig?.slug === 'pages' ? (data.slug !== 'home' ? data.slug : '') : ''}`,
      collections: ['pages'],
      breakpoints: [
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 1080,
        },
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
      ],
    },
  },
  globals: [Header, Footer, SiteDetails],
  collections: [Users, Media, Books, Pages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // db: sqliteAdapter({
  //   client: {
  //     url: process.env.DATABASE_URI || '',
  //   },
  // }),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  email: resendAdapter({
    defaultFromAddress: 'charlie@charlierundquist.com',
    defaultFromName: 'Charlie Rundquist',
    apiKey: env.RESEND_API_KEY || '',
  }),
  plugins: [
    payloadCloudPlugin(),
    formBuilderPlugin({
      formOverrides: {
        admin: {
          group: 'Forms',
        },
      },
      formSubmissionOverrides: {
        admin: {
          group: 'Forms',
        },
      },
    }),
    uploadthingStorage({
      collections: {
        media: {
          prefix: 'media',
          disablePayloadAccessControl: true,
        },
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN || '',
      },
    }),
  ],
  // onInit: async (payload) => {
  //   await payload.update({
  //     collection: 'pages',
  //     where: {},
  //     data: { _status: 'published' },
  //   })
  // },
})
