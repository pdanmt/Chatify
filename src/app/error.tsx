'use client'

import { Flex, Text } from "@chakra-ui/react"

export default function Error({ error }: { error: Error }) {
    console.error(`Erro encontrado: ${error}`)

    return (
        <Flex
            bg='gray.600'
            w='100%'
            minH='100vh'
            justify='center'
            align='center'
            direction='column'
            fontFamily='Maven Pro'
            textAlign='center'
        >
            <Text
                fontSize={['lg', 'lg', 'xl']}
                color='gray.100'
            >
                Opa... algo deu errado, tente recarregar a página!
            </Text>
            <Text fontSize='sm' color='red'>
                [ERRO]: {error.message}
            </Text>
        </Flex>
    )
}