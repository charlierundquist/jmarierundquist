type Props = {
  size?: number
  stroke?: string
  strokeWidth?: number
  fill?: string
}

export function ArrowLeft(props: Props) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      stroke={props.stroke || 'var(--color-green)'}
      strokeWidth={props.strokeWidth || 3}
      fill={props.fill || 'none'}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 3 9 12 18 21"></polyline>
    </svg>
  )
}
