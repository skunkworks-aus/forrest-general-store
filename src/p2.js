
/* ---------- outdoor drawing ---------- */
var camZ=0,camX=0,F=1,HY=0,FOG=[0,0,0],FOGD=2300;
function PX(x,z){return W/2+(x-camX)*F/(z-camZ);}
function PY(y,z){return HY+(HCAM-y)*F/(z-camZ);}
function R3(x0,y0,x1,y1,z,col){var d=z-camZ;if(d<6){return;}var s=F/d;ctx.fillStyle=col;ctx.fillRect(W/2+(x0-camX)*s,HY+(HCAM-y1)*s,(x1-x0)*s,(y1-y0)*s);}
function PG(pts,col){
  var i,d,s;ctx.fillStyle=col;ctx.beginPath();
  for(i=0;i<pts.length;i++){d=pts[i][2]-camZ;if(d<6){return;}s=F/d;if(i){ctx.lineTo(W/2+(pts[i][0]-camX)*s,HY+(HCAM-pts[i][1])*s);}else{ctx.moveTo(W/2+(pts[i][0]-camX)*s,HY+(HCAM-pts[i][1])*s);}}
  ctx.closePath();ctx.fill();
}
function EL(x,y,z,rx,ry,col){var d=z-camZ;if(d<6){return;}var s=F/d;ctx.fillStyle=col;ctx.beginPath();ctx.ellipse(W/2+(x-camX)*s,HY+(HCAM-y)*s,Math.max(0.1,rx*s),Math.max(0.1,ry*s),0,0,6.3);ctx.fill();}
function LN(x0,y0,z0,x1,y1,z1,col,lw){if(z0-camZ<6||z1-camZ<6){return;}ctx.strokeStyle=col;ctx.lineWidth=lw;ctx.beginPath();ctx.moveTo(PX(x0,z0),PY(y0,z0));ctx.lineTo(PX(x1,z1),PY(y1,z1));ctx.stroke();}
function fogc(hex,k){return css(mx(rgb(hex),FOG,k));}
function K(v){return function(){return v;};}
function RO(off){return function(z){return roadX(z)+off;};}
function ribbon(z0,z1,fl,fr,fill,n){
  var d0=Math.max(9,z0-camZ),d1=z1-camZ;if(d1<=d0){return;}n=n||24;
  var i,d,z,s,y,R=[];ctx.fillStyle=fill;ctx.beginPath();
  for(i=0;i<=n;i++){
    d=d0*Math.pow(d1/d0,i/n);z=camZ+d;s=F/d;y=HY+HCAM*s;
    if(i){ctx.lineTo(W/2+(fl(z)-camX)*s,y);}else{ctx.moveTo(W/2+(fl(z)-camX)*s,y);}
    R.push(W/2+(fr(z)-camX)*s,y);
  }
  for(i=n;i>=0;i--){ctx.lineTo(R[i*2],R[i*2+1]);}
  ctx.closePath();ctx.fill();
}
function gg(hex){
  var base=typeof hex==='string'?rgb(hex):hex,g=ctx.createLinearGradient(0,HY,0,H),span=Math.max(1,H-HY),ys=[1,30,60,100,180,320,span],i,yy;
  for(i=0;i<ys.length;i++){yy=Math.min(ys[i],span);g.addColorStop(clamp(yy/span),css(mx(base,FOG,clamp(HCAM*F/yy/FOGD))));}
  return g;
}
function ridge(amp,f1,f2,ph,col,rough){
  ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(0,HY+2);
  for(var x=0;x<=W+6;x+=6){ctx.lineTo(x,HY-amp*(0.55+0.3*Math.sin(x*f1+ph)+0.15*Math.sin(x*f2+ph*2))-rough*(Math.sin(x*0.37+ph*5)+0.6*Math.sin(x*0.93+ph)));}
  ctx.lineTo(W,HY+2);ctx.closePath();ctx.fill();
}
function bike(cx,cy,s,col){
  ctx.strokeStyle=col;ctx.lineWidth=Math.max(1,3*s);ctx.lineCap='round';ctx.beginPath();
  ctx.arc(cx,cy,24*s,0,6.3);ctx.moveTo(cx+94*s,cy);ctx.arc(cx+70*s,cy,24*s,0,6.3);
  ctx.moveTo(cx,cy);ctx.lineTo(cx+28*s,cy-36*s);ctx.lineTo(cx+70*s,cy);ctx.moveTo(cx+28*s,cy-36*s);ctx.lineTo(cx+58*s,cy-40*s);
  ctx.moveTo(cx+34*s,cy);ctx.lineTo(cx+28*s,cy-36*s);ctx.moveTo(cx+58*s,cy-40*s);ctx.lineTo(cx+70*s,cy);
  ctx.moveTo(cx+22*s,cy-42*s);ctx.lineTo(cx+36*s,cy-42*s);ctx.moveTo(cx+54*s,cy-48*s);ctx.lineTo(cx+66*s,cy-46*s);ctx.stroke();
}

