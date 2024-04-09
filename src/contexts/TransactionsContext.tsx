import { useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'

import { api } from '../lib/axios'

export interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  value: number
  category: string
  createdAt: Date
}

type ApiTransaction = Omit<Transaction, 'createdAt'> & {
  createdAt: string
}

export type CreateTransactionData = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsContextType {
  transactions: Transaction[]
  createTransaction: (data: CreateTransactionData) => Promise<void>
  fetchTransactions: (query?: string) => Promise<void>
}

export const TransactionsContext = createContext<TransactionsContextType>({
  transactions: [],
  createTransaction: async () => {},
  fetchTransactions: async () => {},
})

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const createTransaction = useCallback(async (data: CreateTransactionData) => {
    const { description, value, category, type } = data
    const response = await api.post<ApiTransaction>('/transactions', {
      description,
      value,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((prevTransactions) => [
      { ...response.data, createdAt: new Date(response.data.createdAt) },
      ...prevTransactions,
    ])
  }, [])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(
      response.data.map((tx: ApiTransaction) => ({
        ...tx,
        createdAt: new Date(tx.createdAt),
      })),
    )
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
