import PhotoTextSplit from './photoTextSplit'

interface PhotoTextBlocksProps {
  data?: any[]
  locale: 'en' | 'de'
}

// Renders each `intro` block from Sanity, alternating image side and panel
// theme by index: #0 is photo-left/navy-text-right, #1 flips to
// gray-text-left/photo-right (Word & PDF's second block), and so on — so
// stacking more than one block mirrors rather than repeats.
export default function PhotoTextBlocks({ data, locale }: PhotoTextBlocksProps) {
  if (!data || data.length === 0) return null

  return (
    <>
      {data.map((block, i) => (
        <PhotoTextSplit
          key={block._key}
          data={block}
          locale={locale}
          reverse={i % 2 === 1}
          theme={i % 2 === 1 ? 'light' : 'dark'}
        />
      ))}
    </>
  )
}
