import { Box, BoxProps } from '@chakra-ui/react'
import { FormInput } from './form-input'
import { SendButton } from './send-button'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export type inputFormBoxType = {
  message?: string
  userEmail?: string
}

interface FormBoxProps extends BoxProps {
  handleSubmitFn: (data: inputFormBoxType) => void
  registerName: string
  inputType?: string
  hasInputMaxValue?: boolean
}

export function FormBox({
  handleSubmitFn,
  registerName,
  hasInputMaxValue,
  inputType,
  ...props
}: FormBoxProps) {
  const formBoxSchema = z.object({
    message: z.string().optional(),
    userEmail: z.string().optional(),
  })

  type FormBoxType = z.infer<typeof formBoxSchema>

  const zod = useForm<FormBoxType>({
    resolver: zodResolver(formBoxSchema),
  })

  const { handleSubmit, reset } = zod

  function onSubmitFn(data: FormBoxType) {
    console.log(data)
    handleSubmitFn(data)

    reset()
  }

  return (
    <FormProvider {...zod}>
      <Box
        display="flex"
        as="form"
        onSubmit={handleSubmit(onSubmitFn)}
        outline="1px solid"
        outlineColor="border"
        _focus={{ outline: '2px solid', outlineColor: 'border' }}
        borderRadius="6px"
        {...props}
      >
        <FormInput
          placeholder="Digite uma mensagem"
          isRequired
          registerName={registerName}
          hasMaxValue={hasInputMaxValue}
          type={inputType}
        />
        <SendButton />
      </Box>
    </FormProvider>
  )
}
