import { useContext } from 'react'
import { WalletContext } from '../contexts/WalletContext'

export const useWalletContext = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error(
      'Make sure to only call useWalletContext within a  <WalletProvider>'
    )
  }
  return context
}