export default class Eta {
  buffer = [];

  samples = 10;

  reset() {
    this.buffer = [];
  }

  sample(value) {
    this.buffer.push({
      time: Date.now(),
      value,
    });
  }

  rate() {
    const l = this.buffer.length;
    const k = Math.min(this.samples, l);

    const a = this.buffer[l - 1];
    const b = this.buffer[l - k];

    this.buffer = this.buffer.slice(-this.samples);

    const time = a.time - b.time;
    const value = a.value - b.value;

    return value / time;
  }
}
