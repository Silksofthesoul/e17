const testCrossingLines = (seg1, seg2) => {
  let { x1: ax1, x2: ax2, y1: ay1, y2: ay2 } = seg1;
  let { x1: bx1, x2: bx2, y1: by1, y2: by2 } = seg2;

  let isCrossed = false;
  let isTouched = false;
  let isEqual = false;
  let isLying = false;

  let isHorizontal = false;
  let isVerical = false;

  let isExeptSn = false;
  let isExeptBy = false;

  let cmpX = (ax2 - ax1);
  let cmpY = (ay2 - ay1);

  let q = 0;
  let sn = 0;
  let fn = 0;
  let n = 0;

  if(cmpY != 0) {
    q = cmpX / (ay1 - ay2);
    sn = (bx1 - bx2) + (by1 - by2) * q;
    if(!sn) isExeptSn = true;
    fn = (bx1 - ax1) + (by1 - ay1) * q;
    n =  fn / sn;
  } else {
    if(!(by1 - by2)) isExeptBy = true;
    n = (by1 - ay1) / (by1 - by2);
  }


  // console.log(n, fn, sn);
  // console.log(n, fn, sn, q);
  let dX = bx1 + (bx2 - bx1) * n;
  let dY = by1 + (by2 - by1) * n;

  if(
    [
      [ ay1 === ay2 ].every(itm => !!itm),
      [ by1 === by2 ].every(itm => !!itm)
    ].some(itm => !!itm)
  ) { isHorizontal = true;}
  if(
    [
      [ ax1 === ax2 ].every(itm => !!itm),
      [ bx1 === bx2 ].every(itm => !!itm)
    ].some(itm => !!itm)
  ) { isVerical = true;}



  if(
    [
      [ ax1 === bx1, ay1 === by1, ax2 === bx2, ay2 === by2 ].every(itm => !!itm),
      [ ax1 === bx2, ay1 === by2, ax2 === bx1, ay2 === by1 ].every(itm => !!itm)
    ].some(itm => !!itm)
  ) { isEqual = true;}

  if(
    [
      inRange(dX, [min(ax1, ax2), max(ax1, ax2)], false),
      inRange(dX, [min(bx1, bx2), max(bx1, bx2)], false),
      inRange(dY, [min(ay1, ay2), max(ay1, ay2)], false),
      inRange(dY, [min(by1, by2), max(by1, by2)], false),
    ].every(itm => !!itm)
  ) { isCrossed = true; }

  if(
    [
      inRange(dX, [min(ax1, ax2), max(ax1, ax2)], true),
      inRange(dX, [min(bx1, bx2), max(bx1, bx2)], true),
      inRange(dY, [min(ay1, ay2), max(ay1, ay2)], true),
      inRange(dY, [min(by1, by2), max(by1, by2)], true),
    ].every(itm => !!itm)
  ) { isTouched = true; }

  if(isExeptSn && isVerical) {
    dX = bx1;
    dY = min(max(ay1, by1), max(ay2, by2) );
    if(
      [
        inRange(dY, [min(ay1, ay2), max(ay1, ay2)], true),
        inRange(dY, [min(by1, by2), max(by1, by2)], true),
      ].every(itm => !!itm)
    ) { isLying = true; }
  }
  if(isExeptBy && isHorizontal) {
    dY = by1;
    dX = min(max(ax1, bx1), max(ax2, bx2) );
    if(
      [
        inRange(dX, [min(ax1, ax2), max(ax1, ax2)], true),
        inRange(dX, [min(bx1, bx2), max(bx1, bx2)], true),
      ].every(itm => !!itm)
    ) { isLying = true; }
  }

  return {
    dX,
    dY,
    isCrossed,
    isTouched,
    isLying,
    isEqual,
    isExeptSn,
    isExeptBy,
    isHorizontal,
    isVerical
  };
};

window.testCrossingLines = testCrossingLines;

const getRelativeLine = ({ x, y, deg, length}) => {
  let x2 = floor(x + gx(length, deg));
  let y2 = floor(y + gy(length, deg));
  return { x1: x, y1: y, x2, y2, };
};

const gx = (len, deg) => (len * sin((-deg + 180) * PI / 180) / len) * len;
const gy = (len, deg) => (len * cos((deg + 180) * PI / 180) / len) * len;

// Converts from degrees to radians.
const deg2rad = deg => deg * PI / 180;

// Converts from radians to degrees.
const rad2deg = rad => rad * 180 / PI;

const getDegByPoints = (x1, y1, x2, y2) => {
  let v = y2 - y1;
  let h = x2 - x1;
  return rad2deg(atan2(v, h));
};


const degGuard = deg => deg % 360;

const ratio = (a = 1, b = 1, c = 1) => a * c / b; // ??
