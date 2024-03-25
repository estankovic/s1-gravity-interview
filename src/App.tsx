import { ListItem } from './components/ListItem/ListItem';
import {List} from './components/List/List.tsx';

import "./styles/primitives.scss";
import "./styles/colors.scss";
import "./styles/borders.scss";
import "./styles/spacing.scss";

function App() {
  return (
    <>
      <div>
        <List>
          <ListItem>Option 1</ListItem>
          <ListItem disabled={true}>Option 2</ListItem>
          <ListItem>Option 2</ListItem>
        </List>
      </div>
    </>
  );
}

export default App;
