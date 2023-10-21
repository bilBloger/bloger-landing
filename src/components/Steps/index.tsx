import { useTranslation } from "gatsby-plugin-react-i18next"
import * as React from "react"
import { ArrowIcon, CupIcon, UserIcon, WalletIcon } from "../atoms/Icons"

import * as styles from './styles.module.scss'

const Steps = () => {
  const { t } = useTranslation()
  
  return (
    <div className={styles.steps}>
      <div className={styles.step}>
        <div className={styles.icon}>
          <UserIcon />
        </div>
        <div className={styles.text}>{t("step1")}</div>
      </div>
      <ArrowIcon />
      <div className={styles.step}>
        <div className={styles.icon}>
          <WalletIcon />
        </div>
        <div className={styles.text}>{t("step2")}</div>
      </div>
      <ArrowIcon />
      <div className={styles.step}>
        <div className={styles.icon}>
          <CupIcon />
        </div>
        <div className={styles.text}>{t("step3")}</div>
      </div>
    </div>
  )
}

export default Steps