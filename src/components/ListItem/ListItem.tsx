import styles from './ListItem.module.scss';
import clsx from 'clsx';
import {useRef} from 'react';

interface ListItemProps {
  children: string;
  disabled?: boolean;
}

export function ListItem(props: ListItemProps) {
  const {
    children,
    disabled = false
  } = props;
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      className={clsx(
        styles['ListItem'],
        {
          [styles['disabled']]: disabled
        }
      )}
    >{children}</li>
  );
}
