import { useContext } from 'react'

import { TransactionsContext } from '../contexts/TransactionsContext'

interface Summary {
  income: number
  outcome: number
  total: number
}

export const useSummary = () => {
  const { transactions } = useContext(TransactionsContext)
  const summary = transactions.reduce<Summary>(
    (acc, tx) => {
      if (tx.type === 'income') acc.income += tx.value
      else acc.outcome += tx.value

      acc.total = acc.income - acc.outcome

      return acc
    },
    { income: 0, outcome: 0, total: 0 },
  )

  return summary
}
