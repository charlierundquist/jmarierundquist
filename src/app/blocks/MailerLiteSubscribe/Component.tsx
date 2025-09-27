'use client'
import { MailerLiteSubscribe } from '@/payload-types'
import { BlockTemplate, ColumnContent } from '../BlockTemplate'
import { RichText } from '@/app/components/RichText'
import { useRef, useState } from 'react'

export function MailerLiteSubscribeBlock(block: MailerLiteSubscribe) {
  const [confirmShowing, setConfirmShowing] = useState(false)
  const [errorShowing, setErrorShowing] = useState(false)
  const [badEmailShowing, setBadEmailShowing] = useState(false)
  const [loadingShowing, setLoadingShowing] = useState(false)

  const ref = useRef<HTMLFormElement>(null)
  const errorMessage = 'Failed to subscribe. Please try again.'
  const badEmailMessage = 'Invalid email. Please try again.'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setConfirmShowing(false)
    setErrorShowing(false)
    setBadEmailShowing(false)
    setLoadingShowing(true)
    const formData = new FormData(e.currentTarget)

    if (
      formData
        .get('email')
        ?.toString()
        .toLowerCase()
        .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) === null
    ) {
      setLoadingShowing(false)
      setBadEmailShowing(true)
      return
    }

    const response = await fetch('/mailerlite/api/subscribers', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        email: formData.get('email'),
        fields: {
          name: formData.get('firstName'),
          last_name: formData.get('lastName'),
        },
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_MAILERLITE_API_KEY,
      },
    })

    if (response.ok) {
      setLoadingShowing(false)
      setConfirmShowing(true)
      ref.current?.reset()
    } else {
      setLoadingShowing(false)
      setErrorShowing(true)
    }
  }

  const content = block.popupContent
  const title = content?.title || ''
  const subtitle = content?.subtitle || ''
  const confirmationMessage = content?.confirmationMessage || ''

  const contentCol: ColumnContent = {
    type: 'text',
    content: (
      <>
        {title && <h2>{title}</h2>}
        {subtitle && <RichText data={subtitle} />}
        <hr />
        <form className="grid grow grid-cols-1 gap-4" onSubmit={handleSubmit} ref={ref}>
          <div className="grid grid-cols-1 gap-1">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              className="border-green rounded-sm border-2 px-2 py-1"
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="border-green rounded-sm border-2 px-2 py-1"
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="border-green rounded-sm border-2 px-2 py-1"
              // pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              required
            />
          </div>
          <div className="mx-auto mt-4 flex w-min flex-wrap items-center justify-center gap-2 lg:mx-0 lg:w-fit">
            <input
              type="submit"
              value="Subscribe"
              className="bg-pink w-fit rounded-full px-4 py-1 transition-transform duration-200 hover:-translate-y-0.5 hover:underline focus:-translate-y-0.5 focus-visible:-translate-y-0.5 lg:mx-0"
              // copied from button styling
            />
            {loadingShowing && (
              <div>
                <p className="my-auto italic">Loading...</p>
              </div>
            )}
            {confirmShowing && confirmationMessage && (
              <RichText data={confirmationMessage} className="my-auto italic" />
            )}
            {errorShowing && (
              <div>
                <p className="my-auto italic">{errorMessage}</p>
              </div>
            )}
            {badEmailShowing && (
              <div>
                <p className="my-auto italic">{badEmailMessage}</p>
              </div>
            )}
          </div>
        </form>
      </>
    ),
    className: 'w-full',
  }

  return <BlockTemplate content={[contentCol]} />
}
