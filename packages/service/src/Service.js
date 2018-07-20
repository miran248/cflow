import EventEmitter from "events";

import chalk from "chalk";

const frames = [ "⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏" ]
  , n = frames.length;

// "◝", "◞", "◟", "◜"

function spinner() {
  let i = 0;

  return () => frames[i = (i + 1) % n];
}

const green = chalk.hex("#67EF45");
const red = chalk.hex("#EF6745");

export default class Service {
  key = null;

  dependable = false;

  events = null;

  container = null;

  nestedServices = [];

  statusCode = 0;

  ready = null;

  spinner = null;

  constructor(key = null, dependable = false) {
    this.key = key;
    this.dependable = dependable;

    this.events = new EventEmitter();

    this.spinner = spinner();

    // const self = this;
    //
    // return new Proxy(this, {
    //   get: (target, key, receiver) => {
    //     if(typeof key !== "string"
    //     || key in target)
    //       return Reflect.get(target, key, target); // return target[key];
    //
    //     return Reflect.get(self.nestedServices, key, self.nestedServices); // return self.nestedServices[key];
    //   }
    // });
  }

  _owner = null;

  get owner() {
    return this._owner;
  }

  set owner(value) {
    this._owner = value;

    this.container = value.container;
  }

  requirements() {
    return [];
  }

  start() {
    return null;
  }

  started() {}

  stop() {}

  status() {
    return [];
  }

  // TODO: Remove me!
  serialize(selector, options) {
    return null;
  }

  async startAction(owner) {
    if(owner)
      this.owner = owner;

    if(this.dependable && this.key)
      this.container.register(this.key, this);

    this.events.on("stopItem", this.stopItem);

    const dependencies = await this.resolveDependencies();

    this.statusCode = 1;

    this.nestedServices = await this.start(dependencies) || [];

    await this.startItems();

    this.statusCode = 2;

    await this.started(dependencies);
  }

  _start(owner) {
    return this.ready = this.startAction(owner);
  }

  async _stop() {
    this.ready = null;

    this.statusCode = 3;

    this.events.removeAllListeners();

    await this.stopItems();

    await this.stop();

    this.statusCode = 4;
  }

  _status = () => [
    ...this.status().map(
      (status) => {
        if(this.statusCode == 0)
          return `${green("●")} ${status}`;

        if(this.statusCode == 1)
          return `${green(this.spinner())} ${status}`;

        if(this.statusCode == 2)
          return `${green("✔")} ${status}`;

        if(this.statusCode == 3)
          return `${red(this.spinner())} ${status}`;

        if(this.statusCode == 4)
          return `${red("●")} ${status}`;
      }
    ),

    ...this.statusItems().map(
      (status) => ` ${status}`
    ),
  ];

  async startItems() {
    const items = this.nestedServices;

    await Promise.all(
      items.map(
        (item) => item._start(this)
      )
    );
  }

  async stopItems() {
    const items = this.nestedServices;

    let item = null;

    while(item = items.pop())
      await item._stop();
  }

  statusItems() {
    const items = this.nestedServices;

    return items.reduce(
      (memo, item) => [ ...memo, ...item._status() ],
      []
    );
  }

  startItem = async(item) => {
    const items = this.nestedServices;

    items.push(item);

    await item._start(this);

    return item;
  };

  stopItem = async(item) => {
    const items = this.nestedServices;

    const index = items.indexOf(item);

    if(index < 0)
      return;

    items.splice(index, 1);

    await item._stop();

    return item;
  };

  async resolveDependencies() {
    const requirements = this.requirements();

    const dependencies = {};

    await Promise.all(
      requirements.map(
        (requirement) => this.container
          .resolveDependency(requirement)
          .then(
            (dependency) => dependencies[requirement] = dependency
          )
      )
    );

    return dependencies;
  }

  at(index) {
    return this.nestedServices[index];
  }

  get(key) {
    return this.container.get(key);
  }

  stopSelf = () => this.owner.notify("stopItem", this);

  notify = (event, payload) => this.events.emit(event, payload);

  // [Symbol.iterator]() { return this.nestedServices; }
}
