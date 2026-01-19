import { InputHTMLAttributes } from "react"
import clsx from "clsx"

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black",
        props.className
      )}
    />
  )
}
