import * as Dialog from '@radix-ui/react-dialog'

import {
  HeaderContainer,
  HeaderContent,
  HeaderBrand,
  NewTransactionButton,
} from './styles'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderBrand>
          <img src="/ignite-logo.svg" alt="DT Money" />
          <h1>DT Money</h1>
        </HeaderBrand>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
