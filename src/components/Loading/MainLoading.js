import React from 'react'
import '../../assets/css/loading.css'
import MainLoadingAnim from '../../assets/lotties/main-loading.json'
import Lottie from 'react-lottie-player'

const MainLoading = ({ loading }) => {
  if (loading) {
    return (
      <div id="loader-absolute-wrapper">
        <div id="loader-lotties">
          <Lottie loop animationData={MainLoadingAnim} play style={{ width: 150, height: 150 }} />
        </div>
      </div>
    )
  }

  return <div />
}

export default MainLoading
