import { createContext, useEffect, useState } from 'react'

export interface Transaction {
  id: string
  description: string
  type: 'income' | 'outcome'
  value: number
  category: string
  createdAt: Date
}

type RawTransaction = Omit<Transaction, 'createdAt'> & { createdAt: string }

interface TransactionsContextType {
  transactions: Transaction[]
}

export const TransactionsContext = createContext<TransactionsContextType>({
  transactions: [],
})

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/transactions')
      .then((response) => response.json())
      .then((data: RawTransaction[]) => {
        return setTransactions(
          data.map((tx) => ({
            ...tx,
            createdAt: new Date(tx.createdAt),
          })),
        )
      })
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
