import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HeaderBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 2.5rem;
  }

  h1 {
    font-size: 1.75rem;
    font-weight: bold;
    line-height: 1.6;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const NewTransactionButton = styled.button`
  height: 3.125rem;
  border: 0;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${(props) => props.theme['green-700']};
  }
`
