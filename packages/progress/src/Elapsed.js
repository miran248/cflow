export default class Elapsed {
  startTime = 0;

  tick() {
    const now = Date.now();

    if(!this.startTime)
      this.startTime = now;

    return Math.round((now - this.startTime) / 1000);
  }
}
