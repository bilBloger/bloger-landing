import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import * as React from "react"
import Logo from "../atoms/Logo"

import * as styles from './styles.module.scss'


const HeaderWelcome = () => {
  const { t } = useTranslation()
  const {language} = useI18next()

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.controls}>
          {/* <LanguagePicker /> */}
          <a href="/?login=1" className={styles.login}>{t("loginBtn")}</a>
          <a href={`${language !== 'en' ? `/${language}` : ''}/registration`} 
            className={styles.register}>
              {t("registerBtn")}
          </a>
        </div>
      </div>
    </div>
  )
}

export default HeaderWelcome