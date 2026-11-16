(function(){
'use strict';

var hamper=[],dirty=true;
function renderHamper(){dirty=true;}

/* ---------- core ---------- */
var journey=document.getElementById('journey'),stage=document.getElementById('stage');
var cv=document.getElementById('scene'),ctx=cv.getContext('2d');
var W=0,H=0;
var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function clamp(v,a,b){a=a===undefined?0:a;b=b===undefined?1:b;return v<a?a:v>b?b:v;}
function smooth(x){return x*x*(3-2*x);}
function lerp(a,b,k){return a+(b-a)*k;}
var cache={};
function rgb(h){if(!cache[h]){cache[h]=[parseInt(h.substr(1,2),16),parseInt(h.substr(3,2),16),parseInt(h.substr(5,2),16)];}return cache[h];}
function mx(a,b,k){return [a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k,a[2]+(b[2]-a[2])*k];}
function css(a,al){return 'rgba('+(a[0]|0)+','+(a[1]|0)+','+(a[2]|0)+','+(al===undefined?1:al)+')';}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
var SANS='"Barlow","Helvetica Neue",Arial,sans-serif',COND='"Barlow Condensed","Arial Narrow",sans-serif';

function resize(){
  var r=stage.getBoundingClientRect();
  W=r.width;H=r.height;
  var d=Math.min(window.devicePixelRatio||1,2);
  cv.width=Math.round(W*d);cv.height=Math.round(H*d);
  ctx.setTransform(d,0,0,d,0,0);
  dirty=true;
}
function spaced(str,cx,cy,track,col,font){
  ctx.font=font;ctx.fillStyle=col;ctx.textBaseline='middle';ctx.textAlign='left';
  var w=0,i,ws=[];
  for(i=0;i<str.length;i++){ws[i]=ctx.measureText(str[i]).width;w+=ws[i]+(i<str.length-1?track:0);}
  var x=cx-w/2;
  for(i=0;i<str.length;i++){ctx.fillText(str[i],x,cy);x+=ws[i]+track;}
}

/* ---------- outdoor world ---------- */
/* Units are centimetres: the camera sits 150 above the road, the road is 6 m wide. z runs up the road to the store wall at ZS. */
var ZS=19000,HCAM=150,STX=-185,RW=300;
function bend(z){var fade=clamp((ZS-5000-z)/3500);return (700*Math.sin(z/2600)+250*Math.sin(z/1150+1))*fade;}
function veer(z){var v=clamp((z-(ZS-2800))/2800);return 2400*v*v;}
function roadX(z){return bend(z)+veer(z);}
var DOORX=STX-143;
function camXat(z){var k=smooth(clamp((z-(ZS-3600))/1700));return lerp(roadX(z+300)-150,DOORX,k);}
var BTZ=ZS-520,BTX=roadX(BTZ)+1300;

var objs=[];
(function(){
  var r=rng(11),i,j,z,side,off,o,nb,x;
  function gum(z,x,h,rad){
    o={t:'gum',z:z,x:x,h:h,r:rad,lean:(r()-0.5)*0.07,
       tc:rgb(['#b3a893','#9c917e','#bfb5a2','#8f8472'][(r()*4)|0]),blobs:[],br:[],bark:[]};
    nb=10+((r()*5)|0);
    for(j=0;j<nb;j++){o.blobs.push({bx:(r()-0.5)*0.3,by:0.62+r()*0.4,rx:0.035+r()*0.045,tone:j<4?0:(j<nb-3?1:2)});}
    for(j=0;j<4;j++){o.br.push({y:0.5+r()*0.28,bi:(r()*nb)|0});}
    for(j=0;j<6;j++){o.bark.push({x:(r()-0.5)*0.6,y0:0.1+r()*0.3,len:0.03+r()*0.08});}
    objs.push(o);
  }
  function under(z,x,h){
    o={t:'under',z:z,x:x,h:h,blobs:[],wattle:r()<0.2};
    for(j=0;j<8;j++){o.blobs.push({bx:(r()-0.5)*0.75,by:0.5+r()*0.5,rx:0.13+r()*0.1,tone:j<4?0:1});}
    objs.push(o);
  }
  function fern(z,x){objs.push({t:'fern',z:z,x:x,h:60+r()*150,sd:r()*6});}
  function shrub(z,x){
    o={t:'shrub',z:z,x:x,h:45+r()*90,blobs:[],fl:r()<0.2};
    for(j=0;j<5;j++){o.blobs.push({bx:(r()-0.5)*1.5,by:0.3+r()*0.7,rx:0.45+r()*0.35});}
    objs.push(o);
  }
  /* the forest */
  for(i=0;i<540;i++){z=100+r()*13800;if(z>12200&&r()<0.55){continue;}side=r()<0.5?-1:1;off=440+Math.pow(r(),1.5)*3300;gum(z,roadX(z)+side*off,1700+r()*1500,22+r()*38);}
  for(i=0;i<190;i++){z=100+r()*13400;side=r()<0.5?-1:1;off=470+r()*1900;under(z,roadX(z)+side*off,280+r()*320);}
  for(i=0;i<200;i++){z=100+r()*13400;side=r()<0.5?-1:1;off=420+r()*1100;fern(z,roadX(z)+side*off);}
  for(i=0;i<300;i++){z=60+r()*13700;side=r()<0.5?-1:1;off=392+r()*1000;shrub(z,roadX(z)+side*off);}
  /* trees behind and beside the town */
  for(i=0;i<34;i++){z=ZS+400+r()*2600;x=-3600+r()*6400;if(Math.abs(x-2400)<460){continue;}gum(z,x,900+r()*650,16+r()*14);}
  for(i=0;i<12;i++){z=13600+r()*4400;gum(z,-1500-r()*1900,850+r()*500,15+r()*12);}
  for(i=0;i<8;i++){z=13600+r()*2600;gum(z,roadX(z)+700+r()*1500,850+r()*500,15+r()*12);}
  for(i=0;i<12;i++){z=ZS+200+r()*900;x=-3000+r()*5000;if(Math.abs(x-2400)<460){continue;}under(z,x,300+r()*220);}
  fern(ZS+60,STX-600);fern(ZS+90,STX-720);fern(ZS-30,STX-980);fern(ZS+60,STX+760);
  for(i=0;i<20;i++){z=14200+r()*4200;side=r()<0.5?-1:1;shrub(z,side<0?-1000-r()*900:roadX(z)+480+r()*500);}
  /* roadside furniture */
  for(z=300;z<ZS-3000;z+=600){objs.push({t:'gpost',z:z,x:roadX(z)-348,left:true});objs.push({t:'gpost',z:z+300,x:roadX(z+300)+348,left:false});}
  [3780,4084,4390].forEach(function(cz){objs.push({t:'chev',z:cz,x:roadX(cz)+475});});
  for(z=3100;z<5000;z+=190){objs.push({t:'rail',z:z+190,z0:z,x0:roadX(z)+396,x1:roadX(z+190)+396,first:z===3100});}
  objs.push({t:'sign40',z:ZS-5200,x:roadX(ZS-5200)-430});
  objs.push({t:'school',z:ZS-4300,x:roadX(ZS-4300)-445});
  [ZS-5600,ZS-4100,ZS-2600,ZS-1100,ZS+400].forEach(function(pz,n,a){objs.push({t:'pole',z:pz,x:roadX(pz)+440,nz:a[n+1],nx:a[n+1]!==undefined?roadX(a[n+1])+440:0});});
  /* the town */
  objs.push({t:'house',z:ZS+260,x:980});
  objs.push({t:'shed',z:ZS+460,x:1560});
  objs.push({t:'brown',z:ZS+80,x:-1350});
  objs.push({t:'hedge',z:ZS-6,x:STX+820});
  objs.push({t:'store',z:ZS});
  objs.push({t:'umb',z:ZS-40,x:STX-640});objs.push({t:'umb',z:ZS+30,x:STX-800});
  objs.push({t:'bikes',z:ZS-120,x:STX-640});
  (function(){
    o={t:'big',z:BTZ,x:BTX,tiers:[]};
    for(j=0;j<18;j++){o.tiers.push({bx:(r()-0.5)*1.7,by:0.62+r()*0.36,rx:0.3+r()*0.22,tone:j<9?0:1});}
    objs.push(o);
  })();
  objs.sort(function(a,b){return b.z-a.z;});
})();

var clouds=[];
(function(){var r=rng(5),i,j,c;for(i=0;i<11;i++){c={x:r()*1.7,y:0.06+r()*0.5,sc:0.7+r()*0.9,sp:0.5+r(),b:[]};for(j=0;j<5;j++){c.b.push({dx:(j-2)*0.5+(r()-0.5)*0.3,dy:(r()-0.5)*0.25,r:0.45+r()*0.4});}clouds.push(c);}})();
var motes=[];(function(){var r=rng(3);for(var i=0;i<30;i++){motes.push({x:r(),y:r(),ph:r()*6});}})();
