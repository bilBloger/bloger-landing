import classNames from "classnames"
import { useI18next } from "gatsby-plugin-react-i18next"
import * as React from "react"
import { useRef, useState } from "react"
import useOutsideAlerter from "../../../hooks/useClickOutside"
import { RussiaFlag } from "../Flags"
import { UzFlag, USFlag, RusFlag, HiFlag, BnFlag } from "../Icons"

import * as styles from './styles.module.scss'

const LanguagePicker = () => {
  const {language, changeLanguage} = useI18next()

  const [open, setOpen] = useState<boolean>(false)

  const wrapperRef = useRef(null)
  const btnRef = useRef(null)
  useOutsideAlerter(wrapperRef, btnRef, () => setOpen(false))

  const languages = [
    {
      code: 'en',
      icon: <USFlag />
    },
    {
      code: 'uz',
      icon: <UzFlag />
    },
    {
      code: 'ru',
      icon: <RusFlag />
    },
    {
      code: 'hi',
      icon: <HiFlag />
    },
    {
      code: 'bn',
      icon: <BnFlag />
    }
  ]

  return (
    <div className={styles.languagePicker}>
      <button 
        className={styles.currentLanguage}
        ref={btnRef}
        onClick={() => setOpen(!open)}>
          {languages.find(lang => lang.code === language)?.icon}
      </button>
      {open && (<ul className={styles.languages} ref={wrapperRef}>
        {languages.map(lng => (
          <a
            className={classNames(styles.language, { [styles.active]: lng.code === language })}
            onClick={() => {
              changeLanguage(lng.code)
            }}>
              {lng.icon}
              {lng.code}
          </a>
        ))}
      </ul>)}
    </div>
  )
}

export default LanguagePicker