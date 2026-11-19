/* Vertebra Medical — премиум-слой (скрипт). Ничего не ломает: заявки, админка и store.js работают как раньше. */
(function(){
  'use strict';
  var ICONS={
    '🦴':'<rect x="8.5" y="2.8" width="7" height="3.2" rx="1.6"/><rect x="7.5" y="7.6" width="9" height="3.2" rx="1.6"/><rect x="7.5" y="12.4" width="9" height="3.2" rx="1.6"/><rect x="8.5" y="17.2" width="7" height="3.2" rx="1.6"/>',
    '🦵':'<circle cx="12" cy="12" r="3"/><path d="M10 10L6.6 5.6M14 14l3.4 4.4"/><circle cx="5.6" cy="4.6" r="1.7"/><circle cx="18.4" cy="19.4" r="1.7"/>',
    '👣':'<ellipse cx="11" cy="16.5" rx="4" ry="4.8"/><circle cx="7.6" cy="8.3" r="1.7"/><circle cx="12" cy="6.2" r="1.4"/><circle cx="15.4" cy="7.2" r="1.2"/><circle cx="18" cy="9.8" r="1.1"/>',
    '🧍':'<circle cx="12" cy="4.8" r="2.2"/><path d="M12 8v7M8.5 10.5h7M10 21.5l2-6.5 2 6.5"/>',
    '💆':'<circle cx="12" cy="7.5" r="3.2"/><path d="M5 20c0-4 3-6.5 7-6.5s7 2.5 7 6.5"/>',
    '👵':'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    '🎁':'<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12M12 8c-1.4-3.4-5-3.6-5-1.6S10 8 12 8zm0 0c1.4-3.4 5-3.6 5-1.6S14 8 12 8z"/>',
    '🦻':'<rect x="4.5" y="3" width="15" height="18" rx="2.2"/><path d="M12 6v12M9 8h6M9.5 11h5M10 14h4"/>',
    '🕘':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    '📍':'<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/>'
  };
  // 🩻 в некоторых окружениях приходит как 🩻
  ICONS['🩻']=ICONS['🦻'];
  var RE=new RegExp('('+Object.keys(ICONS).join('|')+')\\uFE0F?','g');
  var SKIP={SCRIPT:1,STYLE:1,TEXTAREA:1,OPTION:1,SELECT:1,TITLE:1,INPUT:1};

  function svg(k){var s=document.createElement('vb-icon');s.className='vb-i';s.setAttribute('aria-hidden','true');s.innerHTML='<svg viewBox="0 0 24 24" focusable="false">'+ICONS[k]+'</svg>';return s}

  function swapEmoji(root){
    var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
      if(!n.nodeValue||n.parentNode&&SKIP[n.parentNode.nodeName])return NodeFilter.FILTER_REJECT;
      RE.lastIndex=0;return RE.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
    var list=[],n;while(n=w.nextNode())list.push(n);
    list.forEach(function(t){
      var txt=t.nodeValue,frag=document.createDocumentFragment(),last=0,m;RE.lastIndex=0;
      while(m=RE.exec(txt)){
        if(m.index>last)frag.appendChild(document.createTextNode(txt.slice(last,m.index)));
        frag.appendChild(svg(m[1]));last=RE.lastIndex}
      if(last<txt.length)frag.appendChild(document.createTextNode(txt.slice(last)));
      t.parentNode.replaceChild(frag,t)});
  }

  function addExtras(){
    var hero=document.querySelector('section.hero');
    if(hero&&!document.querySelector('.vb-marquee')){
      var items=['Без операций','Консультация врача','Пробная процедура в подарок','Разбор МРТ и КТ','Ударно-волновая терапия','Мануальная терапия','PRP-терапия','Ежедневно с 9 до 20'];
      var one='<span>'+items.join('</span><span>')+'</span>';
      var m=document.createElement('div');m.className='vb-marquee';m.setAttribute('aria-hidden','true');
      m.innerHTML='<div class="vb-track">'+one+one+'</div>';
      hero.parentNode.insertBefore(m,hero.nextSibling)}
    var art=document.querySelector('.hero-art');
    if(art&&!art.querySelector('.vb-pill')){
      var r=document.getElementById('sRating'),p=document.createElement('div');p.className='vb-pill';
      p.innerHTML='<i>★★★★★</i><span>'+((r&&r.textContent.trim())||'5.0')+' в 2ГИС</span>';
      art.insertBefore(p,art.firstChild)}
    if(!document.querySelector('.vb-progress')){
      var b=document.createElement('div');b.className='vb-progress';document.body.appendChild(b);
      var f=function(){var h=document.documentElement,max=h.scrollHeight-h.clientHeight;b.style.transform='scaleX('+(max>0?Math.min(1,h.scrollTop/max):0)+')'};
      addEventListener('scroll',f,{passive:true});addEventListener('resize',f);f()}
  }

  var busy=false;
  function run(){if(busy)return;busy=true;requestAnimationFrame(function(){busy=false;swapEmoji(document.body)})}
  function start(){
    swapEmoji(document.body);addExtras();
    new MutationObserver(run).observe(document.body,{childList:true,subtree:true,characterData:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
