class Grid {
  id = null;

  x = 0;
  y = 0;

  width = 1;
  height = 1;

  scheme = null;

  q = 1;

  elements = [];

  constructor ({x, y, width, height, q, scheme}) {
    this.id = getRndId();

    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.scheme = scheme;

    this.q = q;

    this.createElements();
  }

  createElements() {
    const { q, x, width, height, scheme } = this;
    this.elements = [];
    const widthTriangle = width / q;
    const heightTriangle = height / q;
    const getX = index => x + ((index % q) * widthTriangle);
    const getY = index => y + (Math.floor(index / q) * heightTriangle);
    for (let i = 0; i < q * q; i++) this.elements.push( new TriangleZone({
      index: i,
      x: getX(i),
      y: getY(i),
      width: widthTriangle,
      height: heightTriangle,
      scheme
    }));
  }

  mutate({ q = null, scheme = null }) {
    if(q !== null) this.q = q;
    if(scheme !== null) this.scheme = scheme;
    this.createElements();
  }

  draw() {
    for (let element of this.elements) element.render();
  }

  render() {
    this.draw();
  }

}
