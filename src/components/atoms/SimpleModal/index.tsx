import React, { useState } from "react"
import classNames from "classnames"
import * as styles from './styles.module.scss'

interface SimpleModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  contentClassName?: string
  closeBtnClassName?: string
}

const SimpleModal = ({
  isOpen,
  onClose,
  children,
  contentClassName,
  closeBtnClassName,
}: SimpleModalProps) => {
  const closeHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLDivElement

    if (target.className === styles.modalBackdrop) {
      onClose()
    }
  }
  if (isOpen) {
    return (
      <div className={styles.modalBackdrop} onClick={closeHandler}>
        <div className={styles.modal}>
          <button className={classNames(styles.closeButton, closeBtnClassName)} onClick={onClose}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path d="M1 1L25 25" stroke="currentColor" strokeWidth="2" />
                <path d="M25 1L0.999999 25" stroke="currentColor" strokeWidth="2" />
              </g>
            </svg>
          </button>
          <div className={classNames(styles.modalContent, contentClassName)}>{children}</div>
        </div>
      </div>
    )
  }

  return null
}

export default SimpleModal
