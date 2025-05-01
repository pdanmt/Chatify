import { Flex, Link, Text } from '@chakra-ui/react'

export default function NotFound() {
    return (
        <Flex
            direction='column'
            bg='gray.600'
            color='gray.100'
            minH='100vh'
            align='center'
            textAlign='center'
            justify='center'
        >
            <Text fontSize='1.5rem'>
                Opa... como você veio parar aqui?
            </Text>
            <Link
                color='gray.200'
                href='/'
                textDecor='none'
                transition='0.1s'
                _hover={{ color: 'gray.300' }}
            >
                Página não encontrada. Clique aqui para retornar a página inicial.
            </Link>
        </Flex>
    )
}