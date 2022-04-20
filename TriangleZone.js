class TriangleZone {
  id = null;
  index = -1;

  x = 0;
  y = 0;

  width = 1;
  height = 1;

  fillDefault = '#0f1d2b';
  fillGhost = '#f5f6ee';
  fill = '#0f1d2b';
  mutateColors = [];

  isDrawArea = false;

  direction = '';

  directions = [
    'top left',
    'top right',
    'bottom left',
    'bottom right',
  ];


  constructor ({x, y, width, height, scheme, index}) {
    this.id = getRndId();
    this.index = index;

    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.fill = scheme.fill;
    this.fillDefault = scheme.fill
    this.fillGhost = scheme.empty
    this.mutateColors = scheme.map(item => item);

    this.changeDirection();
  }

  changeDirection() {
    this.direction = rndFromArray(this.directions);
  }

  drawArea() {
    const {
      x, y,
      width, height,
      index,
      direction, directions,
      stroke: strokeColor = '',
      fill: fillColor = ''} = this;
    stroke(fillColor);
    fill(fillColor);
    rect(x, y, width, height);
  }

  drawTriangle() {
    const {
      x, y,
      width, height,
      index,
      direction, directions,
      stroke: strokeColor = '',
      fill: fillColor = ''} = this;
    let [x1, y1, x2, y2, x3, y3] = [0, 0, 0, 0, 0, 0];
    if(!directions.includes(direction)) direction = rndFromArray(directions);

    if(direction === directions[0]) [x1, y1, x2, y2, x3, y3] = [x, y, x + width, y, x, y + height];
    else if(direction === directions[1]) [x1, y1, x2, y2, x3, y3] = [x + width, y, x + width, y + height, x, y];
    else if(direction === directions[2]) [x1, y1, x2, y2, x3, y3] = [x + width, y + height, x, y + height, x + width, y];
    else if(direction === directions[3]) [x1, y1, x2, y2, x3, y3] = [x, y + height, x, y, x + width, y + height];
    stroke(fillColor);
    fill(fillColor);
    if(this.isDrawArea) this.drawArea();
    else triangle(x1, y1, x2, y2, x3, y3);
  }

  drawIndex() {
    const {x, y, width, height, index} = this;
    textSize(32);
    text(index, x+(width / 2), y + (height / 2));
  }

  mutate() {
    if(rndRarity(1, 20)) this.fill = rndFromArray(this.mutateColors);
    if(rndRarity(1, 10)) this.fill = this.fillDefault;

    if(rndRarity(1, 40)) this.fill = this.fillGhost;

    if(rndRarity(1, 20)) this.isDrawArea = true;

    if(rndRarity(1, 10)) this.isDrawArea = false;

    if(rndRarity(1, 150)) this.changeDirection();
  }

  render() {
    if(rndRarity(1, 100)) this.mutate();
    this.drawTriangle();
    // this.drawIndex();
  }

}
