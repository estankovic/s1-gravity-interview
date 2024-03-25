import {forwardRef, ReactNode} from 'react';

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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
  const {children, disabled, ...restProps} = props;
  return (
    <button
      ref={forwardedRef}
      className={styles.Button}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  )
});
