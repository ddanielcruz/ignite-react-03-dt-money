import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SearchFormContainer } from './styles'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'

const searchFormSchema = z.object({
  query: z.string().trim().optional(),
})

type SearchFormData = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormData>({
    defaultValues: { query: '' },
    resolver: zodResolver(searchFormSchema),
  })

  const handleSearch = async (data: SearchFormData) => {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearch)}>
      <input placeholder="Busque por transações" {...register('query')} />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        <span>Buscar</span>
      </button>
    </SearchFormContainer>
  )
}
