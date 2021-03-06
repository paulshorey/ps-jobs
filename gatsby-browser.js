// const PRODUCTION = process.env.GATSBY_ACTIVE_ENV === "production"

// custom typefaces
// import "typeface-quick"
// import "typeface-merriweather"

import "../nlp-fe/src/style/variables.scss"
import "../nlp-fe/src/style/reset.scss"
import "../nlp-fe/src/style/responsive.scss"
import "../nlp-fe/src/style/classes.scss"

import "src/scss/styles.scss"


// import "src/assets/fonts/taviraj.css"
// import "src/assets/fonts/spectral.css"
// import "src/assets/fonts/garamond.css"

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
// import "@fortawesome/fontawesome-svg-core/styles.css"
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false /* eslint-disable import/first */

// Use Redux:
// import wrapWithProvider from "./wrap-with-provider"
// export const wrapRootElement = wrapWithProvider

// export const createPages = ({ actions }) => {
//   const { createRedirect } = actions
//   createRedirect({ fromPath: '/domains', toPath: '/domain', isPermanent: true })
//   createRedirect({ fromPath: '/', toPath: '/domain', isPermanent: false })
// }
