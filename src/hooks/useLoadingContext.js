import { useContext } from 'react'
import { LoadingContext } from '../contexts/LoadingContext'

export const useLoadingContext = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error(
      'Make sure to only call useLoadingContext within a  <LoadingProvider>'
    )
  }
  return context
}