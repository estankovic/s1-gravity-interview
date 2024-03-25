import {ReactNode} from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  /**
   * Content of a button
   */
  children: ReactNode;

  /**
   * If true, button is disabled
   */
  disabled?: boolean;
}

export function Button(props: ButtonProps) {
  const {children, disabled, ...restProps} = props;
  return (
    <button
      className={styles.Button}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
