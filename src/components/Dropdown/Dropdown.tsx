/**
 * Task:
 * Task is to develop an dropdown component with following requirements
 * - Use existing components if possible
 * - Use existing CSS tokens (design is up to you as it is nto primary concern)
 * - Have accessibility in mind
 *  - implement needed aria labels
 *  - implement correct roles
 * - User should be able to navigate using ArrowUp and ArrowDown keys in the list.
 * - Developer should be able to provide its own trigger element
 * - API is up to you, as there are no known restrictions
 */
import { Popper } from '@mui/base';
import {cloneElement, MouseEventHandler, ReactElement, useCallback, useRef, useState} from 'react';

import styles from './Dropdown.module.scss';


interface DropdownProps {
  /**
   * Trigger element of a dropdown
   * @param isOpen
   */
  trigger: (isOpen: boolean) => ReactElement;

  /**
   * Content of a dropdown panel.
   */
  children: ReactElement;
}

export function Dropdown(props: DropdownProps) {
  const {trigger, children} = props;

  const anchorRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false)

  const handleTriggerClick = useCallback<MouseEventHandler>(() => {
    setOpen((value) => !value);
  }, [])

  return (
    <>
      {cloneElement(trigger(open), {
        ref: anchorRef,
        onClick: handleTriggerClick,
      })}
      <Popper open={open} anchorEl={anchorRef.current}>
        <div className={styles['Panel']}>{children}</div>
      </Popper>
    </>
  );
}