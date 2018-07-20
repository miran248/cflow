export default class Progress {
  total = 0;

  value = 0;

  eta(rate) {
    const remaining = this.total - this.value;

    return Math.ceil(remaining / rate / 1000) || 0;
  }

  ratio() {
    if(!this.total)
      return 1;

    return Math.min(1, Math.max(0, this.value / this.total));
  }
}
