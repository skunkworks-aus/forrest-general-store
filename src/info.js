
/* ---------- opening hours: one source for the badge, the status line and the table ---------- */
(function(){
'use strict';
var OPEN=8,CLOSE_WEEKDAY=16,CLOSE_WEEKEND=14;
var fmt=new Intl.DateTimeFormat('en-AU',{timeZone:'Australia/Melbourne',weekday:'short',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',hourCycle:'h23'});
function melb(d){var o={};fmt.formatToParts(d).forEach(function(p){o[p.type]=p.value;});return {wd:o.weekday,mo:+o.month,day:+o.day,mins:(+o.hour)*60+(+o.minute)};}
function hr(h){return (h>12?h-12:h)+(h>=12?'pm':'am');}
function status(d){
  var n=melb(d),xmas=n.mo===12&&n.day===25,we=n.wd==='Sat'||n.wd==='Sun',close=we?CLOSE_WEEKEND:CLOSE_WEEKDAY;
  if(xmas){return {open:false,we:we,xmas:true,text:'Closed today for Christmas Day. Opens 8am tomorrow.',short:'Closed today'};}
  if(n.mins>=OPEN*60&&n.mins<close*60){return {open:true,we:we,text:'Open now until '+hr(close)+'.',short:'Open until '+hr(close)};}
  if(n.mins<OPEN*60){return {open:false,we:we,text:'Closed now. Opens 8am today.',short:'Opens 8am'};}
  if(n.mo===12&&n.day===24){return {open:false,we:we,text:'Closed now. Closed tomorrow for Christmas Day, then open from 8am on 26 December.',short:'Closed now'};}
  return {open:false,we:we,text:'Closed now. Opens 8am tomorrow.',short:'Opens 8am tomorrow'};
}
function paint(){
  var s=status(new Date());
  document.getElementById('now').textContent=s.text;
  document.getElementById('badge-text').textContent=s.short;
  document.getElementById('badge').className='badge'+(s.open?' is-open':'');
  document.getElementById('row-wk').className=!s.xmas&&!s.we?'today':'';
  document.getElementById('row-we').className=!s.xmas&&s.we?'today':'';
  document.getElementById('row-x').className=s.xmas?'today':'';
}
try{paint();setInterval(paint,30000);}catch(e){}
document.getElementById('yr').textContent=new Date().getFullYear();
})();
