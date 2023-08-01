export function nowUnix(): number {
  return Math.floor(new Date().getTime() / 1000)
}
