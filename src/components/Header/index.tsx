import {
  HeaderContainer,
  HeaderContent,
  HeaderBrand,
  NewTransactionButton,
} from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderBrand>
          <img src="/ignite-logo.svg" alt="DT Money" />
          <h1>DT Money</h1>
        </HeaderBrand>

        <NewTransactionButton>Nova transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}
