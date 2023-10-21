import classNames from 'classnames'
import cn from 'classnames'
import { Field as FormikField } from 'formik'
import React, { FC } from 'react'
import FieldError from '../FieldError'

import * as styles from './styles.module.scss'

interface IProps {
  name: string
  type?: string
  className?: string
  [key: string]: any
}

const Field: FC<IProps> = ({ name, type, className, ...props }) => {
  return (
    <div className={cn(styles.field, className)}>
      <FormikField name={name} type={type} >
        {({ field, meta: { touched, error } }: any) => (
          <input className={classNames(styles.input, { [styles.invalid]: touched && error })} {...field} {...props} />
        )}
      </FormikField>
      <FieldError name={name} />
    </div>
  )
}

export default Field
