import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react"
import LanguagePicker from "../../components/atoms/LanguagePicker";
import Logo from "../../components/atoms/Logo";
import SimpleModal from "../../components/atoms/SimpleModal";
import Footer from "../../components/Footer";
import RegisterForm, { ICurrency } from "../../components/RegisterForm";
import SEO from "../../components/SEO";
import ZeppelinAnimation from "../../components/ZeppelinAnimation";
import ZeppelinAnimationMobile from "../../components/ZeppelinAnimationMobile";

import '../../styles/globals.scss'
import * as styles from './styles.module.scss'

const currencies: ICurrency[] = [
  {
    code: 'INR',
    name: 'Indian rupee'
  },
  {
    code: 'UZS',
    name: 'Uzbekistani soum'
  },
  {
    code: 'BDT',
    name: 'Bangladeshi taka'
  }
]

const IndexPage = () => {
  const { t } = useTranslation("zeppelin")
  const [startAnimation, setStartAnimation] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [endAnimation, setEndAnimation] = useState<boolean>(false)

  useEffect(() => {
    if (endAnimation) {
      setTimeout(() => setOpenModal(true), 3000)
    }
  }, [endAnimation])

  const onButtonClick = () => {
    if (endAnimation) {
      setOpenModal(true)
    } else {
      setStartAnimation(true)
    }
  }
  const content = () => {
    if (!Cookies.get('auth._token.local') || Cookies.get('auth._token.local') === 'false') {
      return (
        <main>
          <SEO
            title={t("metaTitle")}
            description={t("description")}
            pathname="/zeppelinpromo"
          />

          <div className={styles.container}>
            <div className={styles.header}>
              <Logo />
              <div className={styles.controls}>
                <LanguagePicker />
                <button className={styles.signUp} onClick={() => setOpenModal(true)}>{t("signUp")}</button>
              </div>
            </div>

            <div className={styles.content}>
              <div className={styles.topBlock}>
                <ZeppelinAnimation startAnimation={startAnimation} endAnimation={() => setEndAnimation(true)} />
                {/* <ZeppelinAnimationMobile className={styles.zeppelinAnimationMobile} startAnimation={startAnimation} openModal={() => setEndAnimation(true)} /> */}
              </div>
              <div className={styles.bottomBlock}>
                <button onClick={onButtonClick} className={styles.button}>{t("getYourBonus")}</button>
                <a href="https://bilbet.com/rules" className={styles.rulesLink}>{t("rulesAndConditions")}</a>
              </div>
            </div>

            <div className={styles.images}>
              <StaticImage className={styles.image} placeholder="blurred" quality={100} src="../../images/zeppelin-bg.png" alt="zeppelin-bg" />
              <StaticImage className={styles.imageMobile} placeholder="blurred" quality={100} src="../../images/zeppelin-bg-mobile.png" alt="zeppelin-bg-mobile" />
            </div>
          </div>
          <Footer />
          <SimpleModal
            contentClassName={styles.modal}
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
          >
            <div className={styles.registrationForm}>
              <h3>{t("signUp")}</h3>
              <RegisterForm redirectRoute="/casino" pageName="zeppelin" currencies={currencies} />
            </div>
          </SimpleModal>
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