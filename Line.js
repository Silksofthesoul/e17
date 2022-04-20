class Line {
  constructor () { }
  test() {
    const getLine = ({x1, y1, x2, y2}) => ([x1, y1, x2, y2]);
    const getStroke = ({stroke}) => stroke;
    const _seg = (x1, y1, x2, y2, stroke = 'rgb(0, 0, 0)') => ({x1, y1, x2, y2, stroke});
    let l1 = _seg(100, 300, 150, 300, 'rgb(0, 0, 255)');
    let l2 = _seg(90, 300, 95, 300, 'rgb(0, 255, 0)');
      // { x1: 1018, y1: 652, x2: 968, y2: 652 },
      // { x1: 1034, y1: 639, x2: 984, y2: 639 }

    let l3 = _seg(500, 532, 640, 300, 'rgb(0,0,255)');
    let l4 = _seg(500, 400, 640, 567);

    const t1 = testCrossingLines(l1, l2);
    const t2 = testCrossingLines(l3, l4);

    const lines = [l1, l2, l3, l4];

    console.log(t1);
    // console.log(t1.isCrossed, t1.isTouched, t1.isEqual);


    if(t1.isCrossed || t1.isEqual) {
      strokeWeight(10);
      stroke('rgba(255, 0, 255, 1)');
      point(t1.dX, t1.dY);
      stroke('rgba(255, 0, 0, 1)');
      point(t2.dX, t2.dY);
      strokeWeight(1);
    } else {
      strokeWeight(10);
      stroke('rgba(0, 0, 255, 1)');
      point(t1.dX, t1.dY);
      stroke('rgba(0, 127, 0, 1)');
      point(t2.dX, t2.dY);
      strokeWeight(1);
    }

    for (var l of lines) {
      stroke(getStroke(l));
      line(...getLine(l));
    }
  }

  render() {
    this.test();
  }

}
