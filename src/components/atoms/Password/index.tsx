import cn from 'classnames'
import React, { FC } from 'react'
import { ErrorMessage, Field, useField } from 'formik'
import { useState } from 'react'

import EyeButton from '../EyeButton'

import * as styles from './styles.module.scss'
import FieldError from '../FieldError'
import classNames from 'classnames'

interface IProps {
  name: string
  type?: string
  className?: string
  [key: string]: any
}

const Password: FC<IProps> = ({ name, ...props }) => {
  const [field] = useField(name)
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <div className={styles.wrapper}>
      <span className={cn(styles.passwordInput)}>
        <Field name={name} >
          {({ field, meta: { touched, error } }: any) => (
            <input className={classNames(styles.input, { [styles.invalid]: touched && error })} type={visible ? 'text' : 'password'} {...field} {...props} />
          )}
        </Field>
        <EyeButton
          isOpen={!visible}
          className={styles.eyeButton}
          onClick={() => setVisible(prevValue => !prevValue)}
        />
      </span>
      
      <FieldError name={name} />
    </div>
  )
}

export default Password
