import ToProgress from 'toprogress'

let loadingBar, loadingBarInterval

export default (showOverlay) => function * (ctx) {
  // run once for top-most router
  if (!loadingBar) {
    // toggle overlay (observable passed in)
    showOverlay(true)

    // start loading bar
    loadingBar = new ToProgress({
      color: '#000',
      duration: 0.2,
      height: '5px'
    })
    loadingBarInterval = setInterval(() => {
      loadingBar.increase(1)
    }, 100)
  }

  yield

  // end loading in bottom-most router afterRender
  if (!ctx.$child) {
    loadingBar.finish()
    clearInterval(loadingBarInterval)
    showOverlay(false)
    // reset for next navigation
    loadingBar = null
    loadingBarInterval = null
  }
}
