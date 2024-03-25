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
import {ReactNode} from 'react';


interface DropdownProps {
  /**
   * Trigger element of a dropdown
   * @param isOpen
   */
  trigger: (isOpen: boolean) => void;

  /**
   * Content of a dropdown panel.
   */
  children: ReactNode;
}

export function Dropdown() {
  // TODO implement solution
}