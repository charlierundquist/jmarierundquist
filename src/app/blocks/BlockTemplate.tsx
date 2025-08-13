import { Media } from '@/payload-types'
import { BookAlert } from '../components/BookAlert'
import './animations.css'
import { BlockWrapperLineBottom, BlockWrapperLineTop } from './BlockWrapperLines'
import { CMSImage } from '../components/CMSImage'
import { Fragment } from 'react'

export type ColumnContent = {
  type: 'text' | 'image'
  content: React.ReactNode
  media?: Media | null | undefined | number
  className?: string
}

export function BlockTemplate(props: {
  content: ColumnContent[]
  shiftTopLineLarge?: boolean
  shiftTopLineSmall?: boolean
  shiftTopLineDownLarge?: boolean
  shiftTopLineDownSmall?: boolean
  hasAlert?: boolean
  alertText?: string
  imagePos?: 'left' | 'right'
  className?: string
}) {
  const {
    content,
    shiftTopLineLarge,
    shiftTopLineSmall,
    shiftTopLineDownLarge,
    shiftTopLineDownSmall,
    hasAlert = false,
    alertText = '',
    imagePos = 'left',
    className,
  } = props
  const columns = content.length

  return (
    <section
      className={`relative mx-auto grid h-fit max-w-(--main-width) grid-cols-1 px-2 ${columns == 2 && 'lg:grid-cols-2'} ${className || ''}`}
    >
      <BlockWrapperLineTop
        className={`${columns == 2 ? 'row-start-2 row-end-3 lg:translate-y-0' : ''} ${shiftTopLineLarge ? '-translate-y-64' : ''} ${shiftTopLineSmall ? '-translate-y-32' : ''} ${shiftTopLineDownLarge ? 'translate-y-64' : ''} ${shiftTopLineDownSmall ? 'translate-y-32' : ''}`}
      />

      {hasAlert && <BookAlert text={alertText} direction={imagePos}></BookAlert>}

      {props.content.map((column, i) => {
        const className = column.className

        if (column.type === 'text') {
          return (
            <div
              key={i}
              className={`${className ? className : ''} ${columns === 2 && 'row-start-2 row-end-3'} col-span-full mx-auto grid max-w-prose gap-6 px-4 py-8 lg:col-span-1 lg:px-8`}
            >
              {column.content}
            </div>
          )
        }

        if (column.type === 'image') {
          return (
            <Fragment key={i}>
              <CMSImage
                resource={column.media}
                pictureClassName={`${className ? className : ''} ${columns === 2 && 'col-span-full row-start-1 mx-auto mt-auto max-w-sm lg:col-span-1 lg:row-end-3 lg:mb-8 lg:max-w-md'}`}
              ></CMSImage>
            </Fragment>
          )
        }
      })}

      <BlockWrapperLineBottom
        className={`${columns == 2 ? 'row-start-3 row-end-3' : 'row-start-2 row-end-2'}`}
      />
    </section>
  )
}
