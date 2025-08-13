import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  let url = process.env.PUBLIC_URL

  if (!url && process.env.PUBLIC_URL) {
    return process.env.PUBLIC_URL
  }

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const { protocol, hostname, port } = window.location

    return `${protocol}//${hostname}${port ? `:${port}` : ''}`
  }

  if (process.env.PUBLIC_URL) {
    return `https://${process.env.PUBLIC_URL}`
  }

  return process.env.PUBLIC_URL || ''
}
