import { Page } from '@/payload-types'
import { CMSImage } from '../../CMSImage'

export function HeroSmall(props: Page['hero']) {
  return (
    <section className="relative grid h-48 max-w-screen place-content-center overflow-clip">
      <CMSImage
        resource={props.backgroundImage}
        loading="eager"
        priority
        pictureClassName="absolute top-0 -z-10 block h-full"
        imgClassName="object-center"
      ></CMSImage>
      <h1
        className="absolute top-1/2 left-1/2 w-fit -translate-x-1/2 -translate-y-1/2 rounded-sm px-8 py-4 text-center font-serif text-4xl"
        style={{ background: 'rgba(255, 255, 255, 0.8)' }}
      >
        {props.header}
      </h1>
    </section>
  )
}
