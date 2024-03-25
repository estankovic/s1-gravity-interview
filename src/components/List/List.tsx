import {ReactNode} from 'react';
import styles from './List.module.scss';

interface ListProps {
  children: ReactNode;
}

export function List(props: ListProps) {
  return (
    <ul className={styles['List']}>
      {props.children}
    </ul>
  )
}