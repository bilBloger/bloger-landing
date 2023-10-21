import { Form, Formik } from "formik"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import * as React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"
import * as yup from 'yup'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

import register from "../../api/register"
import setTokensAndRedirect from "../../utils/setTokensAndRedirect"
import Field from "../atoms/Field"
import Password from "../atoms/Password"
import SelectWC23 from "../atoms/SelectWC23"

import * as styles from './styles.module.scss'
import login from "../../api/login"
import { StaticImage } from "gatsby-plugin-image"

export interface ICurrency {
  code: string
  name: string
}

interface IRefs {
  referrer_id?: string
  partner_id?: string
}

const getRefferalIds = () => {
  const params = new URLSearchParams(location.search)
  const referrer_id = params.get("click_id")
  const partner_id = params.get("partner_id")
  const refs: IRefs = {}
  if (referrer_id) refs.referrer_id = referrer_id
  if (partner_id) refs.partner_id = partner_id
  return refs
} 

const RegisterFormWC23 = ({ redirectRoute, openRulesModal }: { redirectRoute?: string, openRulesModal?: () => void }) => {
  const { t } = useTranslation("wc23")
  const {language} = useI18next()

  const [error, setError] = useState('')

  const currencies = useMemo(() => language === 'bn' ? [
    {
      code: 'BDT',
      name: 'Bangladeshi taka'
    },
    {
      code: 'INR',
      name: 'Indian rupee'
    }
  ] : [
    {
      code: 'INR',
      name: 'Indian rupee'
    },
    {
      code: 'BDT',
      name: 'Bangladeshi taka'
    },
  ], [language])

  const onRegister = useCallback(
    async (values: any) => {
      try {
        const fp = await FingerprintJS.load()
        const result = await fp.get()
        const params = new URLSearchParams(location.search)
        const lp = params.get("lp")
        const res = await register({
          email: values.email,
          password: values.password,
          currency: values.currency.code,
          ...getRefferalIds()
        }, { 
          guid: result.visitorId,
          promocode_name: values?.promocode,
          preferences: 'BETTING',
          lp: lp || 'https://bilbet.com/m-landings/wc23'
        })
        if (res.status === 201) {
          setError('')
          const loginRes = await login({
            email: values.email,
            password: values.password,
          })
          if (loginRes.status === 200) {
            setTokensAndRedirect(loginRes.data.access_token, loginRes.data.refresh_token, redirectRoute)
          } else {
            setError(res.data?.message || "Server error")
          }
        } else {
          setError(res.data?.message || "Server error")
        }
      } catch (e) {
        setError("Server error")
      }
    },
    [setError],
  )

  return (
    <div className={styles.registerForm}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          currency: currencies[0],
          promocode: 'wc23',
        }}
        validationSchema={yup.object({
          email: yup
            .string()
            .email(t('emailNotValid'))
            .required(t('fieldRequired')),
          password: yup
            .string()
            .min(6, t('passwordError'))
            .required(t('fieldRequired')),
          currency: yup
            .object()
            .required(t('fieldRequired')),
        })}
        onSubmit={onRegister}
      >
        {({ isSubmitting }) => {

          return (
            <Form className={styles.form} autoComplete="off">
              <div className={styles.fields}>
                <div className={styles.formTop}>
                  <div className={styles.title}>{t("registerBtn")}</div>
                  <StaticImage className={styles.image} placeholder="blurred" quality={100} src="../../images/register-img.png" alt="register-img" />

                  <div className={styles.text1}>
                    Free
                    <div>
                      Bet
                    </div>
                  </div>
                  <div className={styles.text2}>+100%</div>
                </div>
                <div className={styles.fieldWrapper}>
                  <label>{t("email")}</label>
                  <Field name="email" type="email" placeholder={t("email")} />
                </div>
                <div className={styles.fieldWrapper}>
                  <label>{t("password")}</label>
                  <Password name="password" placeholder={t("password")} />
                </div>
                <div className={styles.fieldWrapper}>
                  <label>{t("currency")}</label>
                  <SelectWC23 options={currencies} name="currency" placeholder={t("currency")} disabled={currencies.length < 2} />
                </div>
                {/* <Field name="promocode" type="text" placeholder={t("promocode")} disabled /> */}
                <button className={styles.button} type="submit" disabled={isSubmitting}>
                  {t("registerAndGetBonus")}
                </button>
                <a onClick={openRulesModal} className={styles.rulesLink}>{t("rules")}</a>
                <span className={styles.rules}>
                  {t("acceptAgreeText1")}
                  <a className={styles.link} href="https://bilbet.com/rules?ruleId=226" target="_blank">
                    {t("termsOfUse")}
                  </a>
                  {t("acceptAgreeText2")}
                  <a className={styles.link} href="https://bilbet.com/rules?ruleId=244" target="_blank">
                    {t("privacy")}
                  </a>
                  {t("acceptAgreeText3")}
                  <a className={styles.link} href="https://bilbet.com/rules?ruleId=251" target="_blank">
                    {t("cookiesPolicy")}
                  </a>
                </span>
                {error && <div className={styles.error}>{error}</div>}
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default RegisterFormWC23