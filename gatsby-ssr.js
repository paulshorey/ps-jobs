import React from "react"
// // to use Redux:
// import wrapWithProvider from "./gatsby-wrap-provider"
// export const wrapRootElement = wrapWithProvider

// import foot from "src/html/foot.html"

// import foot from "src/html/foot.html"
// import head from "src/html/head.html"

const PRODUCTION = process.env.GATSBY_ACTIVE_ENV === "production"

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
  getPostBodyComponents,
  replacePostBodyComponents
}) => {
  // alter <head>
  const headComponents = getHeadComponents()
  // INSERT INTO BOTTOM OF <head>
  // headComponents.push(<div dangerouslySetInnerHTML={{ __html: head }} />)
  headComponents.push(
    <>
      <title>Paul Shorey</title>
      <meta name="referrer" content="origin" />
      <meta name="description" content="Web development - web design - UI / UX" />
      <meta name="keywords" content="Paul Shorey, HTML5, Javascript, AngularJS, SASS" />
      <meta property="og:title" content="Paul Shorey | Web development" />
      <meta property="og:site_name" content="Paul Shorey" />
      <meta property="og:description" content="Web design and development" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="/" />

      {/* <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" /> */}
      <link href="/puzzle.ico" rel="shortcut icon" type="image/x-icon" />

      <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width" />
      {/*<script src="/assets/js/mailchimp.js"></script>*/}

      <link rel="stylesheet" type="text/css" href="/css/fontawesome-svg-core.css" />
      {/*<link rel="stylesheet" type="text/css" href="/css/styles.css"/>*/}
    </>
  )
  // save <head>
  replaceHeadComponents(headComponents)
  // alter <body>
  const bodyComponents = getPostBodyComponents()
  // INSERT INTO TOP OF <body>
  // INSERT INTO BOTTOM OF <body>
  // bodyComponents.push(<div dangerouslySetInnerHTML={{ __html: foot }} />)
  bodyComponents.push(
    <>
      {/*
      ELFSIGHT CONTACT FORM
     */}
      <script src="https://apps.elfsight.com/p/platform.js" defer></script>
      <div className="elfsight-app-bcf06b3b-b3f9-47c0-a7f0-11e2e4a2418f"></div>
    </>
  )
  // done altering <html>
  replacePostBodyComponents(bodyComponents)
}
