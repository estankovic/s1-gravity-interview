import {ReactNode} from 'react';
import styles from './List.module.scss';

interface ListProps {
  children: ReactNode;
}

export function List(props: ListProps) {
  const {children} = props;

  return (
    <ul className={styles['List']}>
      {children}
    </ul>
  )
}