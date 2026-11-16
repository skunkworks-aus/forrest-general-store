
/* ---------- overlays and loop ---------- */
function win(v,a,b,e){e=e||0.03;return clamp((v-a)/e)*clamp((b-v)/e);}
var caps=[1,4].map(function(n){return document.getElementById('cap'+n);});
var stops=[1,2,3].map(function(n){return document.getElementById('stop'+n);});
function show(node,o){
  node.style.opacity=o.toFixed(3);
  var off=o<0.05;
  node.style.visibility=off?'hidden':'visible';
  if('inert' in node){node.inert=off;}
}
var bar=document.querySelector('.bar');
function overlays(p){
  var q=clamp((p-0.52)/0.46);
  show(caps[0],clamp((0.085-p)/0.035));
  show(caps[1],win(p,0.395,0.455,0.02));
  show(stops[0],p<0.52?0:win(q,0.01,0.25,0.04));
  show(stops[1],win(q,0.36,0.63,0.04));
  show(stops[2],clamp((q-0.74)/0.04));
}
function draw(p,t){
  if(p>0.3){warmVids();}
  ctx.clearRect(0,0,W,H);ctx.globalAlpha=1;
  if(p<0.5){
    drawOutdoor(p,t);
    var vg=ctx.createRadialGradient(W/2,H*0.5,Math.min(W,H)*0.35,W/2,H*0.5,Math.max(W,H)*0.8);vg.addColorStop(0,'rgba(10,20,18,0)');vg.addColorStop(1,'rgba(10,20,18,0.3)');
    ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
  }else{
    drawInterior(clamp((p-0.52)/0.46),t);
    var ia=clamp((p-0.5)/0.035);
    if(ia<1){ctx.fillStyle='rgba(42,28,18,'+(1-ia)+')';ctx.fillRect(0,0,W,H);}
  }
  overlays(p);
  bar.classList.toggle('in',p>=0.5);
}
var pT=0,pC=0,last=0,time=0;
function target(){var r=journey.getBoundingClientRect();return clamp(-r.top/Math.max(1,r.height-H));}
function frame(now){
  var dt=Math.min(50,now-last||16);last=now;
  pT=target();
  var prev=pC;
  pC=reduce?pT:pC+(pT-pC)*Math.min(1,dt*0.009);
  if(Math.abs(pT-pC)<0.0002){pC=pT;}
  if(!reduce){time+=dt/1000;}
  var inView=journey.getBoundingClientRect().bottom>0;
  if(inView&&(!reduce||pC!==prev||dirty)){draw(pC,time);dirty=false;}
  requestAnimationFrame(frame);
}
window.addEventListener('resize',resize);
resize();renderHamper();
pT=pC=target();draw(pC,0);
if(document.fonts&&document.fonts.ready){document.fonts.ready.then(function(){dirty=true;});}
requestAnimationFrame(frame);
})();
