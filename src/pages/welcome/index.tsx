import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import * as React from "react"
import Cookies from "js-cookie";
import FooterWC23 from "../../components/FooterWC23";
import SEO from "../../components/SEO";
import SimpleModal from "../../components/atoms/SimpleModal";
import classNames from "classnames";
import HeaderWelcome from "../../components/HeaderWelcome";
import { useLocation } from '@reach/router'

import '../../styles/globals.scss'
import * as styles from './styles.module.scss'
import Logo from "../../components/atoms/Logo";

const IndexPage = () => {
  const { t } = useTranslation("welcome")
  const [openModal, setOpenModal] = React.useState<"sport" | "casino" | null>(null)
  const location = useLocation()

  const notActiveSession = () => !Cookies.get('auth._token.local') || Cookies.get('auth._token.local') === 'false'
  
  return (
    <main className={classNames(styles.main, {[styles.openModal]: openModal })}>
      <SEO
        title={t("metaTitle")}
        description={t("description")}
        pathname="/welcome"
      />

      <HeaderWelcome hideBtns={!notActiveSession()} />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            <div className={styles.title1}>
              {t("title1")}
              <Logo />
            </div>
            <div className={styles.title2}>
              {t("title2")}
            </div>
          </h1>
          <div className={styles.cards}>
            <div className={classNames(styles.card, styles.sport)}>
              <div className={styles.cardTitle}>{t("sportBonus")}</div>
              <div className={styles.shortHr}>
                <svg xmlns="http://www.w3.org/2000/svg" width="106" height="2" viewBox="0 0 106 2" fill="none">
                  <path d="M1 1H105" stroke="url(#paint0_linear_27589_13919)" stroke-linecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear_27589_13919" x1="1.4" y1="1" x2="105.4" y2="1.00016" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#B94C20" stop-opacity="0"/>
                      <stop offset="0.505208" stop-color="#AD451B"/>
                      <stop offset="1" stop-color="#C15124" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className={styles.cardTextBig}>
                <div className={styles.medium}>{t("bonus")}</div>
                <div className={styles.big}>+125%</div>
              </div>
              <div className={styles.cardText}>{t(location?.origin === "https://bilbet24.com" ? "firstDepositBdt" : "firstDeposit")}</div>
              <a href={notActiveSession() ? "/registration?autob=WELCOME_SPORT" : "/rules?ruleId=421"} className={styles.getItBtn}>{t("getIt")}</a>
              <a onClick={() => setOpenModal("sport")} className={styles.rulesLink}>{t("rules")}</a>
            </div>
            <div className={classNames(styles.card, styles.casino)}>
              <div className={styles.cardTitle}>{t("casinoBonus")}</div>
              <div className={styles.shortHr}>
                <svg xmlns="http://www.w3.org/2000/svg" width="106" height="2" viewBox="0 0 106 2" fill="none">
                  <path d="M1 1H105" stroke="url(#paint0_linear_27589_13904)" stroke-linecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear_27589_13904" x1="1.4" y1="1" x2="105.4" y2="1.00016" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#912191" stop-opacity="0"/>
                      <stop offset="0.505208" stop-color="#841D84"/>
                      <stop offset="1" stop-color="#9C229C" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className={styles.cardTextBig}>
                <div className={styles.medium}>{t("bonus")} +125%</div>
                <div className={styles.low}>+{t("25Frispins")}</div>
              </div>
              <div className={styles.cardText}>{t(location?.origin === "https://bilbet24.com" ? "firstDepositBdt" : "firstDeposit")}</div>
              <a href={notActiveSession() ? "/registration?autob=WELCOME_CASINO" : "/rules?ruleId=421"} className={styles.getItBtn}>{t("getIt")}</a>
              <a onClick={() => setOpenModal("casino")} className={styles.rulesLink}>{t("rules")}</a>
            </div>
          </div>
        </div>

        <div className={styles.images}>
          <StaticImage className={styles.image} placeholder="blurred" quality={100} src="../../images/welcome-bg.jpeg" alt="welcome-bg" />
          <StaticImage className={styles.imageMobile} placeholder="blurred" quality={100} src="../../images/welcome-bg-mobile.jpeg" alt="welcome-bg-mobile" />
        </div>
      </div>
      <FooterWC23 />
      <SimpleModal
        contentClassName={styles.modal}
        closeBtnClassName={styles.closeBtnModal}
        isOpen={!!openModal}
        onClose={() => setOpenModal(null)}
      >
        <div className={styles.rules}>
          <h3>
            {t("rules")}
            <button className={styles.closeBtn} onClick={() => setOpenModal(null)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.10225 4.10225C4.32192 3.88258 4.67808 3.88258 4.89775 4.10225L13.8977 13.1023C14.1174 13.3219 14.1174 13.6781 13.8977 13.8977C13.6781 14.1174 13.3219 14.1174 13.1023 13.8977L4.10225 4.89775C3.88258 4.67808 3.88258 4.32192 4.10225 4.10225Z" fill="#A0A6B6"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8977 4.10225C14.1174 4.32192 14.1174 4.67808 13.8977 4.89775L4.89775 13.8977C4.67808 14.1174 4.32192 14.1174 4.10225 13.8977C3.88258 13.6781 3.88258 13.3219 4.10225 13.1023L13.1023 4.10225C13.3219 3.88258 13.6781 3.88258 13.8977 4.10225Z" fill="#A0A6B6"/>
              </svg>
            </button>
          </h3>
          <Trans t={t} i18nKey={openModal === "sport" ? "rulesTextSport" : "rulesTextCasino"} />
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