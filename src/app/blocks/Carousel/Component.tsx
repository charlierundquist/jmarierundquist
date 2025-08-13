'use client'
import { Carousel } from '@/payload-types'
// import { RenderBlocks } from '@/app/blocks'
import { Circle } from '@deemlol/next-icons'
import { ArrowLeft } from '@/app/components/CustomIcons/ArrowLeft'
import { ArrowRight } from '@/app/components/CustomIcons/ArrowRight'
import { useEffect, useState } from 'react'
import { ShortContentBlock } from '../ShortContent/Component'
import { BookShowcaseBlock } from '../BookShowcase/Component'
import { PraiseDisplayBlock } from '../PraiseDisplay/Component'

const blockComponents = {
  'short-content': ShortContentBlock,
  'book-showcase': BookShowcaseBlock,
  'praise-display': PraiseDisplayBlock,
}

export const RenderCarouselBlocks: React.FC<{
  blocks: Carousel['blocks']
  className?: string
  slideShowing: number
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div
                  key={index}
                  className={`${props.className || ''} ${props.slideShowing === index ? 'opacity-100' : 'invisible opacity-0'} transition-all transition-discrete duration-100`}
                >
                  {/* @ts-expect-error */}
                  <Block {...block}></Block>
                </div>
              )
            }

            return null
          }
        })}
      </>
    )
  }

  return null
}

export function CarouselBlock(block: Carousel) {
  const [slideShowing, setSlideShowing] = useState(0)
  const [autoscrolling, setAutoscrolling] = useState(true)

  const blockCount = block.blocks.length

  function incrementSlideDown() {
    if (slideShowing <= 0) {
      setSlideShowing(blockCount - 1)
      return
    }

    setSlideShowing(slideShowing - 1)
  }

  function incrementSlideUp() {
    if (slideShowing >= blockCount - 1) {
      setSlideShowing(0)
      return
    }

    setSlideShowing(slideShowing + 1)
  }

  let interval: NodeJS.Timeout
  const timing = (block.autoscrollSpeed || 4) * 1000

  useEffect(() => {
    if (autoscrolling) {
      interval = setTimeout(() => {
        if (autoscrolling) incrementSlideUp()
      }, timing)
    }
  }, [slideShowing])

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.code === 'Tab') {
        setAutoscrolling(false)
        clearTimeout(interval)
      }
    }
    document.addEventListener('keydown', keyDownHandler)

    // clean up
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  return (
    <div className="mx-auto max-w-(--main-width) overflow-x-clip">
      <div
        className="flex max-w-(--main-width) transition-transform duration-500"
        style={{ translate: `calc(100% * ${slideShowing} * -1) 0` }}
      >
        <RenderCarouselBlocks
          blocks={block.blocks}
          className="w-full shrink-0"
          slideShowing={slideShowing}
        ></RenderCarouselBlocks>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <button
          className="cursor-pointer"
          onClick={() => {
            setAutoscrolling(false)
            incrementSlideDown()
          }}
        >
          <ArrowLeft></ArrowLeft>
        </button>
        <div className="flex gap-1">
          {block.blocks?.map((block, i) => {
            return (
              <button
                className="cursor-pointer"
                onClick={() => {
                  setAutoscrolling(false)
                  setSlideShowing(i)
                }}
                key={i}
              >
                <Circle
                  stroke="var(--color-green)"
                  strokeWidth={3}
                  fill={slideShowing === i ? 'var(--color-green)' : 'transparent'}
                  className="transition-colors duration-200"
                ></Circle>
              </button>
            )
          })}
        </div>
        <button
          className="cursor-pointer"
          onClick={() => {
            setAutoscrolling(false)
            incrementSlideUp()
          }}
        >
          <ArrowRight></ArrowRight>
        </button>
      </div>
    </div>
  )
}
