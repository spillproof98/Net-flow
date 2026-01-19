import { TextareaHTMLAttributes } from "react"
import clsx from "clsx"

export default function Textarea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className={clsx(
        "w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black",
        props.className
      )}
    />
  )
}
