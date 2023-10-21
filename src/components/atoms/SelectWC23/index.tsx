import { useField } from 'formik'
import ReactSelect, { components } from 'react-select'
import React, { FC } from 'react'

import * as styles from './styles.module.scss'
import FieldError from '../FieldError'

const Control = (props: any) => {
  return <components.Control id="currencySelector" className={styles.select} {...props} />
}

const Option = (props: any) => {
  const {
    data: { code, name },
  } = props
  return (
    <components.Option className={styles.option} {...props}>
      <div className={styles.option}>
        {code} ({name})
      </div>
    </components.Option>
  )
}

const ValueContainer = (props: any) => {
  return <components.ValueContainer {...props} className={styles.value_container} />
}

const DropdownIndicator = (
  props: any
) => {
  return (
    <components.DropdownIndicator {...props} className={styles.dropdown} />
  );
};

const SingleValue = (props: any) => {
  const { data } = props
  const { code, name } = data
  return (
    <components.SingleValue className={styles.single_value} {...props}>
      <div className={styles.option}>
        {code} ({name})
      </div>
    </components.SingleValue>
  )
}

const SelectWC23 = ({ name, options, placeholder, disabled, onChange }: any) => {
  const [field, meta, helpers] = useField(name)
  const { value } = field
  const onHandleChange = (val: any) => {
    onChange && onChange(val)
    helpers.setValue(val)
  }

  return (
    <div className={styles.wrapper}>
      <ReactSelect
        styles={{
          control: (base, state) => ({
            ...base,
            outline: 'none',
            boxShadow: `none`,
            cursor: 'pointer',
          }),
          option:(base, state) => ({
            ...base,
            background: '#fff',
            boxShadow: `none`,
          }),
        }}
        className={styles.react_select}
        value={value}
        components={{ SingleValue, Control, Option, ValueContainer, DropdownIndicator, IndicatorSeparator: () => null }}
        onChange={onHandleChange}
        name={name}
        isSearchable={false}
        placeholder={placeholder}
        options={options}
        isDisabled={disabled}
      />
      <FieldError name={name} />
    </div>
  )
}

export default SelectWC23
