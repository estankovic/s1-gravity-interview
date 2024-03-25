import {
  cloneElement,
  createContext, KeyboardEventHandler, ReactElement,
  RefObject, useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef, useState
} from 'react';


interface TrackedItem {
  uid: string | undefined;
  ref: RefObject<HTMLElement>;
  skip: boolean;
}

class KeyNavigationController {
  readonly itemsMap: Record<string, TrackedItem> = {};

  private get items() {
    return Object.keys(this.itemsMap).map(key => this.itemsMap[key]);
  }


  register(uid: string |undefined, ref: RefObject<HTMLElement>, skip: boolean ) {
    if (!uid) {
      return;
    }
    this.itemsMap[uid] = {
      uid,
      ref,
      skip
    }
  }

  focusNext(currentItem: string) {
    const currentIndex = this.currentIndex(currentItem);
    const nextItem = this.nextSelectableItem(currentIndex);
    nextItem?.ref.current?.focus();

    return nextItem?.uid;
  }

  focusPrevious(currentItem: string) {
    const currentIndex = this.currentIndex(currentItem);
    const nextItem = this.prevSelectableItem(currentIndex);
    nextItem?.ref.current?.focus();

    return nextItem?.uid;
  }

  initFocus() {
    const nextItem = this.firstSelectableItem();
    nextItem?.ref.current?.focus();
    return nextItem?.uid;
  }


  private firstSelectableItem() {
    return this.items.filter((item) => !item.skip)?.[0];
  }

  private lastSelectableItem() {
    const arr = this.items.filter((item) => !item.skip);
    return arr?.[arr.length - 1];
  }

  private nextSelectableItem(currentIndex: number) {
    const nextItems = this.items.slice(currentIndex + 1);
    const nextItem = nextItems.filter((item) => !item.skip)?.[0];

    if (!nextItem) {
      return this.firstSelectableItem();
    }
    return nextItem;
  }

  private prevSelectableItem(currentIndex: number) {
    const nextItems = this.items.slice(0, currentIndex);
    const filteredItems = nextItems.filter((item) => !item.skip);
    const nextItem = filteredItems?.[filteredItems.length - 1];

    if (!nextItem) {
      return this.lastSelectableItem();
    }
    return nextItem;
  }

  private currentIndex(uid: string) {
    return this.items.findIndex((item) => { return uid === item.uid; });
  }

  getItemHTMLProps(uid: string) {
    const currentItem: TrackedItem | undefined = this.itemsMap[uid];
    const isCurrentItem = document.activeElement === currentItem?.ref?.current || false;

    return {
      tabIndex: isCurrentItem ? 0 : -1
    }
  }
}


const KeyNavigationContext = createContext<{
  controller: KeyNavigationController,
  currentItemUID: string | undefined | null
} | null>(null);


export const KeyNavigationProvider = (props: {children: ReactElement}) => {
  const controller = useRef(new KeyNavigationController);
  const [currentItemUID, setCurentItemUID] = useState<string | null>();

  const keyboardHandler = useCallback<KeyboardEventHandler>((event) => {
    if (!currentItemUID) {
      return;
    }

    if (event.key === 'ArrowUp') {
      const nextItemUID = controller.current.focusPrevious(currentItemUID)!;
      setCurentItemUID(nextItemUID);
      event.preventDefault();
      return;
    }
    if (event.key === 'ArrowDown') {
      const nextItemUID = controller.current.focusNext(currentItemUID)!;
      setCurentItemUID(nextItemUID);
      event.preventDefault();
      return;
    }
  }, [controller, currentItemUID])


  useLayoutEffect(() => {
    const uid = controller.current.initFocus()!;
    setCurentItemUID(uid);
  }, [])

  return (
    <KeyNavigationContext.Provider
     value={{
       controller: controller.current,
       currentItemUID: currentItemUID
     }}
    >{cloneElement(props.children,{
      onKeyDown: keyboardHandler
    })}</KeyNavigationContext.Provider>
  )
}

export function useKeyNavigation() {
  const context = useContext(KeyNavigationContext);
  if (!context) {
    throw new Error('useKeyNavigation must be used within KeyNavigationProvider');
  }

  return context;
}


export function useNavigatableItem(params: {skip: boolean, ref: RefObject<HTMLElement>}) {
  const {skip, ref} = params;
  const navigation = useKeyNavigation();
  const uid = useId();

  useEffect(() => {
    navigation.controller.register(uid, ref, skip)
  }, [navigation.controller, uid, ref, skip])

  return navigation.controller.getItemHTMLProps(uid);
}



