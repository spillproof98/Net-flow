import { ButtonHTMLAttributes } from "react"
import clsx from "clsx"

export default function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        "px-4 py-2 rounded-lg text-sm font-medium transition",
        "bg-black text-white hover:bg-gray-800 disabled:opacity-50",
        className
      )}
    />
  )
}
