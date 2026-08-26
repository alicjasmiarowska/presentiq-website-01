import Image from 'next/image'
import { urlFor } from '../../../sanity/lib/image'

interface FeaturedWorkCardProps {
  image?: any
  title: string
  category: string
}

export default function FeaturedWorkCard({ image, title, category }: FeaturedWorkCardProps) {
  return (
    <div className="group h-full flex flex-col">
      <div className="relative h-[60vh] max-lg:landscape:h-40 bg-gray-100 rounded-3xl overflow-hidden">
        {image?.asset ? (
          <Image
            src={urlFor(image).width(1200).url()}
            alt={image.alt || title}
            fill
            sizes="(max-width: 768px) 85vw, 55vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Image placeholder
          </div>
        )}
      </div>
      <div className="pt-6">
        <p className="text-primary-dark font-semibold text-lg mb-1">{title}</p>
        <p className="text-gray-500 text-sm">{category}</p>
      </div>
    </div>
  )
}
