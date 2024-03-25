import {RefObject} from 'react';

interface TrackedItem {
  uid: string | undefined;
  ref: RefObject<HTMLElement>;
  skip: boolean;
}

export class KeyNavigationController {
  readonly itemsMap: Record<string, TrackedItem> = {};

  private get items() {
    return Object.keys(this.itemsMap).map(key => this.itemsMap[key]);
  }


  /**
   * Register an item using its uid.
   * @param uid
   * @param ref
   * @param skip
   */
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

  /**
   * Focuses next focusable item in the list
   * @param currentUid Current item uid
   * @returns newly focused uid
   */
  focusNext(currentUid: string) {
    const currentIndex = this.currentIndex(currentUid);
    const nextItem = this.nextSelectableItem(currentIndex);
    nextItem?.ref.current?.focus();

    return nextItem?.uid;
  }

  /**
   * Focuses previous focusable item in the list
   * @param currentUid Current item uid
   * @returns newly focused uid
   */
  focusPrevious(currentUid: string) {
    const currentIndex = this.currentIndex(currentUid);
    const nextItem = this.prevSelectableItem(currentIndex);
    nextItem?.ref.current?.focus();

    return nextItem?.uid;
  }

  /**
   * initialise focus on first focusable element
   */
  initFocus() {
    const nextItem = this.firstSelectableItem();
    nextItem?.ref.current?.focus();
    return nextItem?.uid;
  }

  /**
   * Returns HTML attributes for given element
   * @param uid
   */
  getItemHTMLProps(uid: string) {
    const currentItem: TrackedItem | undefined = this.itemsMap[uid];
    const isCurrentItem = document.activeElement === currentItem?.ref?.current || false;

    return {
      tabIndex: isCurrentItem ? 0 : -1,
      id: uid
    }
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
}
