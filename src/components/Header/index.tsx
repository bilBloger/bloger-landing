import { useTranslation } from "gatsby-plugin-react-i18next"
import * as React from "react"
import { CalendarIcon, CasinoIcon } from "../atoms/Icons"
import LanguagePicker from "../atoms/LanguagePicker"
import Logo from "../atoms/Logo"

import * as styles from './styles.module.scss'

const Header = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.header}>
      <Logo />
      <div className={styles.controls}>
        {/* <LanguagePicker /> */}
        <a href="https://bilbet.com/?login=1" className={styles.button}>{t("login")}</a>
      </div>
    </div>
  )
}

export default Header