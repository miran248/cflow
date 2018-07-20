import decorate, {
  get, Linkable, Recyclable,
} from "@cflow/decorators";

export default class LinkedList {
  head = null;

  tail = null;

  count = 0;

  constructor() {
    decorate(this, [
      new Linkable(),
      new Recyclable(() => {
        let node = null;

        while(this.head) {
          node = this.detachHead();

          get(node, Recyclable).recycle();
        }
      }),
    ]);
  }

  isEmpty() {
    return !this.head;
  }

  attach(item) {
    const itemLink = get(item, Linkable);

    itemLink.parent = this;
    itemLink.prev = this.tail;

    if(!this.head)
      this.head = item;

    if(this.tail)
      get(this.tail, Linkable).next = item;

    this.tail = item;

    ++this.count;

    return item;
  }

  attachBefore(item, target) {
    const itemLink = get(item, Linkable);
    const targetLink = get(target, Linkable);

    itemLink.parent = this;
    itemLink.next = target;
    itemLink.prev = targetLink.prev;
    targetLink.prev = item;

    if(!itemLink.prev)
      this.head = item;
    else
      get(itemLink.prev, Linkable).next = item;

    ++this.count;

    return item;
  }

  attachAfter(item, target) {
    const itemLink = get(item, Linkable);
    const targetLink = get(target, Linkable);

    itemLink.parent = this;
    itemLink.prev = target;
    itemLink.next = targetLink.next;
    targetLink.next = item;

    if(!itemLink.next)
      this.tail = item;
    else
      get(itemLink.next, Linkable).prev = item;

    ++this.count;

    return item;
  }

  detachTail() {
    const item = this.tail;

    const itemLink = get(item, Linkable);
    this.tail = itemLink.prev;
    itemLink.prev = null;
    itemLink.parent = null;

    if(this.tail)
      get(this.tail, Linkable).next = null;
    else
      this.head = null;

    --this.count;

    return item;
  }

  detachHead() {
    const item = this.head;

    const itemLink = get(item, Linkable);
    this.head = itemLink.next;
    itemLink.next = null;
    itemLink.parent = null;

    if(this.head)
      get(this.head, Linkable).prev = null;
    else
      this.tail = null;

    --this.count;

    return item;
  }

  detach(item) {
    const itemLink = get(item, Linkable);

    if(itemLink.prev)
      get(itemLink.prev, Linkable).next = itemLink.next;
    else
      this.head = itemLink.next;

    if(itemLink.next)
      get(itemLink.next, Linkable).prev = itemLink.prev;
    else
      this.tail = itemLink.prev;

    itemLink.prev = null;
    itemLink.next = null;
    itemLink.parent = null;

    --this.count;

    return item;
  }

  // [Symbol.iterator]() {
  //   var item = this.head;
  //
  //   return {
  //     next() {
  //       return {
  //         value: item,
  //         done: !item || !(item = get(item, Linkable).next),
  //       };
  //     },
  //   };
  // }
}
