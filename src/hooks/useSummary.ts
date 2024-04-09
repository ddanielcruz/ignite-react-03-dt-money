import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'

import { TransactionsContext } from '../contexts/TransactionsContext'

export interface TransactionsSummary {
  income: number
  outcome: number
  total: number
}

export const useSummary = () => {
  const transactions = useContextSelector(
    TransactionsContext,
    (ctx) => ctx.transactions,
  )
  const summary = useMemo(
    () =>
      transactions.reduce<TransactionsSummary>(
        (acc, tx) => {
          if (tx.type === 'income') acc.income += tx.value
          else acc.outcome += tx.value

          acc.total = acc.income - acc.outcome

          return acc
        },
        { income: 0, outcome: 0, total: 0 },
      ),
    [transactions],
  )

  return summary
}
