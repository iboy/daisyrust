!function(){
  
  function e(e,t) {
    var s;
    for (s in t) t.hasOwnProperty(s)&&(e[s]=t[s]); return e;
  }
  this.cdsSpritePlayer= function() {
    function t() { p.spritesheetXpos ==s.cellCols?(p.spritesheetXpos=1,p.spritesheetYpos=p.spritesheetYpos==s.cellRows?1:p.spritesheetYpos+1):p.spritesheetXpos+=1;
      var e={ x:(p.spritesheetXpos-1)*p.cellWidth*-1, y:(p.spritesheetYpos-1)*p.cellHeight*-1};
      p.steamElement.style.backgroundPosition = e.x + "px " + e.y + "px", s.debug&&(document.getElementById("debug").innerHTML=
      "col ="+p.spritesheetXpos+
      "<br>row = "+p.spritesheetYpos+
      "<br>speed= "+p.speed+" ("+s.fps+"fps)")}
      var s={fps:12,spriteID:"cdsSprite",cellCols:4, cellRows:4, debug:!1};
      arguments[0]&&"object"==typeof arguments[0]&&(this.options=e(s,arguments[0]));
      var p={spritesheetXpos:1,spritesheetYpos:1, speed:Math.floor(1e3/s.fps),steamElement:document.getElementById (s.spriteID), cellWidth:document.getElementById(s.spriteID).clientWidth,cellHeight:document.getElementById(s.spriteID).clientHeight};
      setInterval(t,p.speed)
    }
  }();

