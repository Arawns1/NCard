import { Heading, VStack, Text } from 'native-base'

export interface TitleProps {
  title: string
  subtitle?: string
}
export default function Title({ title, subtitle }: TitleProps) {
  return (
    <VStack w={'full'} alignItems={'center'} space={0} mt={'10'} id="title">
      <Heading color={'gray.100'} size={'xl'}>
        {title}
      </Heading>
      {subtitle && (
        <Text fontFamily={'regular'} fontSize={'md'} color={'gray.300'}>
          {subtitle}
        </Text>
      )}
    </VStack>
  )
}
