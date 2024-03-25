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
      <div className={styles.Preview}>
        <Dropdown
          trigger={(isOpen) => <Button>Hello {isOpen ? <Close/> : <ChevronDown />}</Button>}>
          <List>
            <ListItem>Option 1</ListItem>
            <ListItem disabled={true}>Option 2</ListItem>
            <ListItem>Option 3</ListItem>
            <ListItem disabled={true}>Option 4</ListItem>
            <ListItem>Option 5</ListItem>
            <ListItem>Option 6</ListItem>
          </List>
        </Dropdown>

        <Dropdown
          trigger={(isOpen) => <Button>Hello 2 {isOpen ? <Close/> : <ChevronDown />}</Button>}>
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
