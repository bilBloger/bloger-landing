import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import * as React from "react"
import FooterWC23 from "../../components/FooterWC23";
import SEO from "../../components/SEO";

import '../../styles/globals.scss'
import * as styles from './styles.module.scss'
import HeaderWC23 from "../../components/HeaderWC23";
import SimpleModal from "../../components/atoms/SimpleModal";
import classNames from "classnames";

const IndexPage = () => {
  const { t } = useTranslation("worldcup")
  const [openModal, setOpenModal] = React.useState<boolean>(false)

  return (
    <main className={classNames(styles.main, {[styles.openModal]: openModal })}>
      <SEO
        title={t("metaTitle")}
        description={t("description")}
        pathname="/worldcup"
      />

      <HeaderWC23 worldcup />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            <div className={styles.title1}>
              {t("title1")}
            </div>
            <div className={styles.title2}>
              {t("title2")}
            </div>
          </h1>
          <div className={styles.text}>{t("text")}</div>
          <div className={styles.blocks}>
            <div className={styles.promocode}>
              <div className={styles.promocodeText}>{t("promocode")}</div>
              <a href="https://bilbet.com/bonuses" className={styles.promocodeLink} target="_blank">BILBET24</a>
            </div>
            <div className={styles.stepsBlock}>
              <div className={styles.step}>
                <div className={styles.number}>1</div>
                <div className={styles.stepText}>{t("step1")}</div>
              </div>
              <div className={styles.step}>
                <div className={styles.number}>2</div>
                <div className={styles.stepText}>{t("step2")}</div>
              </div>
              <div className={styles.step}>
                <div className={styles.number}>3</div>
                <div className={styles.stepText}>{t("step3")}</div>
              </div>
            </div>
            <a onClick={() => setOpenModal(true)} className={styles.rulesLink}>{t("rules")}</a>
          </div>
        </div>

        <div className={styles.images}>
          <StaticImage className={styles.image} placeholder="blurred" quality={100} src="../../images/wc23-bg.jpeg" alt="wc23-bg" />
          <StaticImage className={styles.imageMobile} placeholder="blurred" quality={100} src="../../images/wc23-bg-mobile.jpeg" alt="wc23-bg-mobile" />
        </div>
      </div>
      <FooterWC23 />
      <SimpleModal
        contentClassName={styles.modal}
        closeBtnClassName={styles.closeBtnModal}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div className={styles.rules}>
          <h3>
            {t("rules")}
            <button className={styles.closeBtn} onClick={() => setOpenModal(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.10225 4.10225C4.32192 3.88258 4.67808 3.88258 4.89775 4.10225L13.8977 13.1023C14.1174 13.3219 14.1174 13.6781 13.8977 13.8977C13.6781 14.1174 13.3219 14.1174 13.1023 13.8977L4.10225 4.89775C3.88258 4.67808 3.88258 4.32192 4.10225 4.10225Z" fill="#A0A6B6"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8977 4.10225C14.1174 4.32192 14.1174 4.67808 13.8977 4.89775L4.89775 13.8977C4.67808 14.1174 4.32192 14.1174 4.10225 13.8977C3.88258 13.6781 3.88258 13.3219 4.10225 13.1023L13.1023 4.10225C13.3219 3.88258 13.6781 3.88258 13.8977 4.10225Z" fill="#A0A6B6"/>
              </svg>
            </button>
          </h3>
          <Trans t={t} i18nKey="rulesText" components={{ a: <a href="https://bilbet.com/bonuses" target="_blank" /> }} />
        </div>
      </SimpleModal>
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