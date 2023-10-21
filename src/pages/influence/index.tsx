import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Cookies from "js-cookie";
import * as React from "react"
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import RegisterForm, { ICurrency } from "../../components/RegisterForm";
import SEO from "../../components/SEO";
import Steps from "../../components/Steps";

import '../../styles/globals.scss'
import * as styles from './styles.module.scss'

const currencies: ICurrency[] = [
  {
    code: 'INR',
    name: 'Indian rupee'
  }
]

const IndexPage = () => {
  const { t } = useTranslation("influence")
  const content = () => {
    if (!Cookies.get('auth._token.local') || Cookies.get('auth._token.local') === 'false') {
      return (
        <main>
          <SEO
            title={t("metaTitle")}
            description={t("description")}
            pathname="/influence"
          />

          <div className={styles.container}>
            <Header />
            <div className={styles.content}>
              <h1 className={styles.title}>{t("titleStart")} <div className={styles.titleEnd}>{t("titleEnd")}</div></h1>
              <a href="https://bilbet.com/rules" className={styles.rulesLink}>{t("rulesAndConditions")}</a>

              <div className={styles.blocks}>
                <div className={styles.formBlock}>
                  <RegisterForm currencies={currencies} />
                </div>
                <div className={styles.stepsBlock}>
                  <Steps />
                </div>
              </div>
            </div>

            <div className={styles.images}>
              <StaticImage className={styles.image} placeholder="blurred" quality={100} src="../../images/influence-bg.png" alt="influence-bg" />
              <StaticImage className={styles.imageMobile} placeholder="blurred" quality={100} src="../../images/influence-bg-mobile.png" alt="influence-bg-mobile" />
            </div>
          </div>
          <Footer />
        </main>
      )
    }

    window.location.assign("/")
    return <main></main>
  }

  return content()
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