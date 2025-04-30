'use client'

import { SignIn } from "@/services/firebase/firebase";
import { Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export function LoginButton() {
    return (
        <Button
            border='1px solid'
            borderColor='gray.400'
            mt='2rem'
            _hover={{ bg: 'gray.400' }}
            onClick={() => SignIn()}
        >
            <FcGoogle />
            Entre com sua conta Google
        </Button>
    )
}