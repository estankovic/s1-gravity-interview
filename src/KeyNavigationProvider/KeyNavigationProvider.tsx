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
import {KeyNavigationController} from './NavigationController.ts';


const KeyNavigationContext = createContext<{
  controller: KeyNavigationController,
  currentItemUID: string | undefined | null
} | null>(null);


/**
 * Creates KeyNavigation context, allowing navigating by ArrowUp and ArrowDown keys
 * @param props
 */
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


/**
 * Returns context of KeyNavigation provider
 */
export function useKeyNavigation() {
  const context = useContext(KeyNavigationContext);
  if (!context) {
    throw new Error('useKeyNavigation must be used within KeyNavigationProvider');
  }

  return context;
}

/**
 * Used to register component in navigation context.
 *
 * Returns HTML attributes needed for navigation.
 * @param params
 */
export function useNavigatableItem(params: {skip: boolean, ref: RefObject<HTMLElement>}) {
  const {skip, ref} = params;
  const navigation = useKeyNavigation();
  const uid = useId();

  useEffect(() => {
    navigation.controller.register(uid, ref, skip)
  }, [navigation.controller, uid, ref, skip])

  return navigation.controller.getItemHTMLProps(uid);
}


