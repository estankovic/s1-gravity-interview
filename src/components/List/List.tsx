import {ReactNode} from 'react';
import styles from './List.module.scss';
import {KeyNavigationProvider} from '../../KeyNavigationProvider/KeyNavigationProvider.tsx';

interface ListProps {
  children: ReactNode;
}

export function List(props: ListProps) {
  const {children} = props;

  return (
    <KeyNavigationProvider>
      <ul className={styles['List']} role="menu">
        {children}
      </ul>
    </KeyNavigationProvider>

  )
}