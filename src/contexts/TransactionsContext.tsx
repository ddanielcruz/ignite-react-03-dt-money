import { createContext, useCallback, useEffect, useState } from 'react'

export interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  value: number
  category: string
  createdAt: Date
}

type RawTransaction = Omit<Transaction, 'createdAt'> & { createdAt: string }

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
}

export const TransactionsContext = createContext<TransactionsContextType>({
  transactions: [],
  fetchTransactions: async () => {},
})

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const url = new URL('http://localhost:3333/transactions')
    if (query) {
      url.searchParams.append('q', query)
    }

    const response = await fetch(url)
    const data = await response.json()

    setTransactions(
      data.map((tx: RawTransaction) => ({
        ...tx,
        createdAt: new Date(tx.createdAt),
      })),
    )
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
