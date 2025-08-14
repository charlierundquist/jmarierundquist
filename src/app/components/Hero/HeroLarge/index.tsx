import { Media, Page } from '@/payload-types'
import { CMSImage } from '../../CMSImage'
import { RichText } from '../../RichText'
import { CMSLink } from '../../CMSLink'

export function HeroLarge(props: Page['hero']) {
  return (
    <section className="relative h-[80vh]">
      <div
        className="absolute right-0 -z-10 hidden h-full w-1/2 bg-white lg:block"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 20% 100%)' }}
      ></div>
      <div className="mx-auto w-full max-w-(--main-width)">
        <div
          className="mx-auto mt-32 max-w-md rounded-sm p-4 px-2 sm:mt-56 lg:mr-0"
          style={{ background: 'rgba(255, 255, 255, 0.8)' }}
        >
          <h1 className="mb-1 text-center font-serif text-4xl sm:text-5xl lg:mb-4 lg:text-left">
            {props.header}
          </h1>
          {props.subheader && (
            <RichText
              data={props.subheader}
              className="text-center text-lg text-balance lg:text-left"
            ></RichText>
          )}
          <div className="mt-4 flex flex-wrap justify-center gap-4 sm:justify-normal">
            {props.links?.map((obj, i) => {
              return (
                <CMSLink
                  key={i}
                  {...obj.link}
                  appearance={i == 0 ? 'solid' : 'outline'}
                  isButton={true}
                ></CMSLink>
              )
            })}
          </div>
        </div>
      </div>
      {props.backgroundImage && (
        <CMSImage
          priority
          resource={props.backgroundImage}
          imgClassName="object-top-left h-full object-cover"
          pictureClassName="absolute! top-0 left-0 -z-20 h-full w-3/4"
          className=""
        ></CMSImage>
      )}
    </section>
  )
}
