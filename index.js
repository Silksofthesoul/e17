const elMain = document.body;
let fr = 60;
let widthViewer = elMain.offsetWidth || 640;
let heightViewer = elMain.offsetHeight || 640;

let size = min(widthViewer, heightViewer);

let width = int(size) - int(size / 4);
let height = int(size) - int(size / 4);

let x = (widthViewer - width) / 2;
let y = (heightViewer - height) / 2;

let slowDown = (fc, fr, fn) => {
  if(fc >= fr) return (fn(), true);
  return false;
};

let scene = new Scene({
  x, y,
  width, height,
  isShowGrid: true,
  isShowBorder: true,
  isShowBg: true
});

const setColorScheme = (bgFill, bgEmpty, ...clrs) => {
  let res = [...clrs];
  res.fill = bgFill;
  res.empty = bgEmpty;

  let {r, g, b} = hexToRgb(bgEmpty);
  res.erase = `rgba(${r}, ${g}, ${b}, 0.7)`;
  return res;
}
const colorSchemes = [
  setColorScheme(...'#0f1d2b #f5f6ee #17456b #419fb7 #ffb028'.split(' ')),
  setColorScheme(...'#FF8D10 #E61907 #E114FC #1607E6 #08B9FF'.split(' ')),
  setColorScheme(...'#FFFFFF #B4BEC9 #159A9C #002333 #DEEFE7'.split(' ')),
  setColorScheme(...'#025259 #007172 #F29325 #D94F04 #F4E2DE'.split(' ')),
  setColorScheme(...'#F2C3A7 #212626 #F2C849 #F2BF5E #F2B279'.split(' ')),
  setColorScheme(...'#A6A6A6 #F2F2F2 #A67356 #736766 #D9D9D9'.split(' ')),
  setColorScheme(...'#FFA8BE #FFE8A8 #B1FF8A #B5FFFF #C1B3FF'.split(' ')),
  setColorScheme(...'#BF920A #262626 #A67C2E #735827 #594431'.split(' ')),
  setColorScheme(...'#0D0D0D #F28599 #A0D9BE #F2DCC2 #F2EDE9'.split(' ')),
  setColorScheme(...'#401E24 #7E7B8C #F29C50 #F2884B #8C5845'.split(' ')),
  setColorScheme(...'#404040 #0D0D0D #F2F2F2 #D9D9D9 #737373'.split(' ')),
  setColorScheme(...'#04ADBF #F2B705 #0339A6 #F28705 #F23C13'.split(' ')),
  setColorScheme(...'#F2EC9B #F2C791 #F2DEA2 #8C7C6D #A69485'.split(' ')),
  setColorScheme(...'#FF00FF #FFFF00 #A624A6 #262626 #F24B27'.split(' ')),
  setColorScheme(...'#C7D9D7 #273D40 #567073 #8AA3A6 #AABFBF'.split(' ')),
  setColorScheme(...'#660373 #D9048E #F2778D #F24B88 #F28A80'.split(' ')),
  setColorScheme(...'#FFB522 #FFE759 #154C5E #E47112 #FFE695'.split(' ')),
  setColorScheme(...'#F2CB07 #6F6E73 #F2B807 #212E37 #F2F2F2'.split(' ')),
  setColorScheme(...'#F0F0F2 #F24405 #71A66F #D9AB82 #F27F3D'.split(' ')),
  setColorScheme(...'#F21B07 #8DF0F2 #F2E530 #F2C029 #73B487'.split(' ')),
  setColorScheme(...'#F27ECA #F2D544 #F2DE79 #F2AB6D #F25E5E'.split(' ')),
  setColorScheme(...'#F2D64B #049DD9 #04B2D9 #F2E205 #F2DE79'.split(' ')),
  setColorScheme(...'#FC6274 #E359AE #F16EFA #B559E3 #9D62FC'.split(' ')),
  setColorScheme(...'#0442BF #F20505 #03A65A #F2CB05 #F27405'.split(' ')),
  setColorScheme(...'#3B3C40 #F5E1DF #B4BABF #E6E4DD #DDDCE1'.split(' ')),
  setColorScheme(...'#AF030A #000003 #840000 #73020C #480004'.split(' ')),
  setColorScheme(...'#025373 #F25C69 #F2D785 #F2B33D #F2E1C2'.split(' ')),
  setColorScheme(...'#F2B705 #F29F05 #F28705 #BF5B04 #59310E'.split(' ')),
];

let currentScheme = rndFromArray(colorSchemes);
let grid = new Grid({
  x,
  y,
  width,
  height,
  q: 1,
  scheme: currentScheme
});

function setup() {
  createCanvas(widthViewer, heightViewer);
  frameRate(fr);
}


let c = 0;
let m = rndMinMaxInt(50, 150);
let q = 1;
qDirection = 1;


function draw() {
  background(currentScheme.erase);
  grid.render();
  if(++c > m) {
    c=0;
    if(q > rndMinMaxInt(15, 30)) qDirection = -1;
    if(q < rndMinMaxInt(1, 5)) qDirection = 1;
    q += qDirection;
    m = rndMinMaxInt(50, 350);
    grid.mutate({ q });
  }
  // if(rndRarity(1, 512)) grid.mutate({q: rndMinMaxInt(2, 60)});

  if(rndRarity(1, 2048)) {
    currentScheme = rndFromArray(colorSchemes);
    grid.mutate({scheme: currentScheme});
  }
}
