import React, {ReactNode, useRef} from 'react';
import styles from './List.module.scss';
import {KeyNavigationProvider} from '../../KeyNavigationProvider/KeyNavigationProvider.tsx';

interface ListProps {
  children: ReactNode;
}

export function List(props: ListProps) {


  return (
    <KeyNavigationProvider>
      <ul className={styles['List']}>
        {props.children}
      </ul>
    </KeyNavigationProvider>

  )
}