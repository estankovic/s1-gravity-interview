import {
  ReactElement,
} from 'react';


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

  return (
    <em>Todo: implement me</em>
  );
}