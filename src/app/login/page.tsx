import { LoginButton } from "@/components/my-components/login/button";
import { Box, Flex, Text } from "@chakra-ui/react";
import { IoIosChatbubbles } from "react-icons/io";

export default function Login() {
    return (
        <Box
            display={['flex', 'flex', 'grid']}
            flexDir='column'
            gridTemplateColumns='50% 50%'
            minH='100vh'
            color='gray.100'
        >
            <Flex
                bg='gray.500'
                p='1rem'
                direction='column'
                align={['center', 'center', 'normal']}
                justify='space-between'
            >
                <Text
                    display='flex'
                    gap='0.5rem'
                    alignItems='center'
                    fontWeight='700'
                    fontSize='lg'
                >
                    Chatify <IoIosChatbubbles />
                </Text>
                <Text display={['none', 'none', 'block']}>
                    Todos os direitos reservados &copy; {new Date().getFullYear()} Pedro Daniel
                </Text>
            </Flex>

            <Flex bg='gray.600' minH='100vh' px={['0.5rem', '0']}>
                <Flex
                    direction='column'
                    align='center'
                    justify='center'
                    m='auto'
                    maxW='550px'
                    textAlign='center'
                >
                    <Text fontSize={['lg', 'lg', 'lg', 'xl']} color='fr'>
                        Entre em uma conta para começar a usar o Chatify!
                    </Text>
                    <Text color='gray.300' fontSize={['sm', 'md']}>
                        Conecte-se com outros usuários para conversar, sem precisar de números de telefone!
                    </Text>
                    <LoginButton />
                </Flex>
            </Flex>

            <Flex
                bg='gray.500'
                p='0.5rem'
                justify='center'
                textAlign='center'
                display={['flex', 'flex', 'none']}
            >
                <Text fontSize='sm'>
                    Todos os direitos reservados &copy; {new Date().getFullYear()} Pedro Daniel
                </Text>
            </Flex>
        </Box>
    )
}