export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