var NOTES=[[6,60,22,30,'#f4f4ee'],[32,66,18,24,'#e8c95a'],[54,58,20,32,'#f4f4ee'],[8,22,20,30,'#9cc3d6'],[32,30,24,28,'#f4f4ee'],[60,20,16,30,'#e59a8c'],[34,8,18,16,'#b9d7a8']];

function drawStore(dist,p){
  var kk=clamp(dist/FOGD),z=ZS,s=F/dist,i,x,SX=STX;
  function c(h){return fogc(h,kk);}
  /* wall, painted brick */
  R3(SX-450,0,SX+450,292,z,c('#f1f0ea'));
  if(s>0.45){for(i=1;i<30;i++){R3(SX-450,i*9.7,SX+450,i*9.7+0.8,z,c('#dfddd4'));}}
  R3(SX-450,0,SX+450,10,z,c('#d9d7ce'));
  R3(SX-450,205,SX+450,292,z,'rgba(40,50,60,0.07)');R3(SX-450,250,SX+450,292,z,'rgba(40,50,60,0.08)');
  /* big window */
  R3(SX-414,101,SX-231,249,z,c('#2e3133'));
  R3(SX-408,107,SX-326,243,z,c('#4d5b61'));R3(SX-320,107,SX-237,243,z,c('#46545a'));
  PG([[SX-408,243,z],[SX-380,243,z],[SX-408,180,z]],'rgba(255,255,255,0.14)');
  PG([[SX-300,243,z],[SX-262,243,z],[SX-320,150,z],[SX-320,190,z]],'rgba(255,255,255,0.1)');
  if(s>0.3){
    for(i=0;i<3;i++){R3(SX-404,138+i*30,SX-330,141+i*30,z,'rgba(150,84,48,0.55)');}
    R3(SX-302,126,SX-270,146,z,'#17191a');
    R3(SX-264,150,SX-243,178,z,c('#c8322b'));R3(SX-264,120,SX-243,146,z,c('#f4f4ee'));R3(SX-318,158,SX-300,184,z,c('#f4f4ee'));R3(SX-296,150,SX-270,176,z,c('#e8c95a'));
    if(s>0.9){ctx.fillStyle='#f08a2c';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='700 '+(11*s)+'px '+SANS;ctx.fillText('OPEN',PX(SX-286,z),PY(136,z));}
  }
  /* single door on the left: the one we walk through */
  var open=smooth(clamp((p-0.44)/0.045));
  R3(SX-189,0,SX-97,224,z,c('#2e3133'));
  R3(SX-181,0,SX-105,216,z,'#2a1c12');
  var gx=PX(SX-143,z),gy=PY(140,z),gr=120*s,g=ctx.createRadialGradient(gx,gy,0,gx,gy,gr);
  g.addColorStop(0,'rgba(240,178,96,0.65)');g.addColorStop(1,'rgba(240,178,96,0)');
  ctx.fillStyle=g;ctx.fillRect(PX(SX-181,z),PY(216,z),76*s,216*s);
  R3(SX-181,0,SX-105,22,z,'#6a4026');
  for(i=0;i<4;i++){R3(SX-150,60+i*36,SX-107,63+i*36,z,'rgba(150,84,48,0.9)');R3(SX-146,63+i*36,SX-140,74+i*36,z,'#5e7a2e');R3(SX-136,63+i*36,SX-130,72+i*36,z,'#6b2c55');R3(SX-126,63+i*36,SX-119,75+i*36,z,'#c98a2b');}
  EL(SX-160,186,z,10,5.5,'rgba(255,220,150,0.95)');R3(SX-160.6,191,SX-159.4,216,z,'#3a2a1c');
  if(open<0.98){
    var lw=76*(1-open);
    R3(SX-181,6,SX-181+lw,216,z,c('#3b4043'));
    if(lw>20){R3(SX-171,18,SX-181+lw-10,206,z,c('#33383b'));}
    R3(SX-181+lw-7,100,SX-181+lw-3,120,z,c('#c3c8ca'));
  }
  /* glass doors */
  R3(SX+52,0,SX+318,236,z,c('#2e3133'));
  R3(SX+58,6,SX+136,230,z,c('#3f4d52'));R3(SX+234,6,SX+312,230,z,c('#3f4d52'));
  if(s>0.3){
    R3(SX+80,122,SX+116,178,z,'rgba(233,226,207,0.85)');
    PG([[SX+80,178,z],[SX+66,160,z],[SX+72,152,z],[SX+80,160,z]],'rgba(233,226,207,0.85)');
    PG([[SX+116,178,z],[SX+130,160,z],[SX+124,152,z],[SX+116,160,z]],'rgba(233,226,207,0.85)');
    R3(SX+86,140,SX+110,162,z,'rgba(60,110,150,0.7)');
    R3(SX+82,60,SX+114,104,z,'rgba(28,30,34,0.8)');
    R3(SX+252,6,SX+300,72,z,'rgba(112,78,52,0.85)');R3(SX+252,22,SX+300,26,z,'rgba(40,40,40,0.8)');R3(SX+252,52,SX+300,56,z,'rgba(40,40,40,0.8)');
    PG([[SX+58,230,z],[SX+90,230,z],[SX+58,150,z]],'rgba(255,255,255,0.12)');
    PG([[SX+262,230,z],[SX+300,230,z],[SX+234,90,z],[SX+234,140,z]],'rgba(255,255,255,0.09)');
  }
  R3(SX+140,6,SX+230,230,z,c('#3a474c'));R3(SX+136,0,SX+140,236,z,c('#2e3133'));R3(SX+230,0,SX+234,236,z,c('#2e3133'));R3(SX+222,104,SX+226,128,z,c('#c3c8ca'));
  /* noticeboard */
  R3(SX+342,102,SX+438,218,z,c('#8a5a34'));R3(SX+349,109,SX+431,211,z,c('#d6c7a4'));
  if(s>0.35){for(i=0;i<NOTES.length;i++){R3(SX+349+NOTES[i][0],109+NOTES[i][1],SX+349+NOTES[i][0]+NOTES[i][2],109+NOTES[i][1]+NOTES[i][3],z,c(NOTES[i][4]));}}
  R3(SX+356,218,SX+362,236,z,c('#8a5a34'));R3(SX+418,218,SX+424,236,z,c('#8a5a34'));
  /* bench under the window */
  if(dist-62>10){R3(SX-476,54,SX-326,62,ZS-62,c('#9a6a3e'));R3(SX-470,0,SX-462,54,ZS-62,c('#ecebe6'));R3(SX-340,0,SX-332,54,ZS-62,c('#ecebe6'));}
  /* awning underside */
  PG([[SX-486,292,ZS],[SX+486,292,ZS],[SX+486,286,ZS-86],[SX-486,286,ZS-86]],c('#d6d6d0'));
  if(dist-86>10){for(i=1;i<10;i++){x=SX-486+i*97.2;LN(x,292,ZS,x,286,ZS-86,c('#bcbcb5'),Math.max(0.6,1.4*s));}}
  /* barrel planter */
  if(dist-70>10){
    PG([[SX+352,0,ZS-70],[SX+345,44,ZS-70],[SX+445,44,ZS-70],[SX+438,0,ZS-70]],c('#6d5c4b'));
    R3(SX+349,10,SX+441,14,ZS-70,c('#3b3b3b'));R3(SX+346,32,SX+444,36,ZS-70,c('#3b3b3b'));
    EL(SX+372,78,ZS-70,34,30,c('#4a8339'));EL(SX+420,84,ZS-70,36,32,c('#4a8339'));EL(SX+396,102,ZS-70,34,28,c('#5c9a45'));EL(SX+380,96,ZS-70,18,14,c('#73b257'));EL(SX+424,100,ZS-70,16,12,c('#73b257'));
  }
  /* posts */
  var dp=dist-82;
  if(dp>12){
    ctx.globalAlpha=clamp((dp-12)/40);
    [SX-470,SX-235,SX+27,SX+470].forEach(function(px){R3(px-6.5,0,px+6.5,287,ZS-82,c('#f7f7f3'));R3(px+2.5,0,px+6.5,287,ZS-82,c('#dbdbd5'));});
    ctx.globalAlpha=1;
  }
  /* fascia and sign */
  var df=dist-86;
  if(df>12){
    ctx.globalAlpha=clamp((df-12)/40);
    R3(SX-490,286,SX+490,402,ZS-86,c('#ecebe6'));R3(SX-490,286,SX+490,290,ZS-86,c('#c9c8c2'));R3(SX-490,398,SX+490,402,ZS-86,c('#f9f9f6'));
    R3(SX+28,290,SX+29.6,398,ZS-86,c('#d3d2cc'));
    var sf=F/df;
    if(sf>0.09){spaced('FORREST GENERAL',PX(SX-176,ZS-86),PY(343,ZS-86),6*sf,c('#4b4f52'),'500 '+(31*sf)+'px '+SANS);}
    ctx.globalAlpha=1;
  }
}

