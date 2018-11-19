
/* 
 * color-picker-mobile
 * karlew
 * 2018-11-19
 * v1.0
*/

function colorPickerInit() {
  $("#color_board").height($("#color_board").width());

  let colorBar = document.getElementById("color_bar");
  let colorBoard = document.getElementById("color_board");

  const barWidth = $("#color_bar").width();
  const barOffsetLeft = parseInt($("#color_bar").offset().left);
  const boardWidth = $("#color_board").width();
  const boardHeight = $("#color_board").height();
  const boardOffsetLeft = parseInt($("#color_board").offset().left);
  const boardOffsetTop = parseInt($("#color_board").offset().top);

  let [Hue, Saturation, Value] = [0, 0, 1];

  colorBar.addEventListener('touchstart',function(e) { 
    barChange(e.touches[0].clientX)
  }, false);  
  colorBar.addEventListener('touchmove',function(e) {
    barChange(e.touches[0].clientX)
  }, false);  
  colorBoard.addEventListener('touchstart',function(e) { 
    pointChange(e.touches[0].clientX,e.touches[0].clientY)
  }, false);  
  colorBoard.addEventListener('touchmove',function(e) {
    pointChange(e.touches[0].clientX,e.touches[0].clientY)
  }, false);  

  //颜色条选取变化
  function barChange(tx){
    let X = tx - barOffsetLeft;
    let leftX = X<=0 ? 0 : X>=barWidth ? barWidth : X;
    $(".color-rect").css("left", leftX+'px');
    Hue = leftX / barWidth;
    let bgColor = HSVtoRGB(Hue, 1, 1);
    $("#color_board").css("background", 'rgb('+bgColor.r+', '+bgColor.g+', '+bgColor.b+')');
    resultChange(HSVtoRGB(Hue, Saturation, Value));
  }
  //颜色板选取变化
  function pointChange(tx,ty){
    let X = tx - boardOffsetLeft;
    let leftX = X<=0 ? 0 : X>=boardWidth ? boardWidth : X;
    let Y = ty - boardOffsetTop;
    let leftY = Y<=0 ? 0 : Y>=boardHeight ? boardHeight : Y;
    $("#color_point").css({"left": leftX+'px',"top": leftY+'px'});
    Saturation = leftX / boardWidth;
    Value = 1 - leftY / boardHeight;
    resultChange(HSVtoRGB(Hue, Saturation, Value));
  }
  //整理结果
  function resultChange(resColor) {
    $("#color_result").css("background", 'rgb('+resColor.r+', '+resColor.g+', '+resColor.b+')');
    $("#color_result").css("color", 'rgb('+(255-resColor.r)+', '+(255-resColor.g)+', '+(255-resColor.b)+')');
  }
}

/* 
 * HSV颜色值转换为RGB
 * h, s, v 取值在 [0, 1] 之间
*/
function HSVtoRGB(h, s, v) {
  let r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

// rgb转十六进制颜色，如不需要可删
function colorRGB2Hex(r,g,b) {
  let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
}