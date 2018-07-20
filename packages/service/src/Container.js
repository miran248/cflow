import Service from "./Service";

export default class Container extends Service {
  services = null;

  dependencies = {};

  constructor(key = null, dependable = false, services) {
    super(key, dependable);

    this.services = services;

    this.container = this;

    process.once("SIGTERM", this.terminate);
    process.once("SIGINT", this.terminate);
  }

  start() {
    return this.services;
  }

  register(key, value) {
    this.dependencies[key] = value;
  }

  get(key) {
    return this.dependencies[key];
  }

  async resolveDependency(key) {
    const { dependencies, owner } = this;

    const dependency = dependencies[key];

    if(!dependency) {
      if(!owner)
        return;

      return owner.container.resolveDependency(key);
    }

    await Promise.resolve(dependency.ready);

    return dependency;
  }

  run() {
    return this._start(null)
      .catch(
        (error) => {
          console.log("Container#run error", error);

          return this._stop();
        }
      );
  }

  terminate = () => Promise.resolve(this.ready)
    .then(
      () => this._stop()
    );
}
