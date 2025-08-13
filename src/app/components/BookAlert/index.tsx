type Props = {
  text: string
  direction: 'left' | 'right'
}

export function BookAlert({ text, direction }: Props) {
  if (direction === 'left') {
    return (
      <div
        className={`before:border-green after:border-green absolute -top-8 left-[50vw] -z-10 row-start-1 row-end-2 h-8 -translate-x-1/2 text-lg leading-8 italic before:absolute before:border-b-4 after:absolute after:border-t-4 lg:top-8 lg:-left-4 lg:col-start-2 lg:col-end-3 lg:translate-x-0 lg:before:-right-4 lg:before:bottom-0 lg:before:w-128 lg:after:top-3 lg:after:right-full lg:after:w-96 lg:after:-translate-x-4`}
      >
        {text}
      </div>
    )
  }

  if (direction === 'right') {
    return (
      <div
        className={`before:border-green after:border-green absolute -top-8 right-[50vw] -z-10 row-start-1 row-end-2 h-8 translate-x-1/2 text-lg leading-8 italic before:absolute after:absolute after:border-t-4 lg:top-8 lg:-right-4 lg:col-start-1 lg:col-end-2 lg:translate-x-0 lg:before:bottom-0 lg:before:-left-4 lg:before:w-128 lg:before:border-b-4 lg:after:top-3 lg:after:left-full lg:after:w-96 lg:after:translate-x-4`}
      >
        {text}
      </div>
    )
  }
}
