import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import * as React from "react"
import { BkashIcon, FBIcon, HumoIcon, InstagramIcon, NagadIcon, PaytmIcon, PhonePeIcon, TelegramIcon, TonIcon, TonMobileIcon, TwitterIcon, UpiIcon, UzcardIcon } from "../atoms/Icons"

import * as styles from './styles.module.scss'
import LogoWithoutLink from "../atoms/LogoWithoutLink"

const FooterWC23 = () => {
  const { t } = useTranslation()
  const {language} = useI18next()

  const psIcons = React.useMemo(() => {
    switch (language) {
      case 'bn':
        return (
          <>
            <NagadIcon />
            <BkashIcon />
          </>
        )
      default:
        return (
          <>
            <PhonePeIcon />
            <UpiIcon />
            <PaytmIcon />
            <TonMobileIcon />
          </>
        )
    }
  }, [language])
  
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <LogoWithoutLink />
        </div>
        <div className={styles.paymentSystems}>
          {psIcons}
        </div>
        <div className={styles.socials}>
          <a href={t("instagram")} target="_blank"><InstagramIcon /></a>
          <a href={t("telegram")} target="_blank"><TelegramIcon /></a>
          <a href={t("facebook")} target="_blank"><FBIcon /></a>
          {/* <a href={t("twitter")} target="_blank"><TwitterIcon /></a> */}
        </div>
      </div>
      <div className={styles.copyright}>Copyright {new Date().getFullYear()}</div>
    </footer>
  )
}

export default FooterWC23