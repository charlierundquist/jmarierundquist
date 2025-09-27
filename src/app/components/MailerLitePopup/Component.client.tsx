'use client'
import { RichText } from '@/app/components/RichText'
import { MailerLiteSubscribe } from '@/payload-types'
import { X } from '@deemlol/next-icons'
import { useEffect, useRef, useState } from 'react'
import { hasCookie, setCookie } from 'cookies-next/client'

interface Props extends MailerLiteSubscribe {
  display: 'center' | 'corner' | 'none'
  reappearDelay?: number | null | undefined
}

export function MailerLitePopupClient(props: Props) {
  const [confirmShowing, setConfirmShowing] = useState(false)
  const [errorShowing, setErrorShowing] = useState(false)
  const [badEmailShowing, setBadEmailShowing] = useState(false)
  const [loadingShowing, setLoadingShowing] = useState(false)

  const [popupShowing, setPopupShowing] = useState(false)
  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!hasCookie('subscribe_popup_recent')) {
      setCookie('subscribe_popup_recent', new Date(), {
        maxAge: reappearDelay * 60,
        sameSite: 'lax',
      })

      setTimeout(() => {
        openModal(modalRef.current, true)
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            setPopupShowing(false)
          }
        })
      }, 2000)
    }
  }, [])

  const formRef = useRef<HTMLFormElement>(null)
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
      formRef.current?.reset()
    } else {
      setLoadingShowing(false)
      setErrorShowing(true)
    }
  }

  const display = props.display
  const reappearDelay = typeof props.reappearDelay === 'number' ? props.reappearDelay : 30

  if (display === 'none') return null

  const content = props.popupContent
  const title = content?.title || ''
  const subtitle = content?.subtitle || ''
  const confirmationMessage = content?.confirmationMessage || ''

  const openModal = (obj: HTMLDialogElement | null, isModal: boolean) => {
    if (isModal) {
      obj?.showModal()
    } else {
      obj?.show()
    }
    setPopupShowing(true)
  }

  const closeModal = (obj: HTMLDialogElement | null) => {
    obj?.close()
    setPopupShowing(false)
  }

  return (
    <dialog
      ref={modalRef}
      id="subscribePopup"
      className={`${display === 'center' ? 'backdrop:bg-lightgreen-transparent fixed top-1/2 z-100 -translate-y-1/2 rounded-sm bg-white' : ''} ${popupShowing ? 'grid' : ''} mx-auto w-full max-w-prose gap-6 px-12 py-8 lg:px-16`}
    >
      <button
        className="absolute top-8 right-8 hover:cursor-pointer"
        onClick={() => closeModal(modalRef.current)}
      >
        <X size={24}></X>
      </button>

      {title && <h2>{title}</h2>}
      {subtitle && <RichText data={subtitle} />}
      <hr />
      <form className="grid grow grid-cols-1 gap-4" onSubmit={handleSubmit} ref={formRef}>
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
    </dialog>
  )
}
