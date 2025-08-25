'use client'

import type { StaticImageData } from 'next/image'
import NextImage from 'next/image'
import React from 'react'

import type { Props as MediaProps } from './types'

import { cssVariables } from '@/app/utilities/cssVariables'

const { breakpoints } = cssVariables

// A base64 encoded image to use as a placeholder while the image is loading
// const placeholderBlur =
//   'data:image/png;base64,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'
const placeholderBlur =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAQK0lEQVR4AQEgEN/vAP////////////////////////////////////////////////////////////////7////9/////P/+//v//f/7//3/+v/8//n//P/5//v/+P76//f++v/2/fn/9f34//P89//y+/b/8Pr1/+749P/s9/P/6/by/+n28v/o9fL/AP////////////////////////////////////////////////////////////////7////9/////P/+//v//f/6//3/+v/8//n//P/5//v/+P76//f++f/2/fn/9fz4//P89//x+/b/8Pn1/+749P/s9/P/6vby/+n28v/o9fH/AP////////////////////////////////////////////////////////////////7////8//7/+/79//r+/f/6/vz/+f78//j++//4/vr/9/76//b9+f/1/fj/9Pz3//P79v/x+vX/7/n0/+348//r9/L/6vby/+n18f/o9fH/AP///////////////////////////////////////////////////////////v////3//v/7/v3/+v79//n+/P/5/vv/+P77//f++v/3/fr/9v35//X9+P/0/Pf/8/v2//H69f/w+fT/7vjz/+z38v/r9vH/6fbx/+j18P/n9PD/AP/////////////////////////////////////////////////////+/////f/+//v+/f/6/vz/+f37//j9+//3/fr/9/36//b9+f/1/fj/9fz4//T89//z+/b/8vr1//D69P/v+fP/7fjy/+v38f/p9vD/6PXw/+f07//m9O7/AP////////////////////////////////////////////////7////8//7/+/79//r9/P/4/fv/9/36//b8+f/2/Pn/9fz4//T8+P/0/Pf/8/v3//L79v/x+vX/8Pn0/+/58//t+PL/6/fx/+r28P/o9e//5/Tu/+bz7f/l8+3/AP///////////////////////////////////////////v////z//v/7/v3/+f37//j9+v/3/Pn/9vz5//X7+P/0+/f/8/v3//P79v/y+/b/8fr1//H69f/w+fT/7vjz/+338v/s9/H/6vbw/+j17//n9O7/5vPt/+Xz7P/k8uv/AP/////////////////////////////////////+/////P/+//v+/P/5/fv/+Pz6//f8+f/1+/j/9Pv3//P69v/z+vb/8vr1//H69f/x+fT/8Pn0/+/58//u+PL/7ffx/+v28P/q9e//6PXu/+f07f/m8+z/5PLr/+Py6v/j8er/AP////////////////////////////////7////8//7/+/78//n9+//4/Pr/9vz5//X79//0+vf/8/r2//L69f/x+fT/8fn0//D58//v+PP/7vjy/+738v/s9/H/6/bw/+r17//p9O7/5/Tt/+bz7P/k8ur/4/Hq/+Lx6f/i8ej/AP///////////////////////////v////3//v/7//z/+f77//j9+v/2/Pj/9fv3//T69v/z+fX/8vn0//H59P/w+PP/7/jz/+/48v/u9/L/7ffx/+z28P/r9vD/6vXv/+n07v/n8+z/5vPr/+Ty6v/j8en/4vDo/+Hw5//h8Of/AP/////////////////////+/////f/+//v//f/6/vv/+P36//f8+f/1+/f/9Pr2//P59f/x+fT/8fjz//D48v/v9/L/7vfx/+738f/t9vD/7Pbw/+v17//q9e7/6fTt/+fz7P/m8+v/5fLq/+Px6f/i8Oj/4e/n/+Dv5v/g7+b/AP////////////////7////9//7//P/9//r//P/5/fr/9/z5//b7+P/0+vb/8/n1//H49P/w+PP/7/fy/+/38f/u9vH/7fbw/+328P/s9e//6/Xu/+r07v/p9O3/6PPs/+by6//l8ur/5PHp/+Lw6P/h7+f/4O/m/9/u5f/e7uT/AP///////////v////3//v/8//3/+//8//n++//4/fr/9vz4//X69//z+fX/8vj0//D38//v9/L/7vbx/+328P/t9e//7PXv/+v17v/r9O7/6vTt/+nz7P/o8+z/5/Lr/+Xy6v/k8en/4vDo/+Hv5v/g7uX/3u7l/97t5P/d7eP/AP7////+/////f////z//v/7//3/+v/8//n++v/3/Pn/9fv3//T69v/y+fT/8ffz/+/28v/u9vH/7fXw/+z17//r9O7/6/Tu/+r07f/p8+z/6PPs/+jy6//m8ur/5fHp/+Tx6P/i8Of/4e/m/9/u5f/e7eT/3e3k/9zs4//c7OL/AP3////9/////P/+//z//f/7//z/+f77//j9+v/2/Pj/9fr3//P59f/x+PT/8Pfy/+728f/t9fD/7PTv/+vz7v/q8+3/6fPs/+jy7P/o8uv/5/Lr/+bx6v/l8en/5PDo/+Lw5//h7+b/3+7l/97t5P/c7OP/2+zi/9rr4v/a6+L/APz//v/8//7//P/+//v//f/6//z/+f77//f9+f/1+/j/9Pr2//L49P/w9/P/7vbx/+318P/r9O//6vPt/+ny7f/o8uz/5/Hr/+bx6v/l8er/5fHp/+Tw6P/j8Oj/4u/n/+Dv5v/f7uX/3e3k/9zs4//a6+L/2evh/9jq4f/Y6uH/APv//v/7//7/+//9//r//P/5/vv/+P36//b8+f/1+/f/8/n1//H49P/v9vL/7fXw/+vz7//p8u3/6PHs/+bx6//l8Or/5PDq/+Tw6f/j7+j/4u/o/+Hv5//h7+b/4O7m/97u5f/d7eT/2+zj/9rr4v/Y6uH/1+rg/9bp4P/V6d//APr//f/6//3/+v/9//n//P/4/vv/9/36//X7+P/0+vb/8vj1//D38//t9fH/6/Tv/+ny7v/n8ez/5fDr/+Tv6v/i7+n/4e7o/+Hu5//g7uf/3+7m/9/u5v/e7eX/3e3k/9zs4//a7OP/2evi/9fq4f/W6eD/1Ojf/9Po3//S6N7/APn//f/5//z/+P/8//j++//3/fr/9vz5//T79//z+fb/8fj0/+728v/s9PD/6vPu/+fx7f/l8Ov/4+/q/+Hu6P/f7ef/3u3m/93t5v/d7eX/3Ozl/9zs5P/b7OP/2uzj/9nr4v/Y6uH/1urg/9Tp3//T6N//0efe/9Dn3f/Q5t3/APj//P/4//z/9/77//f++v/2/fn/9fz4//P69//y+fX/7/fz/+318f/q8+//6PLt/+Xw6//i7+r/4O7o/97t5//c7Ob/2+zl/9rr5P/Z6+T/2evj/9jr4//Y6+L/1+rh/9bq4f/V6eD/0+jf/9Lo3v/Q593/z+bd/83m3P/N5dz/APb++//2/vv/9v76//X9+v/1/Pn/9Pv3//L59v/w+PT/7vby/+z08P/p8+7/5vHs/+Pv6v/g7uj/3e3n/9vs5f/Z6+T/2Orj/9fq4//W6uL/1uri/9Xp4f/V6eH/1Ong/9Po3//S6N//0Ofe/8/n3f/N5tz/zOXb/8vl2//K5Nr/APX9+v/1/fr/9f35//T8+f/z+/j/8vr2//H59f/v9/P/7fXx/+r07//n8u3/5PDr/+Hu6f/e7ef/2+zm/9jr5P/W6uP/1eni/9Tp4f/T6eH/0+jg/9Lo4P/S6N//0ejf/9Dn3v/P593/zubd/8zm3P/L5dv/yeTa/8jk2v/H5Nn/APT8+f/0/Pn/8/z4//P7+P/y+vf/8fn1//D49P/u9vL/7PXw/+nz7v/m8ez/4u/q/9/u6P/c7Ob/2evk/9bq4//U6eL/0ujh/9Ho4P/R6OD/0Off/9Dn3//P597/z+fe/87m3f/N5tz/zOXb/8rl2//J5Nr/x+TZ/8bj2P/G49j/APP8+P/y+/j/8vv3//L69//x+vb/8Pn0/+738//t9vH/6vTv/+jy7f/k8ev/4e/p/97t5//b7OX/1+vk/9Xp4v/T6eH/0ejg/9Dn3//P59//zufe/87n3v/O5t3/zebd/8zm3P/L5dv/yuXa/8nk2v/H5Nn/xuPY/8Xj1//E4tf/APH79//x+/f/8fr2//H69f/w+fT/7/jz/+338v/r9fD/6fTu/+by7P/j8Or/4O/o/93t5v/a7OX/1+rj/9Tp4v/S6OD/0Ojg/8/n3//O597/zefe/83m3f/N5t3/zObc/8vl2//K5dr/yeTa/8jk2f/H49j/xePX/8Ti1v/E4tb/APD69v/w+vb/8Pr1//D59P/v+PP/7vfy/+z28f/q9e//6PPt/+by6//j8On/4O/o/93t5v/a7OT/1+vj/9Tq4f/S6eD/0Ojf/8/n3//O597/zefd/83m3f/M5tz/zObc/8vl2//K5dr/yeTZ/8jk2P/H49f/xePW/8Ti1v/E4tX/APD59f/w+fX/7/n0/+/48//u+PL/7ffx/+v28P/p9O7/5/Ps/+Xy6//i8On/3+/n/93t5f/a7OT/1+vi/9Xq4f/T6eD/0ejf/9Do3//P597/zufd/87n3f/N5tz/zObb/8vl2v/K5dn/yeTZ/8jk2P/H49f/xuPW/8Xj1f/F4tX/AO/59P/v+fT/7vjz/+748v/t9/H/7Pbw/+r17//p9O3/5/Ps/+Tx6v/i8Oj/3+/n/93u5f/a7OT/2Ovj/9br4f/U6uH/0+ng/9Hp3//Q6N7/z+je/8/n3f/O59z/zebb/8zm2v/L5dn/yuXY/8nk1//I5Nb/x+PW/8bj1f/G49X/AO748//u+PP/7vjy/+338v/s9/H/6/bv/+r17v/o9Oz/5vPr/+Tx6f/i8Oj/4O/m/97u5f/b7eT/2ezj/9jr4v/W6uH/1Org/9Pp3//S6d//0eje/9Do3f/P59z/zufb/83m2v/M5tn/y+XY/8rk1//J5Nb/yOPW/8fj1f/H49X/AO748//u+PL/7fjy/+338f/s9vD/6/bv/+n17f/o9Oz/5vPq/+Tx6f/i8Of/4O/m/97u5f/c7eT/2+3j/9ns4v/Y6+H/1uvh/9Xq4P/U6d//0+ne/9Lo3f/Q6Nz/z+fb/87n2v/N5tn/zOXY/8vl1//K5Nb/yeTW/8nj1f/I49X/AO748v/u+PL/7ffx/+z38f/r9vD/6vXu/+n17f/n9Ov/5vPq/+Ty6f/i8ef/4PDm/9/v5f/d7uT/3O3j/9rs4//Z7OL/2Ovh/9br4P/V6t//1Onf/9Pp3v/S6N3/0Ojb/8/n2v/O5tn/zebY/8zl1//L5db/yuTW/8rk1f/J5NX/AO748v/t9/L/7ffx/+z38P/r9u//6vXu/+n07f/n9Ov/5fPq/+Ty6P/i8ef/4fDm/9/v5f/e7uT/3O3j/9vt4//a7OL/2ezh/9fr4f/W6uD/1erf/9Tp3v/S6d3/0ejc/9Dn2v/P59n/zubY/83l1//M5db/y+TW/8rk1f/K5NX/+xkiaUw4x5AAAAAASUVORK5CYII='

