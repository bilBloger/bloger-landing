export default function getImage(src: any) {
  const isBrowser = typeof window !== "undefined"
  if (isBrowser) {
    const image = new Image()
    image.src = src
    return image
  }
  return null
}