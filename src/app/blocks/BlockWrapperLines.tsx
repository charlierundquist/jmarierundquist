interface Props {
  className?: string
}

export function BlockWrapperLineTop(props: Props) {
  // 28px = height - border width

  return (
    <>
      <div
        className={`border-green absolute -z-10 col-span-full -mb-[28px] h-8 w-5/6 rounded-tl-2xl border-t-4 border-l-4 ${props.className}`}
      ></div>
    </>
  )
}

export function BlockWrapperLineBottom(props: Props) {
  // 28px = height - border width

  return (
    <>
      <div
        className={`border-green absolute right-0 -z-10 col-span-full -mt-[28px] h-8 w-5/6 rounded-br-2xl border-r-4 border-b-4 ${props.className}`}
      ></div>
    </>
  )
}
