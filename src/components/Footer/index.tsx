import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import * as React from "react"
import { BkashIcon, FBIcon, HumoIcon, InstagramIcon, NagadIcon, PaytmIcon, PhonePeIcon, TelegramIcon, TonIcon, TonMobileIcon, TwitterIcon, UpiIcon, UzcardIcon } from "../atoms/Icons"

import * as styles from './styles.module.scss'

const Footer = () => {
  const { t } = useTranslation()
  const {language} = useI18next()

  const psIcons = React.useMemo(() => {
    switch (language) {
      case 'uz':
      case 'ru':
        return (
          <>
            <UzcardIcon />
            <HumoIcon />
          </>
        )
      case 'bn':
        return (
          <>
            <BkashIcon />
            <NagadIcon />
          </>
        )
      default:
        return (
          <>
            <PhonePeIcon />
            <UpiIcon />
            <PaytmIcon />
          </>
        )
    }
  }, [language])
  
  return (
    <footer className={styles.footer}>
      <div className={styles.login}>
        <div className={styles.text}>{t("alreadyHaveAccount")}</div>
        <a href="https://bilbet.com/?login=1" className={styles.link}>{t("login")}</a>
      </div>
      <div className={styles.paymentSystems}>
        {psIcons}
        <span className={styles.tonMobile}><TonMobileIcon /></span>
        <span className={styles.ton}><TonIcon /></span>
      </div>
      <div className={styles.socials}>
        <a href={t("instagram")} target="_blank"><InstagramIcon /></a>
        <a href={t("telegram")} target="_blank"><TelegramIcon /></a>
        <a href={t("facebook")} target="_blank"><FBIcon /></a>
        {/* <a href={t("twitter")} target="_blank"><TwitterIcon /></a> */}
      </div>
    </footer>
  )
}

export default Footer