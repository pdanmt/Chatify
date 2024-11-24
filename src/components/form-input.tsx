import { Box, Input, InputProps, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

interface InputPropsProps extends InputProps {
  registerName: string
  hasMaxValue?: boolean
}

export function FormInput({
  registerName,
  hasMaxValue,
  ...props
}: InputPropsProps) {
  const { register, watch } = useFormContext()

  const value = watch('message') || ''

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      pr="0.5rem"
      w="100%"
    >
      <Input
        p="0.5rem"
        border="none"
        variant="unstyled"
        maxLength={hasMaxValue ? 150 : undefined}
        {...props}
        {...register(registerName)}
      />
      {hasMaxValue && (
        <Text color="mutedFr" fontSize={['0.8rem', '0.8rem', '1rem']}>
          {value.length}/150
        </Text>
      )}
    </Box>
  )
}