function camZat(p){
  if(p<0.3){return 13500*p/0.3;}
  if(p<0.42){return 13500+(ZS-1800-13500)*(p-0.3)/0.12;}
  return ZS-1800+1742*(1-Math.pow(1-clamp((p-0.42)/0.08),1.5));
}
function drawOutdoor(p,t){
  var i,j,g,o,d,s,x,gy,k,a;
  camZ=camZat(p);camX=camXat(camZ);
  var dist=ZS-camZ,clear=smooth(clamp((camZ-11800)/2400)),fa=1-clear;
  F=Math.max(W,H)*0.8;HY=H*0.5;FOG=mx(rgb('#c6d3ce'),rgb('#e4e9e6'),clear);FOGD=lerp(6500,26000,clear);

  /* sky, sun, cloud */
  g=ctx.createLinearGradient(0,0,0,HY);g.addColorStop(0,'#7d96a8');g.addColorStop(0.62,'#b7c7ce');g.addColorStop(1,css(FOG));
  ctx.fillStyle=g;ctx.fillRect(0,0,W,HY+2);
  var sx=W*0.72-camX*0.01,sy=HY*0.34,sr=Math.max(W,H)*0.4;
  g=ctx.createRadialGradient(sx,sy,0,sx,sy,sr);g.addColorStop(0,'rgba(255,249,228,0.8)');g.addColorStop(1,'rgba(255,249,228,0)');
  ctx.fillStyle=g;ctx.fillRect(0,0,W,HY+2);
  var span=W*1.9,R0=Math.max(W,H)*0.075;
  for(i=0;i<clouds.length;i++){
    var c=clouds[i],cx=(((c.x*W+t*3*c.sp-camX*0.02)%span)+span)%span-W*0.45,cy=c.y*HY*0.95,R=c.sc*R0;
    for(j=0;j<c.b.length;j++){
      var bx=cx+c.b[j].dx*R*1.6,by=cy+c.b[j].dy*R,rr=c.b[j].r*R*1.5;
      g=ctx.createRadialGradient(bx,by+rr*0.3,0,bx,by+rr*0.3,rr);g.addColorStop(0,'rgba(118,132,143,0.5)');g.addColorStop(1,'rgba(118,132,143,0)');
      ctx.fillStyle=g;ctx.fillRect(bx-rr,by-rr,rr*2,rr*2.4);
      g=ctx.createRadialGradient(bx,by-rr*0.12,0,bx,by-rr*0.12,rr*0.9);g.addColorStop(0,'rgba(255,255,255,0.85)');g.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=g;ctx.fillRect(bx-rr,by-rr*1.1,rr*2,rr*2);
    }
  }
  if(clear>0.2){
    ctx.strokeStyle='rgba(40,48,52,'+(0.7*clear)+')';ctx.lineWidth=1.6;ctx.lineCap='round';ctx.beginPath();
    for(i=0;i<4;i++){
      var bdx=((t*26*(1+i*0.22)+i*W*0.31)%(W*1.3))-W*0.15,bdy=HY*(0.2+0.09*i)+Math.sin(t*1.4+i)*6,fl2=Math.sin(t*8+i*2)*4;
      ctx.moveTo(bdx-7,bdy-fl2);ctx.lineTo(bdx,bdy);ctx.lineTo(bdx+7,bdy-fl2);
    }
    ctx.stroke();
  }
  /* Otway ridges */
  ridge(H*0.11,0.0035,0.011,0.6-camX*0.0003,css(mx(rgb('#5d7f7a'),FOG,0.55)),1.6);
  ridge(H*0.07,0.005,0.016,2.2-camX*0.0006,css(mx(rgb('#3f6a5c'),FOG,0.4)),2.2);
  ridge(H*0.035,0.008,0.021,4-camX*0.001,css(mx(rgb('#2f5a47'),FOG,0.25)),2.6);
  /* distant forest in the mist */
  if(fa>0.01){
    ctx.globalAlpha=fa;ctx.fillStyle=css(mx(FOG,rgb('#3d5a50'),0.14));ctx.beginPath();ctx.moveTo(0,HY+2);
    for(x=0;x<=W+5;x+=5){var xx=x+camX*0.05;ctx.lineTo(x,HY-H*(0.25+0.09*Math.sin(xx*0.011+1)+0.04*Math.sin(xx*0.047))-5*Math.sin(xx*0.6)-3*Math.sin(xx*1.7));}
    ctx.lineTo(W,HY+2);ctx.closePath();ctx.fill();ctx.globalAlpha=1;
  }

  /* ground */
  ctx.fillStyle=gg(mx(rgb('#3d4d36'),rgb('#6d9a4c'),clear));ctx.fillRect(0,HY,W,H-HY);
  var far=ZS+2600,verge=gg(mx(rgb('#5f7f45'),rgb('#7fae58'),clear));
  ribbon(0,far,RO(-620),RO(-370),verge,30);ribbon(0,far,RO(370),RO(620),verge,30);
  ribbon(ZS-2600,ZS-150,RO(380),RO(2300),gg('#a9a79c'),30);
  ribbon(ZS-2800,ZS-96,function(z){return lerp(roadX(z)-300,-950,smooth(clamp((z-(ZS-2800))/900)));},RO(-280),gg('#5a5f62'),30);
  ribbon(0,far,RO(-385),RO(385),gg('#8f8e84'),34);
  ribbon(0,far,RO(-RW),RO(RW),gg('#4c5154'),34);
  var line=gg('#e9e9e2');
  ribbon(0,far,RO(-288),RO(-276),line,34);ribbon(0,far,RO(276),RO(288),line,34);
  ribbon(3000,5200,RO(-17),RO(-6),line,30);ribbon(3000,5200,RO(6),RO(17),line,30);
  for(var dz=Math.floor(camZ/1200)*1200;dz<camZ+7000;dz+=1200){if(dz>=2700&&dz<5200){continue;}if(dz>ZS-2900){break;}ribbon(dz,dz+320,RO(-6),RO(6),line,3);}
  for(i=0;i<5;i++){x=STX-500+i*250;ribbon(ZS-620,ZS-104,K(x-5),K(x+5),line,4);}
  ribbon(ZS-100,ZS-86,K(STX-494),K(STX+494),gg('#c9c8c0'),3);
  ribbon(ZS-86,ZS,K(STX-490),K(STX+490),gg('#8b8c8a'),4);
  if(dist<900){
    var pv=gg('#74757a');
    ribbon(ZS-58,ZS-55,K(STX-490),K(STX+490),pv,2);ribbon(ZS-30,ZS-27.5,K(STX-490),K(STX+490),pv,2);
    for(i=0;i<16;i++){x=STX-470+i*62+(i%3)*9;ribbon(ZS-86+(i%2)*28,ZS-58+(i%2)*30,K(x-1.2),K(x+1.4+(i%4)),pv,2);}
  }

  /* everything standing on the ground, far to near */
  var leafD=rgb('#2f4a33'),leafM=rgb('#4b6b3f'),leafL=rgb('#71895a');
  for(i=0;i<objs.length;i++){
    o=objs[i];d=o.z-camZ;if(d<10||d>FOGD){continue;}
    s=F/d;gy=HY+HCAM*s;k=clamp(d/FOGD);a=clamp((d-10)/70);
    if(o.t==='store'){drawStore(dist,p);continue;}
    x=W/2+(o.x-camX)*s;
    if(o.t==='gum'){
      var h=o.h*s,w=o.r*2*s;if(x+h*0.3<0||x-h*0.3>W){continue;}
      var lean=o.lean*h,tx=x+lean,ty=gy-h;
      ctx.globalAlpha=a;
      ctx.fillStyle=css(mx(o.tc,FOG,k));ctx.beginPath();ctx.moveTo(x-w/2,gy);ctx.quadraticCurveTo(x-w*0.32+lean*0.4,gy-h*0.5,tx-w*0.2,ty);ctx.lineTo(tx+w*0.2,ty);ctx.quadraticCurveTo(x+w*0.32+lean*0.4,gy-h*0.5,x+w/2,gy);ctx.closePath();ctx.fill();
      if(w>3){
        ctx.fillStyle=css(mx(rgb('#5c5548'),FOG,k),0.5);ctx.beginPath();ctx.moveTo(x-w/2,gy);ctx.quadraticCurveTo(x-w*0.32+lean*0.4,gy-h*0.5,tx-w*0.2,ty);ctx.lineTo(tx-w*0.1,ty);ctx.quadraticCurveTo(x-w*0.18+lean*0.4,gy-h*0.5,x-w*0.24,gy);ctx.closePath();ctx.fill();
        ctx.fillStyle=css(mx(rgb('#fbf6e8'),FOG,k),0.28);ctx.beginPath();ctx.moveTo(x+w*0.2,gy);ctx.quadraticCurveTo(x+w*0.14+lean*0.4,gy-h*0.5,tx+w*0.06,ty);ctx.lineTo(tx+w*0.14,ty);ctx.quadraticCurveTo(x+w*0.24+lean*0.4,gy-h*0.5,x+w*0.36,gy);ctx.closePath();ctx.fill();
        ctx.fillStyle=css(mx(rgb('#4a3f33'),FOG,k),0.6);ctx.fillRect(x-w*0.54,gy-h*0.05,w*1.08,h*0.05);ctx.fillStyle=css(mx(rgb('#4a3f33'),FOG,k),0.3);ctx.fillRect(x-w*0.5,gy-h*0.09,w*0.98,h*0.04);
      }
      if(w>12){
        ctx.strokeStyle=css(mx(rgb('#6a5d4c'),FOG,k),0.65);ctx.lineWidth=Math.max(1,w*0.045);ctx.lineCap='round';ctx.beginPath();
        for(j=0;j<o.bark.length;j++){var bk=o.bark[j],bx0=x+bk.x*w*0.5+lean*bk.y;ctx.moveTo(bx0,gy-h*bk.y);ctx.lineTo(bx0+w*0.06,gy-h*(bk.y-bk.len));}
        ctx.stroke();
      }
      if(gy-h*1.1<H&&gy-h*0.5>-40){
        if(s>0.1){
          ctx.strokeStyle=css(mx(o.tc,FOG,k));ctx.lineCap='round';ctx.beginPath();
          for(j=0;j<o.br.length;j++){var br=o.br[j],bb=o.blobs[br.bi];ctx.lineWidth=Math.max(1,w*0.22);ctx.moveTo(x+lean*br.y,gy-h*br.y);ctx.lineTo(tx+bb.bx*h,gy-h*bb.by);}
          ctx.stroke();
        }
        for(j=0;j<o.blobs.length;j++){
          var b=o.blobs[j],ex=tx+b.bx*h,ey=gy-h*b.by,erx=Math.max(0.5,b.rx*h);
          ctx.fillStyle=css(mx(b.tone===0?leafD:b.tone===1?leafM:leafL,FOG,k));ctx.beginPath();ctx.ellipse(ex,ey,erx,erx*0.62,0,0,6.3);ctx.fill();
          if(s>0.22&&b.tone>0){ctx.fillStyle=css(mx(leafL,FOG,k),0.6);ctx.beginPath();ctx.ellipse(ex+erx*0.15,ey-erx*0.22,erx*0.6,erx*0.3,0,0,6.3);ctx.fill();}
        }
      }
    }else if(o.t==='under'){
      var uh=o.h*s;if(x+uh<0||x-uh>W){continue;}
      ctx.globalAlpha=a;
      ctx.fillStyle=css(mx(rgb('#40342a'),FOG,k));ctx.fillRect(x-uh*0.02,gy-uh*0.6,uh*0.04,uh*0.6);ctx.fillRect(x-uh*0.02,gy-uh*0.55,uh*0.16,uh*0.02);
      for(j=0;j<o.blobs.length;j++){
        var ub=o.blobs[j],urx=Math.max(0.5,ub.rx*uh);
        ctx.fillStyle=css(mx(rgb(ub.tone?'#4c7449':'#2f5236'),FOG,k));ctx.beginPath();ctx.ellipse(x+ub.bx*uh*0.6,gy-uh*ub.by,urx,urx*0.7,0,0,6.3);ctx.fill();
        if(ub.tone&&s>0.1){ctx.fillStyle=css(mx(rgb('#6a9458'),FOG,k),0.7);ctx.beginPath();ctx.ellipse(x+ub.bx*uh*0.6+urx*0.15,gy-uh*ub.by-urx*0.25,urx*0.55,urx*0.28,0,0,6.3);ctx.fill();}
        if(o.wattle&&ub.tone&&s>0.12){ctx.fillStyle=css(mx(rgb('#c9bd4f'),FOG,k),0.75);for(var wq=0;wq<4;wq++){ctx.beginPath();ctx.ellipse(x+ub.bx*uh*0.6+urx*(wq*0.4-0.6),gy-uh*ub.by-urx*(0.1+0.2*(wq%2)),urx*0.16,urx*0.1,0,0,6.3);ctx.fill();}}
      }
    }else if(o.t==='fern'){
      if(d>4200||x<-330*s||x>W+330*s){continue;}
      var top=gy-o.h*s,L=210*s;
      ctx.globalAlpha=a;
      ctx.fillStyle=css(mx(rgb('#3d2c1e'),FOG,k));ctx.fillRect(x-9*s,top,18*s,o.h*s);
      ctx.fillStyle=css(mx(rgb('#5a4330'),FOG,k));ctx.fillRect(x+2*s,top,5*s,o.h*s);
      var fd=css(mx(rgb('#2d6238'),FOG,k)),fl=css(mx(rgb('#5a9a4c'),FOG,k));
      for(j=0;j<13;j++){
        var an=-3.05+j*0.247+Math.sin(t*0.8+o.sd+j)*0.025,ca=Math.cos(an),sa=Math.sin(an);
        var ex2=x+ca*L,ey2=top+sa*L*0.45+L*0.3,mx2=x+ca*L*0.5,my2=top+sa*L*0.95,wd=L*0.085;
        ctx.fillStyle=j%2?fd:fl;ctx.beginPath();ctx.moveTo(x,top);
        ctx.quadraticCurveTo(mx2-sa*wd,my2+ca*wd-wd,ex2,ey2);ctx.quadraticCurveTo(mx2+sa*wd,my2-ca*wd+wd,x,top);ctx.fill();
      }
      ctx.fillStyle=css(mx(rgb('#74b061'),FOG,k));ctx.beginPath();ctx.ellipse(x,top,10*s,6*s,0,0,6.3);ctx.fill();
    }else if(o.t==='shrub'){
      var sh=o.h*s;if(d>5000||x<-sh*3||x>W+sh*3){continue;}
      ctx.globalAlpha=a;
      for(j=0;j<o.blobs.length;j++){
        var sb=o.blobs[j],srx=Math.max(0.5,sb.rx*sh);
        ctx.fillStyle=css(mx(rgb(j<2?'#35573a':j<4?'#4f7741':'#6a9450'),FOG,k));ctx.beginPath();ctx.ellipse(x+sb.bx*sh*0.7,gy-sh*sb.by*0.8,srx,srx*0.7,0,0,6.3);ctx.fill();
      }
      if(o.fl&&s>0.2){ctx.fillStyle=css(mx(rgb('#f1ead2'),FOG,k));for(j=0;j<5;j++){ctx.fillRect(x+(j-2)*sh*0.3,gy-sh*(0.5+0.25*((j*7)%3)),Math.max(1,2.5*s),Math.max(1,2.5*s));}}
    }else if(o.t==='gpost'){
      ctx.globalAlpha=a;R3(o.x-5,0,o.x+5,105,o.z,fogc('#f2f2ec',k));R3(o.x+2,0,o.x+5,105,o.z,fogc('#d5d5cf',k));R3(o.x-5,76,o.x+5,92,o.z,fogc(o.left?'#c8322b':'#aab0b3',k));
    }else if(o.t==='chev'){
      ctx.globalAlpha=a;
      R3(o.x-28,0,o.x-22,100,o.z,fogc('#8d9497',k));R3(o.x+22,0,o.x+28,100,o.z,fogc('#8d9497',k));
      R3(o.x-40,96,o.x+40,172,o.z,fogc('#f2c81e',k));
      PG([[o.x+8,164,o.z],[o.x-20,134,o.z],[o.x+8,104,o.z],[o.x+26,104,o.z],[o.x-2,134,o.z],[o.x+26,164,o.z]],fogc('#1b1b1b',k));
    }else if(o.t==='rail'){
      var z0=Math.max(o.z0,camZ+8),kz=(z0-o.z0)/(o.z-o.z0),x0=lerp(o.x0,o.x1,kz);
      ctx.globalAlpha=1;
      R3(o.x1-3.5,0,o.x1+3.5,58,o.z,fogc('#8d9497',k));
      PG([[x0,64,z0],[o.x1,64,o.z],[o.x1,40,o.z],[x0,40,z0]],fogc('#b4babd',k));
      PG([[x0,64,z0],[o.x1,64,o.z],[o.x1,58,o.z],[x0,58,z0]],fogc('#d9dee0',k));
      PG([[x0,49,z0],[o.x1,49,o.z],[o.x1,46,o.z],[x0,46,z0]],fogc('#8f979a',k));
      if(o.first&&o.z0-camZ>10){R3(o.x0-9,34,o.x0+9,70,o.z0,fogc('#f2c81e',k));}
    }else if(o.t==='sign40'){
      ctx.globalAlpha=a;R3(o.x-3.5,0,o.x+3.5,200,o.z,fogc('#8d9497',k));R3(o.x-30,196,o.x+30,274,o.z,fogc('#f6f6f2',k));
      EL(o.x,236,o.z,24,24,fogc('#c8322b',k));EL(o.x,236,o.z,17,17,fogc('#f6f6f2',k));
      if(s>0.2){ctx.fillStyle=fogc('#1b1b1b',k);ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='700 '+(22*s)+'px '+SANS;ctx.fillText('40',x,PY(235,o.z));}
    }else if(o.t==='school'){
      ctx.globalAlpha=a;R3(o.x-3.5,0,o.x+3.5,190,o.z,fogc('#8d9497',k));R3(o.x-38,186,o.x+38,262,o.z,fogc('#f0622d',k));
      EL(o.x-11,240,o.z,6,6,fogc('#1b1b1b',k));R3(o.x-16,200,o.x-6,232,o.z,fogc('#1b1b1b',k));
      EL(o.x+11,232,o.z,5,5,fogc('#1b1b1b',k));R3(o.x+7,200,o.x+15,226,o.z,fogc('#1b1b1b',k));
    }else if(o.t==='pole'){
      ctx.globalAlpha=a;R3(o.x-10,0,o.x+10,900,o.z,fogc('#6b6259',k));R3(o.x-80,850,o.x+80,864,o.z,fogc('#6b6259',k));
      if(o.nz){ctx.globalAlpha=0.5*a;LN(o.x-72,862,o.z,o.nx-72,862,o.nz,'#2a2a2a',Math.max(0.6,1.6*s));LN(o.x+72,862,o.z,o.nx+72,862,o.nz,'#2a2a2a',Math.max(0.6,1.6*s));}
    }else if(o.t==='house'){
      ctx.globalAlpha=1;
      R3(o.x+118,230,o.x+148,305,o.z,fogc('#9a6a52',k));
      PG([[o.x-240,168,o.z],[o.x,292,o.z],[o.x+240,168,o.z]],fogc('#5f8a72',k));
      R3(o.x-212,0,o.x+212,170,o.z,fogc('#e9e1c8',k));
      for(j=1;j<9;j++){R3(o.x-212,j*18,o.x+212,j*18+1.2,o.z,fogc('#d6ceb4',k));}
      R3(o.x-240,150,o.x+240,174,o.z,fogc('#537a66',k));
      [-150,-40,70].forEach(function(wx){R3(o.x+wx-4,56,o.x+wx+64,134,o.z,fogc('#f7f5ec',k));R3(o.x+wx,60,o.x+wx+60,130,o.z,fogc('#51606a',k));});
      R3(o.x+150,0,o.x+196,128,o.z,fogc('#6f4a36',k));
      [-236,-80,80,236].forEach(function(wx){R3(o.x+wx-4,0,o.x+wx+4,150,o.z,fogc('#f7f5ec',k));});
      for(j=-13;j<14;j++){R3(o.x+j*20-6,0,o.x+j*20+6,44,o.z,fogc('#f3f1e8',k));}
    }else if(o.t==='shed'){
      ctx.globalAlpha=1;
      R3(o.x-150,0,o.x+150,214,o.z,fogc('#7fa487',k));
      PG([[o.x-166,210,o.z],[o.x+166,246,o.z],[o.x+166,230,o.z],[o.x-166,196,o.z]],fogc('#4f6f5a',k));
      R3(o.x-80,0,o.x+70,156,o.z,fogc('#6c9175',k));
      for(j=1;j<8;j++){R3(o.x-80,j*19,o.x+70,j*19+1.5,o.z,fogc('#5d8066',k));}
    }else if(o.t==='brown'){
      ctx.globalAlpha=1;
      R3(o.x-240,0,o.x+240,142,o.z,fogc('#8a6d50',k));R3(o.x-256,136,o.x+256,168,o.z,fogc('#6f7476',k));
      [-170,-40,90].forEach(function(wx){R3(o.x+wx,50,o.x+wx+70,112,o.z,fogc('#4a555b',k));});
    }else if(o.t==='hedge'){
      ctx.globalAlpha=1;
      EL(o.x-150,96,o.z,125,104,fogc('#365a36',k));EL(o.x,138,o.z,150,128,fogc('#365a36',k));EL(o.x+150,104,o.z,135,108,fogc('#365a36',k));
      EL(o.x-170,150,o.z,60,40,fogc('#4f7c45',k));EL(o.x-30,218,o.z,84,44,fogc('#4f7c45',k));EL(o.x+140,172,o.z,74,38,fogc('#4f7c45',k));EL(o.x+30,150,o.z,50,26,fogc('#5f8f4f',k));
    }else if(o.t==='umb'){
      ctx.globalAlpha=a;
      R3(o.x-2.5,0,o.x+2.5,232,o.z,fogc('#d9d9d2',k));
      PG([[o.x-135,214,o.z],[o.x,276,o.z],[o.x+135,214,o.z]],fogc('#5c8f6a',k));
      PG([[o.x-45,214,o.z],[o.x,276,o.z],[o.x+45,214,o.z]],fogc('#6ba17a',k));
      R3(o.x-135,205,o.x+135,216,o.z,fogc('#4f7d5c',k));
      R3(o.x-74,62,o.x+74,70,o.z,fogc('#8a5a34',k));R3(o.x-60,0,o.x-54,62,o.z,fogc('#6f4627',k));R3(o.x+54,0,o.x+60,62,o.z,fogc('#6f4627',k));
      R3(o.x-90,36,o.x+90,42,o.z,fogc('#8a5a34',k));
    }else if(o.t==='bikes'){
      if(s>0.12){
        ctx.globalAlpha=a;
        R3(o.x-70,0,o.x+150,4,o.z,fogc('#8d9497',k));
        bike(x-60*s,gy-24*s,s,fogc('#1f2a2e',k));bike(x+10*s,gy-24*s,s,fogc('#b8372b',k));bike(x+74*s,gy-24*s,s,fogc('#2f6f8f',k));
      }
    }else if(o.t==='big'){
      var Q=2.4;ctx.globalAlpha=a;
      PG([[o.x-58*Q,0,o.z],[o.x-30*Q,236*Q,o.z],[o.x+30*Q,236*Q,o.z],[o.x+58*Q,0,o.z]],fogc('#4a3d32',k));
      PG([[o.x-58*Q,0,o.z],[o.x-30*Q,236*Q,o.z],[o.x-12*Q,236*Q,o.z],[o.x-30*Q,0,o.z]],fogc('#3a2f26',k));
      ctx.lineCap='round';
      for(j=0;j<o.tiers.length;j+=2){LN(o.x,210*Q,o.z,o.x+o.tiers[j].bx*330*Q,(236+(o.tiers[j].by-0.62)*500)*Q,o.z,fogc('#4a3d32',k),Math.max(1,13*Q*s));}
      for(j=0;j<o.tiers.length;j++){var tr=o.tiers[j];EL(o.x+tr.bx*340*Q,(250+(tr.by-0.62)*520)*Q,o.z,tr.rx*400*Q,tr.rx*120*Q,fogc(tr.tone?'#4a6b45':'#2f4a36',k));}
      for(j=9;j<o.tiers.length;j++){var t2=o.tiers[j];EL(o.x+t2.bx*340*Q+20,(262+(t2.by-0.62)*520)*Q,o.z,t2.rx*250*Q,t2.rx*60*Q,fogc('#5f8254',k));}
    }
  }
  ctx.globalAlpha=1;

  /* mist on the road and light under the canopy */
  g=ctx.createLinearGradient(0,HY-110,0,HY+110);g.addColorStop(0,css(FOG,0));g.addColorStop(0.5,css(FOG,0.3*(0.3+0.7*fa)));g.addColorStop(1,css(FOG,0));
  ctx.fillStyle=g;ctx.fillRect(0,HY-110,W,220);
  if(fa>0.01){
    for(i=0;i<5;i++){
      var x0=W*(0.4+i*0.15)+Math.sin(t*0.25+i)*14;
      ctx.fillStyle='rgba(255,246,214,'+(0.06*fa)+')';
      ctx.beginPath();ctx.moveTo(x0,0);ctx.lineTo(x0+W*0.05,0);ctx.lineTo(x0-W*0.22,H);ctx.lineTo(x0-W*0.34,H);ctx.closePath();ctx.fill();
    }
    g=ctx.createLinearGradient(0,0,0,H*0.42);g.addColorStop(0,'rgba(14,34,26,'+(0.8*fa)+')');g.addColorStop(1,'rgba(14,34,26,0)');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H*0.42);
    ctx.fillStyle='rgba(14,40,30,'+(0.14*fa)+')';ctx.fillRect(0,0,W,H);
    if(!reduce){
      ctx.fillStyle='rgba(255,248,220,'+(0.55*fa)+')';
      for(i=0;i<motes.length;i++){var m=motes[i];ctx.beginPath();ctx.arc(m.x*W+Math.sin(t*0.35+m.ph)*24,(m.y*H+t*7*(0.5+m.x))%H,1.5,0,6.3);ctx.fill();}
    }
  }
  var dk=smooth(clamp((p-0.47)/0.03));
  if(dk>0){ctx.fillStyle='rgba(42,28,18,'+dk+')';ctx.fillRect(0,0,W,H);}
}
