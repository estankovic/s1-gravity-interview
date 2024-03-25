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

export function Dropdown(props: DropdownProps): ReactElement {

  return (
    <em>todo: Implement me in the code editor</em>
  );
}