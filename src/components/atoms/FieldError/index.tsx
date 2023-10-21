import cn from 'classnames'
import { ErrorMessage, Field as FormikField } from 'formik'
import React from 'react'
import { FC } from 'react'

import * as styles from './styles.module.scss'

interface IProps {
  name: string
  type?: string
  className?: string
}

const FieldError: FC<IProps> = ({ name, className }) => {
  return (
    <div className={cn(styles.error, className)}>
      <ErrorMessage name={name} />
    </div>
  )
}

export default FieldError
