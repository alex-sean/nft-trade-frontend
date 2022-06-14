import React from 'react'
import '../../assets/css/loading.css'
import { useLoadingContext } from '../../hooks/useLoadingContext'
import MainLoading from './MainLoading'

const Loading = () => {
  const { loading } = useLoadingContext();
  if (loading) {
    return (
      <div id="loader-wrapper">
        <div className="loader-section" />
        <MainLoading loading={loading} />
      </div>
    )
  }

  return <div />
}

export default Loading
