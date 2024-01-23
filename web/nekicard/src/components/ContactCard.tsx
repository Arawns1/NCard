import { ReactElement, cloneElement } from 'react'
import { useToast } from '@/components/ui/use-toast'

interface ContactCardProps {
  icon: ReactElement
  text: string
  variant?: 'default' | 'horizontal'
  link?: string
  canCopy?: boolean
}

export default function ContactCard({
  variant = 'default',
  ...rest
}: ContactCardProps) {
  switch (variant) {
    case 'default':
      return <DefaultContactCard {...rest} />
    case 'horizontal':
      return <HorizontalContactCard {...rest} />
    default:
      return <DefaultContactCard {...rest} />
  }
}

export function DefaultContactCard({
  icon,
  text,
  link,
  canCopy,
}: ContactCardProps) {
  const { toast } = useToast()

  const handleCopy = () => {
    if (link) {
      navigator.clipboard.writeText(link)
      toast({
        title: '🔗 Link copiado!',
        duration: 2000,
        style: {
          backgroundColor: '#323238',
          borderRadius: '8px',
        },
      })
    }
  }

  return (
    <a
      href={canCopy ? undefined : link}
      target="_blank"
      onClick={canCopy ? handleCopy : undefined}
    >
      <div className="md:h-28 md:w-28 w-24 h-20 bg-gray-500 flex  flex-col items-center justify-center rounded-xl overflow-hidden space-y-2 hover:cursor-pointer hover:opacity-[0.8]">
        {icon && cloneElement(icon, { className: 'w-8 h-8 text-gray-200' })}

        <span className="font-normal text-gray-200">{text}</span>
      </div>
    </a>
  )
}

export function HorizontalContactCard({ icon, text, link }: ContactCardProps) {
  return (
    <a href={link} target="_blank">
      <div className="md:h-12 md:w-28 w-24 h-10 bg-gray-500 flex flex-row items-center justify-center rounded-xl space-x-2 overflow-hidden space-y-2 hover:cursor-pointer hover:opacity-[0.8]">
        {icon &&
          cloneElement(icon, {
            className: 'sm: w-6 sm: h-6 w-4 h-4 text-gray-200 ',
          })}

        <div className="h-full flex items sm:py-[10px] py-[6px]">
          <span className="  md:font-normal text-sm font-thin text-gray-200 ">
            {text}
          </span>
        </div>
      </div>
    </a>
  )
}
