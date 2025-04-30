import { Box, Flex, SkeletonCircle, Text } from "@chakra-ui/react"
import Image from "next/image"

interface AvatarProps {
    name: string | null | undefined
    photoUrl: string | null | undefined
}

export function Avatar({ name, photoUrl }: AvatarProps) {

    if (!name || !photoUrl) {
        return (
            <SkeletonCircle w='35px' h='35px' />
        )
    }

    return (
        <Flex align='center' gap='0.75rem'>
            <Box w='35px' h='35px' borderRadius='100%' pos='relative'>
                <Image
                    src={photoUrl}
                    alt=''
                    fill
                    style={{ borderRadius: '100%' }}
                />
            </Box>
            <Text>
                {name}
            </Text>
        </Flex>
    )
}