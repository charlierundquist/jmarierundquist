'use client'
import { ContactForm } from '@/payload-types'
import { BlockTemplate, ColumnContent } from '../BlockTemplate'
import { RichText } from '@/app/components/RichText'
import { useRef, useState } from 'react'

export function ContactFormBlock(block: ContactForm) {
  const [confirmShowing, setConfirmShowing] = useState(false)
  const [errorShowing, setErrorShowing] = useState(false)

  const form = block.formSelect
  const ref = useRef<HTMLFormElement>(null)
  const errorMessage = 'Message failed to send.'

  if (!form) return null
  if (typeof form === 'number') return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const dataToSend = Array.from(formData.entries()).map(([name, value]) => ({
      field: name,
      value: value.toString(),
    }))

    const response = await fetch('/api/form-submissions', {
      method: 'POST',
      body: JSON.stringify({
        form: form.id,
        submissionData: dataToSend,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      setConfirmShowing(true)
      ref.current?.reset()
    } else {
      setErrorShowing(true)
    }
  }

  const contentCol: ColumnContent = {
    type: 'text',
    content: (
      <form className="grid grow grid-cols-1 gap-4" onSubmit={handleSubmit} ref={ref}>
        <h2 className="text-center lg:text-left">{form.title}</h2>
        {/* <hr className="my-2" /> */}
        {/* eslint-disable-next-line */}
        {form.fields?.map((field: any, i) => {
          return (
            <div key={i} className="grid grid-cols-1 gap-1">
              <label htmlFor={field.name}>{field.label}</label>
              {field.blockType === 'textarea' ? (
                <textarea className="border-green min-h-32 border-2" name={field.name}></textarea>
              ) : (
                <input
                  type={field.blockType}
                  name={field.name}
                  className="border-green rounded-sm border-2 px-2 py-1"
                />
              )}
            </div>
          )
        })}
        <div className="mx-auto mt-4 flex w-min flex-wrap items-center justify-center gap-2 lg:mx-0 lg:w-fit">
          <input
            type="submit"
            value={form.submitButtonLabel || 'Submit'}
            className="bg-pink w-fit rounded-full px-4 py-1 transition-transform duration-200 hover:-translate-y-0.5 hover:underline focus:-translate-y-0.5 focus-visible:-translate-y-0.5 lg:mx-0"
            // copied from button styling
          />
          {confirmShowing && form.confirmationMessage && (
            <RichText data={form.confirmationMessage} className="my-auto italic" />
          )}
          {errorShowing && (
            <div>
              <p className="my-auto italic">{errorMessage}</p>
            </div>
          )}
        </div>
      </form>
    ),
    className: `flex! w-full! justify-center ${block.leadingContent && 'row-start-3 row-end-3 lg:row-start-2! lg:row-end-3!'}`,
  }

  if (!block.hasLeadingContent) {
    return <BlockTemplate content={[contentCol]} />
  }

  const leadingContentCol: ColumnContent = {
    type: 'text',
    content: (
      <>
        <h2>{block.leadingTitle}</h2>
        <hr />
        {block.leadingContent && <RichText data={block.leadingContent}></RichText>}
      </>
    ),
    className: 'h-fit',
  }

  return <BlockTemplate content={[leadingContentCol, contentCol]} />
}
