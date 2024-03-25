import styles from './ListItem.module.scss';
import clsx from 'clsx';
import {useEffect} from 'react';

interface ListItemProps {
  children: string;
  disabled?: boolean;
}

export function ListItem(props: ListItemProps) {
  const {
    children,
    disabled = false
  } = props;

  return (
    <li
      className={clsx(
        styles['ListItem'],
        {
          [styles['disabled']]: disabled
        }
      )}
    >{children}</li>
  )
    ;
}
