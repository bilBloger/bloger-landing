import { Form, Formik } from "formik"
import { useTranslation } from "gatsby-plugin-react-i18next"
import * as React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"
import * as yup from 'yup'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

import register from "../../api/register"
import setTokensAndRedirect from "../../utils/setTokensAndRedirect"
import Field from "../atoms/Field"
import Password from "../atoms/Password"
import Select from "../atoms/Select"

import * as styles from './styles.module.scss'
import login from "../../api/login"

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

const RegisterForm = ({ currencies, redirectRoute, pageName = 'influence' }: { currencies: ICurrency[], redirectRoute?: string, pageName?: 'zeppelin' | 'influence' }) => {
  const { t } = useTranslation()

  const [error, setError] = useState('')

  const onRegister = useCallback(
    async (values: any) => {
      try {
        const fp = await FingerprintJS.load()
        const result = await fp.get()
        const res = await register({
          email: values.email,
          password: values.password,
          currency: values.currency.code,
          ...getRefferalIds()
        }, { guid: result.visitorId, promocode_name: values?.promocode })
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
          currency: {
            code: 'INR',
            name: 'Indian rupee'
          },
          promocode: pageName === 'zeppelin' ? '108FS' : 'INDIA108',
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
        {({ isSubmitting, setValues, values }) => {
          const onCurrencyChange = (val: any) => {
            if (pageName === 'zeppelin') {
              setValues({ ...values, promocode: val?.code === 'UZS' ? 'FS108' : '108FS' })
            }
          }

          return (
            <Form className={styles.form} autoComplete="off">
              <div className={styles.fields}>
                <Field name="email" type="email" placeholder={t("email")} />
                <Password name="password" placeholder={t("password")} />
                <Select options={currencies} name="currency" placeholder={t("currency")} onChange={onCurrencyChange} disabled={currencies.length < 2} />
                <Field name="promocode" type="text" placeholder={t("promocode")} disabled />
                <span className={styles.rules}>
                  {t("acceptAgreeText1")}
                  <a className={styles.link} href="https://bilbet.com/rules" target="_blank">
                    {t("termsOfUse")}
                  </a>
                  {t("acceptAgreeText2")}
                  <a className={styles.link} href="https://bilbet.com/rules" target="_blank">
                    {t("privacy")}
                  </a>
                  {t("acceptAgreeText3")}
                  <a className={styles.link} href="https://bilbet.com/rules" target="_blank">
                    {t("cookiesPolicy")}
                  </a>
                </span>
                {error && <div className={styles.error}>{error}</div>}
              </div>
              <button className={styles.button} type="submit" disabled={isSubmitting}>
                {t("register")}
              </button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default RegisterForm