import { useContext } from 'react'

import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { currencyFormatter, dateFormatter } from '../../utils/formatter'

export function Transactions() {
  const { transactions } = useContext(TransactionsContext)

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td width="50%">{tx.description}</td>
                <td>
                  <PriceHighlight variant={tx.type}>
                    {tx.type === 'outcome' && '- '}
                    {currencyFormatter.format(tx.value)}
                  </PriceHighlight>
                </td>
                <td>{tx.category}</td>
                <td>{dateFormatter.format(tx.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