export const CMSImage: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    pictureClassName,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''
  // let uploadthingURL = ''

  if (!src && resource && typeof resource === 'object') {
    const {
      alt: altFromResource,
      height: fullHeight,
      url,
      // _key,
      width: fullWidth,
      // focalX: focalPointX,
      // focalY: focalPointY,
    } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''

    // const cacheTag = resource.updatedAt

    // src = getMediaUrl(url, cacheTag)
    // const utURL = process.env.UPLOADTHING_PROJECT_URL || 'https://8khyo0boor.ufs.sh'
    // uploadthingURL = `${utURL}/f/${_key}`
    src = url!
  }

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(', ')

  // const customLoader = ({ src }: { src: string }) => {
  //   return src
  // }

  return (
    <picture
      className={`${pictureClassName} relative block max-h-full max-w-full`}
      style={{ width: `${width}px`, aspectRatio: `${width}/${height}` }}
    >
      <NextImage
        alt={alt || ''}
        className={`${imgClassName} absolute object-cover`}
        fill={fill}
        height={!fill ? height : undefined}
        placeholder="blur"
        blurDataURL={placeholderBlur}
        // priority={priority}
        priority={priority}
        quality={100}
        loading={loading}
        sizes={sizes}
        src={src}
        // src={uploadthingURL}
        // loader={customLoader}
        width={!fill ? width : undefined}
      />
    </picture>
  )
}
