import Image from 'next/image'
import { Flex, Text } from '@radix-ui/themes'

export default async function Home() {
  return (
    <main className='mx-auto flex h-full min-h-full w-full flex-col items-center overflow-scroll px-4 pt-8 text-center'>
      <Text className='text-4xl font-bold text-white'>{"It's about who you know."}</Text>
      <Flex direction={'column'}>
        <Text className='text-4xl font-bold text-white'>{'The social graph'}</Text>
        <Text className='text-4xl font-bold text-[#FEF305]'>{'for Ethereum.'}</Text>
      </Flex>

      <Image src={'/assets/landing-graph.png'} width={500} height={500} alt='Landing graph' />
      <Flex direction={'column'}>
        <Text className='text-4xl font-bold text-white'>{'Follow your friends.'}</Text>
        <Text className='text-4xl font-bold text-[#FEF305]'>{'Ghost your enemies.'}</Text>
      </Flex>
      <Text className='text-4xl font-bold text-white'>{'A follower list you own'}</Text>
    </main>
  )
}
