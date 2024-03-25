import { ListItem } from './components/ListItem/ListItem';
import {List} from './components/List/List.tsx';

import "./styles/primitives.scss";
import "./styles/colors.scss";
import "./styles/borders.scss";
import "./styles/spacing.scss";

import styles from "./App.module.scss";

import {Button} from './components/Button/Button.tsx';
import {ChevronDown} from './components/icons/ChevronDown.tsx';
import {Close} from './components/icons/Close.tsx';
import {Dropdown} from './components/Dropdown/Dropdown.tsx';

function App() {
  return (
    <div className={styles.PreviewWrapper}>
      <div>
        <h2>Task:</h2>
        <p>Your task is to implement Dropdown component. It needs to meet this requirements</p>
        <ul>
          <li>Already existing props on all components should not be changed/removed</li>
          <li>You can use already installed packages (<code>@mui/base/Popper</code>, <code>clsx</code>)</li>
          <li><code>aria-haspopup</code>, <code>aria-expanded</code>, <code>aria-controls</code> needs to be implemented on trigger element</li>
          <li><code>List</code> and <code>ListItem</code> components need to correctly implement roles indicating that there are menu items inside.</li>
          <li><strong>(Bonus)</strong> Make <code>List</code> component keyboard navigable (Ideally by <code>ArrowUp</code> and <code>ArrowDown</code> keys)</li>
          <li><strong>(Bonus 2)</strong> Make dropdown panel same width as trigger</li>
          <li><strong>(Bonus 3)</strong> Propose improvements</li>
        </ul>
      </div>
      <div className={styles.Preview}>
        <Dropdown
          trigger={(isOpen) => <Button>I am a trigger element {isOpen ? <Close/> : <ChevronDown />}</Button>}>
          <List>
            <ListItem>Option 1</ListItem>
            <ListItem disabled={true}>Option 2</ListItem>
            <ListItem>Option 3</ListItem>
            <ListItem disabled={true}>Option 4</ListItem>
            <ListItem>Option 5</ListItem>
            <ListItem>Option 6</ListItem>
          </List>
        </Dropdown>
      </div>
    </div>
  );
}

export default App;
