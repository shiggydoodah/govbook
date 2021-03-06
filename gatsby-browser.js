const URL_PREFIX = "govbook.chicagoreporter.com"

// Dispatch prefixed pageview
exports.onRouteUpdate = ({ location }) => {
  if (process.env.NODE_ENV !== `production` || typeof gtag !== `function`) {
    return null
  }

  // wrap inside a timeout to make sure react-helmet is done with its changes (https://github.com/gatsbyjs/gatsby/issues/11592)
  const sendPageView = () => {
    const pagePath = URL_PREFIX + (location
      ? location.pathname + location.search + location.hash
      : undefined)
    window.gtag(`event`, `page_view`, { page_path: pagePath })
  }

  if (`requestAnimationFrame` in window) {
    requestAnimationFrame(() => {
      requestAnimationFrame(sendPageView)
    })
  } else {
    // simulate 2 rAF calls
    setTimeout(sendPageView, 32)
  }

  return null
}
