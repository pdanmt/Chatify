import { Flex, Icon } from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";
import { Avatar } from "../../avatar";
import { UseUserContext } from "@/context";

export function Header() {
    const { user } = UseUserContext()

    return (
        <Flex
            h='4.5rem'
            w='100%'
            bg='gray.500'
            justify='space-between'
            align='center'
            p='1rem'
        >
            <Avatar name={user?.displayName} photoUrl={user?.photoURL} />
            <Flex>
                <Icon
                    color='gray.200'
                    cursor='pointer'
                    _hover={{ color: 'gray.100' }}
                >
                    <FaMoon />
                </Icon>
            </Flex>
        </Flex>
    )
}