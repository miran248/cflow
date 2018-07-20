import Progress from "./Progress";

function defaultStyle(complete, incomplete) {
  return complete + incomplete;
}

export default class AsciiProgress extends Progress {
  width = 20;

  style = defaultStyle;

  incomplete = "▫";

  complete = "▪";

  render() {
    const incomplete = Array(this.width + 1).join(this.incomplete);
    const complete = Array(this.width + 1).join(this.complete);

    const position = Math.floor(this.ratio() * this.width);

    return this.style(
      complete.slice(0, position * this.complete.length),
      incomplete.slice(position * this.incomplete.length)
    );
  }
}
