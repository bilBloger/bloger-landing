import { graphql } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import * as React from "react"

import '../styles/globals.scss'
import * as styles from './styles.module.scss'

const IndexPage = () => {
  const { t } = useTranslation()
  const {language} = useI18next()

  return (
    <main>
      <title>Bilbet landings</title>
    </main>
  )
}

export default IndexPage

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;