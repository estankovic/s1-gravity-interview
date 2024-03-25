import styles from './ListItem.module.scss';

interface ListItemProps {
  children: string;
}

export function ListItem(props: ListItemProps) {
  return <li className={styles['ListItem']}>{props.children}</li>;
}
