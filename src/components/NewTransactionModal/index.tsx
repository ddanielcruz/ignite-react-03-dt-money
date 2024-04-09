import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowCircleDown, ArrowCircleUp, X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'

const newTransactionFormSchema = z.object({
  description: z.string().trim(),
  value: z.number().positive(),
  category: z.string().trim(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormData = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const { createTransaction } = useContext(TransactionsContext)
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormData>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: { type: 'income' },
  })

  const handleCreateTransaction = async (data: NewTransactionFormData) => {
    await createTransaction(data)
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateTransaction)}>
          <input
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Valor"
            required
            {...register('value', { valueAsNumber: true })}
          />
          <input placeholder="Categoria" required {...register('category')} />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton
                    type="button"
                    variant="income"
                    value="income"
                  >
                    <ArrowCircleUp size={24} />
                    <span>Entrada</span>
                  </TransactionTypeButton>
                  <TransactionTypeButton
                    type="button"
                    variant="outcome"
                    value="outcome"
                  >
                    <ArrowCircleDown size={24} />
                    <span>Saída</span>
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
