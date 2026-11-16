
/* ---------- interior: a ride past each item ---------- */
function camAt(q,D){
  if(q<0.22){return 0;}
  if(q<0.38){return D*smooth((q-0.22)/0.16);}
  if(q<0.6){return D;}
  if(q<0.76){return D+D*smooth((q-0.6)/0.16);}
  return 2*D;
}
function drawInterior(q,t){
  var wide=W>760,u=Math.min(H/100,W/70)*(wide?1.3:0.84),cx=wide?W*0.67:W*0.5,cy=wide?H*0.55:H*0.3,c=camAt(q,1),i,k,g,TAU=6.2832;
  function lg(x0,y0,x1,y1,s){var a=ctx.createLinearGradient(x0,y0,x1,y1);for(var n=0;n<s.length;n+=2){a.addColorStop(s[n],s[n+1]);}return a;}
  function rg(x,y,r,s){var a=ctx.createRadialGradient(x,y,0,x,y,r);for(var n=0;n<s.length;n+=2){a.addColorStop(s[n],s[n+1]);}return a;}
  function ell(x,y,rx,ry,f,rot){ctx.beginPath();ctx.ellipse(x,y,rx,ry,rot||0,0,TAU);ctx.fillStyle=f;ctx.fill();}
  function rr(x,y,w,h,r,f){ctx.beginPath();if(ctx.roundRect){ctx.roundRect(x,y,w,h,r);}else{ctx.rect(x,y,w,h);}ctx.fillStyle=f;ctx.fill();}
  function txt(s,x,y,size,col,wt){ctx.fillStyle=col;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=(wt||'700')+' '+size+'px '+COND;ctx.fillText(s,x,y);}
  function steam(x,y,n,h){
    ctx.lineCap='round';ctx.lineWidth=0.9;ctx.strokeStyle=lg(0,y,0,y-h,[0,'rgba(255,255,255,0)',0.25,'rgba(255,255,255,0.5)',1,'rgba(255,255,255,0)']);
    for(var m=0;m<n;m++){var bx=x+(m-(n-1)/2)*3.2;ctx.beginPath();ctx.moveTo(bx,y);
      ctx.bezierCurveTo(bx-2.4+Math.sin(t*1.3+m)*1.4,y-h*0.33,bx+2.4+Math.sin(t*1.1+m*2)*1.4,y-h*0.66,bx+Math.sin(t+m)*1.6,y-h);ctx.stroke();}
  }
  function table(){
    ell(0,19,43,11,'rgba(0,0,0,0.4)');ell(0,17,40,10,'#3a2114');
    ell(0,15,40,10,lg(-40,0,40,0,[0,'#5a3520',0.45,'#93613a',1,'#4a2a18']));
    ctx.save();ctx.beginPath();ctx.ellipse(0,15,40,10,0,0,TAU);ctx.clip();
    ctx.strokeStyle='rgba(50,25,10,0.22)';ctx.lineWidth=0.25;
    for(var m=0;m<9;m++){ctx.beginPath();ctx.moveTo(-42,7+m*2.1);ctx.bezierCurveTo(-14,6+m*2.1+(m%3),14,8.4+m*2.1-(m%2),42,7+m*2.1);ctx.stroke();}
    ell(-6,11,24,5,rg(-6,11,24,[0,'rgba(255,220,160,0.28)',1,'rgba(255,220,160,0)']));
    ctx.restore();
  }
  function jar(x,yb,sc,col,lid,fill){
    ctx.save();ctx.translate(x,yb);ctx.scale(sc,sc);
    ell(0,0.4,3.6,1,'rgba(0,0,0,0.3)');
    rr(-3.2,-8.6,6.4,8.8,1.1,col);
    if(fill){for(var m=0;m<9;m++){ell(-2+(m%3)*2+((m/3)|0)%2*0.5,-1.4-((m/3)|0)*2.3,1.05,0.95,fill);ell(-2.3+(m%3)*2,-1.7-((m/3)|0)*2.3,0.3,0.25,'rgba(255,255,255,0.35)');}}
    rr(-3.2,-8.6,6.4,8.8,1.1,lg(-3.2,0,3.2,0,[0,'rgba(255,255,255,0.3)',0.2,'rgba(255,255,255,0.05)',0.75,'rgba(0,0,0,0)',1,'rgba(0,0,0,0.28)']));
    rr(-2.5,-6.2,5,3.6,0.3,'#f3eddc');ctx.fillStyle='#4a4a44';ctx.fillRect(-1.7,-5.3,3.4,0.35);ctx.fillRect(-1.3,-4.4,2.6,0.25);ctx.fillRect(-1.5,-3.7,3,0.25);
    rr(-3.5,-10.3,7,2,0.5,lid);ctx.fillStyle='rgba(255,255,255,0.25)';ctx.fillRect(-3.3,-10,6.6,0.4);
    ctx.restore();
  }
  function cheese(x,yb,sc){
    ctx.save();ctx.translate(x,yb);ctx.scale(sc,sc);
    ell(0.5,0.3,6,1.1,'rgba(0,0,0,0.3)');
    ctx.beginPath();ctx.moveTo(-6,0);ctx.lineTo(5.5,0);ctx.lineTo(5.5,-5.2);ctx.lineTo(-6,-1.2);ctx.closePath();ctx.fillStyle=lg(-6,0,5.5,0,[0,'#f2cf62',1,'#dba93a']);ctx.fill();
    ctx.beginPath();ctx.moveTo(-6,-1.2);ctx.lineTo(5.5,-5.2);ctx.lineTo(8,-4.3);ctx.lineTo(-3,-0.6);ctx.closePath();ctx.fillStyle='#f8e08a';ctx.fill();
    ctx.beginPath();ctx.moveTo(5.5,0);ctx.lineTo(8,0.6);ctx.lineTo(8,-4.3);ctx.lineTo(5.5,-5.2);ctx.closePath();ctx.fillStyle='#c9952e';ctx.fill();
    ell(1.5,-1.6,0.9,0.8,'#cf9f34');ell(3.8,-3,0.6,0.55,'#cf9f34');ell(-2.4,-0.8,0.5,0.4,'#cf9f34');
    ctx.restore();
  }
  function salami(x,yb,sc,slices){
    ctx.save();ctx.translate(x,yb);ctx.scale(sc,sc);
    if(slices){ell(0,0.2,7,1.1,'rgba(0,0,0,0.3)');}
    ctx.save();ctx.rotate(slices?-0.16:-1.25);
    rr(-7,-4.4,14,4.2,2.1,lg(0,-4.4,0,-0.2,[0,'#a8433c',0.5,'#7a2824',1,'#4f1614']));
    ctx.fillStyle='rgba(255,235,225,0.5)';for(var m=0;m<12;m++){ctx.fillRect(-5.6+m*0.95,-3.6+((m*7)%5)*0.55,0.35,0.3);}
    ctx.strokeStyle='#e9dcc0';ctx.lineWidth=0.3;ctx.beginPath();ctx.moveTo(-7,-2.3);ctx.lineTo(-8.8,-2.6);ctx.moveTo(7,-2.3);ctx.lineTo(8.8,-2);ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,0.18)';ctx.fillRect(-5.5,-4,11,0.5);
    ctx.restore();
    if(slices){for(var n=0;n<3;n++){ell(-3+n*3.2,1.4,1.9,0.9,'#8a3029');ell(-3+n*3.2,1.3,1.6,0.72,'#b14a40');ell(-3.4+n*3.2,1.2,0.3,0.15,'#f0d9cf');ell(-2.5+n*3.2,1.5,0.25,0.12,'#f0d9cf');}}
    ctx.restore();
  }

  function coffee(){
    table();
    /* milk jug and the sign behind */
    ctx.beginPath();ctx.moveTo(-27,-4);ctx.lineTo(-17,-4);ctx.lineTo(-18,9);ctx.lineTo(-26,9);ctx.closePath();ctx.fillStyle=lg(-27,0,-17,0,[0,'#8f979a',0.3,'#e6eaeb',0.6,'#b4bbbe',1,'#6f7679']);ctx.fill();
    ell(-22,-4,5,1.3,'#5f6669');ell(-22,-3.8,4.2,0.95,'#f4efe2');
    ctx.beginPath();ctx.moveTo(-27,-4);ctx.lineTo(-29.5,-5);ctx.lineTo(-26.6,-2.6);ctx.closePath();ctx.fillStyle='#b4bbbe';ctx.fill();
    rr(19,-9,17,13,0.6,'#23272a');ctx.strokeStyle='#7a4526';ctx.lineWidth=0.8;ctx.strokeRect(19,-9,17,13);
    txt('HELLO',27.5,-4.6,3.2,'#f0f0e8');txt('COFFEE',27.5,-0.8,3.2,'#f0f0e8');
    rr(26.7,4,1.6,6,0,'#5a3219');
    /* saucer, cup */
    ell(0,13.4,21,5.6,'rgba(0,0,0,0.32)');
    ell(0,12,20,5.4,lg(-20,0,20,0,[0,'#d9d4c6',0.4,'#ffffff',1,'#c4bead']));ell(0,11.6,13,3.4,'rgba(120,110,90,0.18)');
    ctx.strokeStyle='#e4dfd2';ctx.lineWidth=2.3;ctx.beginPath();ctx.ellipse(13,1.5,5,5.4,0,-1.2,1.5);ctx.stroke();
    ctx.strokeStyle='rgba(0,0,0,0.12)';ctx.lineWidth=0.5;ctx.beginPath();ctx.ellipse(13,1.5,6.1,6.5,0,0.2,1.5);ctx.stroke();
    ctx.beginPath();ctx.moveTo(-12.5,-6);ctx.bezierCurveTo(-12.5,4,-9,10.6,-6,11);ctx.lineTo(6,11);ctx.bezierCurveTo(9,10.6,12.5,4,12.5,-6);ctx.closePath();
    ctx.fillStyle=lg(-12.5,0,12.5,0,[0,'#cfc8b6',0.28,'#ffffff',0.62,'#efeadc',1,'#b9b29f']);ctx.fill();
    ell(0,-6,12.5,3.7,'#f8f5ec');
    ell(0,-5.6,11,3,rg(-2,-6,11,[0,'#d39a5c',0.7,'#9a6232',1,'#6f4320']));
    ctx.save();ctx.beginPath();ctx.ellipse(0,-5.6,11,3,0,0,TAU);ctx.clip();
    for(k=0;k<6;k++){ctx.strokeStyle='rgba(255,247,232,0.92)';ctx.lineWidth=0.5;ctx.beginPath();ctx.ellipse(0,-6.6+k*0.1,6.2-k*0.9,2.3-k*0.34,0,0.25,Math.PI-0.25);ctx.stroke();}
    ctx.strokeStyle='rgba(255,247,232,0.92)';ctx.lineWidth=0.45;ctx.beginPath();ctx.moveTo(0,-7.8);ctx.lineTo(0,-3.4);ctx.stroke();
    ell(0,-7.6,1.1,0.5,'rgba(255,247,232,0.95)');
    ctx.restore();
    ell(-5.5,-0.5,2,5.5,'rgba(255,255,255,0.35)',0.12);
    steam(0,-8.5,3,17);
    /* spoon and beans */
    ctx.strokeStyle=lg(-18,0,-6,0,[0,'#9aa1a4',1,'#e6eaeb']);ctx.lineWidth=0.8;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-17,13.6);ctx.lineTo(-7.5,14.6);ctx.stroke();ell(-5.8,14.8,2.2,1,'#d5dadc',0.1);ell(-6.1,14.6,1.4,0.55,'#f4f6f6',0.1);
    [[24,15,0.4],[28,17.5,-0.5],[21,18.4,1.1],[-28,16,0.8],[-24,18.2,-0.3],[31,14.4,0.1]].forEach(function(b){
      ell(b[0],b[1]+0.4,1.5,0.7,'rgba(0,0,0,0.3)',b[2]);ell(b[0],b[1],1.5,0.95,'#4a2816',b[2]);
      ctx.save();ctx.translate(b[0],b[1]);ctx.rotate(b[2]);ctx.strokeStyle='#22100a';ctx.lineWidth=0.22;ctx.beginPath();ctx.moveTo(-1.2,0);ctx.quadraticCurveTo(0,0.35,1.2,0);ctx.stroke();ell(-0.3,-0.4,0.6,0.2,'rgba(255,255,255,0.18)');ctx.restore();
    });
  }
  function onePie(x,y,sc,st){
    ctx.save();ctx.translate(x,y);ctx.scale(sc,sc);
    ell(0,10.6,25,6.6,'rgba(0,0,0,0.32)');
    ell(0,9.4,24,6.3,lg(-24,0,24,0,[0,'#d5d0c2',0.4,'#ffffff',1,'#c2bcab']));ell(0,9.1,18.5,4.6,'rgba(120,110,90,0.2)');
    ctx.beginPath();ctx.ellipse(0,7,14.6,3.9,0,0,Math.PI);ctx.lineTo(-17,0);ctx.ellipse(0,0,17,4.8,0,Math.PI,0,true);ctx.closePath();
    ctx.fillStyle=lg(0,0,0,11,[0,'#d39a44',0.5,'#b3742a',1,'#8a5418']);ctx.fill();
    ctx.fillStyle=lg(-17,0,17,0,[0,'rgba(60,30,5,0.3)',0.3,'rgba(255,230,170,0.16)',1,'rgba(60,30,5,0.35)']);ctx.fill();
    ell(0,0,17,4.8,rg(-3,-1,17,[0,'#f6d078',0.6,'#dba445',1,'#b97a2a']));
    for(var m=0;m<26;m++){var a=m/26*TAU,ex=Math.cos(a)*15.8,ey=Math.sin(a)*4.3;ell(ex,ey,1.5,0.85,'#b06f24',a);ell(ex-0.2,ey-0.25,1,0.45,'#e9b65a',a);}
    ell(0,-0.2,12.4,3.2,rg(-3,-1,12,[0,'#f9d98a',1,'#e0aa4c']));
    ctx.strokeStyle='#7a4a16';ctx.lineWidth=0.5;ctx.lineCap='round';
    for(m=-1;m<2;m++){ctx.beginPath();ctx.moveTo(m*3.2-0.9,-0.9);ctx.lineTo(m*3.2+0.9,0.7);ctx.stroke();}
    ell(-5.5,-1.4,4.6,0.9,'rgba(255,246,210,0.5)',-0.08);
    [[-9,1.2],[7,1.6],[10,-0.6],[-3,2.2],[4,-2]].forEach(function(f){ell(f[0],f[1],0.5,0.22,'rgba(150,90,30,0.55)',f[0]);});
    if(st){steam(0,-3,3,16);}
    ctx.restore();
  }
  function pie(){
    table();
    /* paper bag and a second pie behind */
    ctx.beginPath();ctx.moveTo(17,9);ctx.lineTo(18.4,-13);ctx.lineTo(21,-11.4);ctx.lineTo(24,-13.4);ctx.lineTo(27,-11.4);ctx.lineTo(30,-13.4);ctx.lineTo(33,-11.4);ctx.lineTo(35.6,-13);ctx.lineTo(37,9);ctx.closePath();
    ctx.fillStyle=lg(17,0,37,0,[0,'#b08d5e',0.35,'#d2b384',1,'#9a7848']);ctx.fill();
    ctx.strokeStyle='rgba(90,60,25,0.3)';ctx.lineWidth=0.3;ctx.beginPath();ctx.moveTo(22,-12);ctx.lineTo(21,9);ctx.moveTo(33,-12);ctx.lineTo(34,9);ctx.stroke();
    ctx.strokeStyle='#4a3a26';ctx.lineWidth=0.3;ctx.beginPath();ctx.arc(27,-2,5.2,0,TAU);ctx.stroke();txt('FORREST',27,-2.9,1.9,'#4a3a26');txt('GENERAL',27,-0.9,1.9,'#4a3a26');
    onePie(-24,3,0.5,false);
    onePie(0,5,1,true);
    /* fork */
    ctx.save();ctx.translate(-22,17.4);ctx.rotate(0.12);ctx.fillStyle=lg(0,-0.5,0,0.6,[0,'#f0f3f3',1,'#9aa1a4']);ctx.fillRect(0,-0.4,10,0.8);rr(10,-1.1,3,2.2,0.6,ctx.fillStyle);for(k=0;k<4;k++){ctx.fillRect(13,-1.1+k*0.62,3.4,0.34);}ctx.restore();
  }
  function produce(){
    table();
    var inB={},slots=[-10,-3.4,3.4,10];
    hamper.forEach(function(id){inB[id]=1;});
    /* handle, then whatever is in the hamper, then the basket over the top */
    ctx.strokeStyle=lg(-16,0,16,0,[0,'#7a5226',0.5,'#b9843e',1,'#6f481f']);ctx.lineWidth=2.6;ctx.beginPath();ctx.ellipse(0,-5,15.5,19,0,Math.PI,0);ctx.stroke();
    ctx.strokeStyle='rgba(60,35,10,0.4)';ctx.lineWidth=0.3;for(k=0;k<22;k++){var ha=Math.PI+k/21*Math.PI;ctx.beginPath();ctx.moveTo(Math.cos(ha)*14.3,-5+Math.sin(ha)*17.8);ctx.lineTo(Math.cos(ha+0.05)*16.7,-5+Math.sin(ha+0.05)*20.2);ctx.stroke();}
    hamper.forEach(function(id,n){
      var sx=slots[n%4];
      if(id==='olives'){jar(sx,-1,1.25,'#4f6a2a','#22302b','#6f8f35');}
      else if(id==='chutney'){jar(sx,-1,1.25,'#6b2c55','#c9a23a');}
      else if(id==='cheese'){cheese(sx,-2.5,0.95);}
      else{salami(sx,0,1,false);}
    });
    if(hamper.length){ctx.beginPath();ctx.moveTo(-17,-4);ctx.quadraticCurveTo(-9,-7.5,-1,-4.6);ctx.quadraticCurveTo(8,-7.8,17,-4);ctx.lineTo(17,-2);ctx.lineTo(-17,-2);ctx.closePath();ctx.fillStyle='#efe8d6';ctx.fill();}
    ell(0,13,19,3.4,'rgba(0,0,0,0.35)');
    ctx.beginPath();ctx.moveTo(-18,-4);ctx.lineTo(18,-4);ctx.lineTo(15.4,12);ctx.quadraticCurveTo(0,14,-15.4,12);ctx.closePath();
    ctx.fillStyle=lg(-18,0,18,0,[0,'#7f5524',0.3,'#c08a44',0.6,'#a8763a',1,'#6a441c']);ctx.fill();
    ctx.save();ctx.clip();
    for(k=0;k<8;k++){var wy=-3.4+k*2.1;ctx.fillStyle='rgba(60,35,10,0.34)';ctx.fillRect(-19,wy+1.7,38,0.4);
      for(var wi=0;wi<16;wi++){var wx=-18+wi*2.4+(k%2)*1.2;ctx.fillStyle='rgba(60,35,10,0.3)';ctx.fillRect(wx,wy,0.35,1.8);ctx.fillStyle='rgba(255,225,160,0.2)';ctx.fillRect(wx+0.5,wy+0.2,1.3,0.45);}}
    ctx.restore();
    rr(-19.5,-6.2,39,3,1.4,lg(0,-6.2,0,-3.2,[0,'#c7924a',1,'#7f5524']));
    ctx.strokeStyle='rgba(60,35,10,0.4)';ctx.lineWidth=0.3;for(k=0;k<26;k++){ctx.beginPath();ctx.moveTo(-18.6+k*1.5,-6);ctx.lineTo(-17.6+k*1.5,-3.4);ctx.stroke();}
    if(!hamper.length){ctx.strokeStyle='#d9cfb4';ctx.lineWidth=0.25;ctx.beginPath();ctx.moveTo(0,-4);ctx.lineTo(0,1);ctx.stroke();rr(-9,1,18,5.4,0.5,'#f3eddc');txt('COMING SOON',0,3.8,2.5,'#3a2a1a');}
    /* what is still on the table */
    if(!inB.olives){jar(-31,13,1.2,'#4f6a2a','#22302b','#6f8f35');}
    if(!inB.cheese){cheese(-22.5,18,0.95);}
    if(!inB.meats){salami(27,17,0.95,true);}
    if(!inB.chutney){jar(31,11.5,1.1,'#6b2c55','#c9a23a');}
    /* gin stays on the table: in store only */
    rr(22,-6,4.6,13,0.8,lg(22,0,26.6,0,[0,'rgba(215,235,228,0.95)',0.5,'rgba(170,205,195,0.9)',1,'rgba(120,160,150,0.95)']));rr(23.4,-10.6,1.8,5,0.3,'#bcd6cd');rr(23.1,-11.8,2.4,1.6,0.3,'#2a2a2a');rr(22.5,-2.6,3.6,5.4,0.2,'#f3eddc');txt('GIN',24.3,0.1,1.5,'#2a2a2a');
  }

  /* backdrop: warm dark, lights streaming past as you move forward */
  g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1d120c');g.addColorStop(0.55,'#3d281b');g.addColorStop(1,'#170e08');
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  var M=Math.max(W,H);
  for(i=0;i<34;i++){
    var an=i*2.399,dp=(((i*0.171+c*0.55+(reduce?0:t*0.004))%1)+1)%1,rad=(0.08+dp*dp*0.9)*M,bx=cx+Math.cos(an)*rad,by=cy-6*u+Math.sin(an)*rad*0.7,br=(2+dp*9+(i%3)*1.5)*u,al=Math.sin(dp*Math.PI)*(0.16+(i%4)*0.035);
    ctx.fillStyle=rg(bx,by,br,[0,'rgba(255,210,135,'+al.toFixed(3)+')',1,'rgba(255,210,135,0)']);ctx.fillRect(bx-br,by-br,br*2,br*2);
  }
  /* the three items, far to near */
  var scenes=[coffee,pie,produce];
  for(i=2;i>=0;i--){
    var d=c-i,s,a,x=cx,y=cy;
    if(d<=-1||d>=0.9){continue;}
    if(d<0){s=1/(1-2.4*d);a=clamp((d+0.62)*2.6);y=cy-(1-s)*5*u;}
    else{s=1/(1-0.72*d);a=clamp((0.85-d)*3);x=cx+(i%2?-1:1)*d*d*W*0.9;y=cy+d*d*H*0.12;}
    var near=1-clamp(Math.abs(d)*2.2);
    if(near>0){ctx.fillStyle=rg(x,y-2*u,58*u,[0,'rgba(255,200,120,'+(0.3*near).toFixed(3)+')',1,'rgba(255,200,120,0)']);ctx.fillRect(x-58*u,y-60*u,116*u,116*u);}
    ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(u*s,u*s);scenes[i]();ctx.restore();
  }
  ctx.globalAlpha=1;
  g=ctx.createRadialGradient(W/2,H*0.45,Math.min(W,H)*0.3,W/2,H*0.5,M*0.75);g.addColorStop(0,'rgba(20,10,4,0)');g.addColorStop(1,'rgba(20,10,4,0.45)');
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
}
