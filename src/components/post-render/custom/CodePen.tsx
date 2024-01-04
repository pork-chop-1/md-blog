import ViewportLoad from '@/components/viewport-load'

export default function CodePen({
  title,
  src,
}: {
  title: string
  src: string
}) {
  return (
    <ViewportLoad>
      <iframe
        title={title}
        src={src}
        loading="lazy"
        allowTransparency
        allowFullScreen
      >
      </iframe>
    </ViewportLoad>
  )
}
