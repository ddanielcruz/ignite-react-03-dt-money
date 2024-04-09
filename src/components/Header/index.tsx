import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

import {
  HeaderContainer,
  HeaderContent,
  HeaderBrand,
  NewTransactionButton,
} from './styles'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  const [isCreateTxModalOpen, setIsCreateTxModalOpen] = useState(false)

  const handleClose = () => setIsCreateTxModalOpen(false)

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderBrand>
          <img src="/ignite-logo.svg" alt="DT Money" />
          <h1>DT Money</h1>
        </HeaderBrand>

        <Dialog.Root
          open={isCreateTxModalOpen}
          onOpenChange={setIsCreateTxModalOpen}
        >
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal onClose={handleClose} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
