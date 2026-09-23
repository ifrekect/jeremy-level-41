'use strict';
const KEY='jeremy41-session';
const blank=()=>({mood:[],restaurants:[],dining:'',cooking:'',activities:[],activityOther:'',gifts:[],giftNotes:'',wish:''});
let answers=blank(),step=0,busy=false;
const app=document.querySelector('#app');
const mood=['Relaxed & Smooth','Adventure Mode','Romantic','Surprise Me, Bae','A Little Bit of Everything'];
const restaurants=['Nando’s','Steakhouse','Waterfront Restaurant','Somewhere New','Surprise Me, Bae'];
const activityGroups={'Water / Outdoors':['Fishing Day','Boat Ride','Waterfront Dinner + Walk','Beach Day','Lakeside Getaway','Sunset by the Water'],'Travel / Adventure':['Day Trip','Surprise Road Trip','Explore Somewhere New','Mini Getaway','Adventure Packed Into One Day'],Relax:['Spa Day','Couples Massage','Relaxing Hotel / Resort Day'],'Wild Card':['Surprise Me, Bae','Plan Something I Would Never Expect']};
const gifts=['Spa Day','Massage','Something for Fishing','Something for Travel','Something Practical','Something Romantic','Surprise Me','I Don’t Need Anything'];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const selected=(key,value)=>answers[key].includes(value);
const buttons=(items,key)=>`<div class="choices">${items.map(x=>`<button type="button" class="choice" data-key="${key}" data-value="${esc(x)}" aria-pressed="${selected(key,x)}">${esc(x)}</button>`).join('')}</div>`;
const field=(key,label,placeholder='',multi=false)=>`<label class="field" for="${key}">${label}${multi?`<textarea id="${key}" data-field="${key}" placeholder="${placeholder}" maxlength="800">${esc(answers[key])}</textarea>`:`<input id="${key}" data-field="${key}" type="text" value="${esc(answers[key])}" placeholder="${placeholder}" maxlength="300">`}</label>`;
const nav=(next='Continue')=>`<div class="actions"><button type="button" class="back" data-go="${step-1}">← Back</button><button type="button" class="primary" data-go="${step+1}">${next} →</button></div>`;
const shell=(title,body,intro='')=>`<section class="panel"><div class="stephead"><span class="progress">CHAPTER 0${step} / 06</span><span class="track" aria-hidden="true"><i style="width:${step/6*100}%"></i></span></div><div class="eyebrow">THE BIRTHDAY BLUEPRINT</div><h2>${title}</h2>${intro?`<p class="intro">${intro}</p>`:''}${body}</section>`;
const readable=x=>Array.isArray(x)?x.join(', ')||'No selection':x||'No answer yet';
const rows=[['Birthday mood','mood'],['Restaurant choices','restaurants'],['If we go out','dining'],['If we stay home','cooking'],['Activities','activities'],['Something else to do','activityOther'],['Gifts','gifts'],['Gift notes','giftNotes'],['Perfect birthday wish','wish']];
function summary(){return rows.map(([label,key])=>`${label}: ${readable(answers[key])}`).join('\n');}
function persist(){try{sessionStorage.setItem(KEY,JSON.stringify(answers))}catch{}}
function render(){let content='';if(step===0){content=`<section class="panel opening"><div class="eyebrow">OCTOBER 01 · AN EXCLUSIVE EXPERIENCE</div><div class="hero-number" aria-hidden="true">41</div><div class="rule"></div><h1>Jeremy: Level 41 Unlocked</h1><p>A birthday experience created exclusively for Bae.<br>One day. Your rules. Royal treatment only.</p><button type="button" class="primary" data-start>Begin My 41st Birthday Experience →</button></section>`}
if(step===1)content=shell('What Kind of 41 Are We Having?',buttons(mood,'mood')+nav(),'Set the tone for your day, birthday king. Choose all the moods you like.');
if(step===2)content=shell('What’s the Move, Bae? 🍽️',buttons(restaurants,'restaurants')+field('dining','If we go out, where do you want to eat?','Name the spot or cuisine')+field('cooking','If we stay home, what would you like cooked?','Tell Bae what sounds good')+nav(),'Choose a spot, a home cooked meal, or both.');
if(step===3)content=shell('The Day Is Yours',Object.entries(activityGroups).map(([group,items])=>`<h3>${group}</h3>${buttons(items,'activities')}`).join('')+`<p class="note" id="activity-count">${answers.activities.length} selected</p>`+field('activityOther','Something else I’d love to do…','Your idea',true)+nav(),'Choose all the moves you like. Waterfront time is always a good call.');
if(step===4)content=shell('What Would Make You Smile? 👑',buttons(gifts,'gifts')+`<p class="note" id="gift-count">${answers.gifts.length} selected</p>`+field('giftNotes','If there’s something specific you want, tell Bae here…','A hint never hurts',true)+nav(),'Choose all the gifts you like. A little direction keeps the mission on track.');
if(step===5)content=shell('The Perfect Detail',field('wish','One thing that would make this birthday perfect…','Say what’s on your mind',true)+nav('Review my plan'),'One last wish. Big or small, Bae wants to know.');
if(step===6)content=shell('Your Birthday, Your Way',`<div class="review">${rows.map(([label,key])=>`<article><strong>${label}</strong><span>${esc(readable(answers[key]))}</span></article>`).join('')}</div><div id="submit-error" role="alert"></div><div class="actions"><button type="button" class="back" data-go="5">← Back</button><button type="button" class="secondary" data-go="1">Edit choices</button><button type="button" class="primary" id="submit">Submit My Birthday Plan →</button></div>`,'Look it over. You can still make changes before sending it.');
if(step===7)content=`<section class="panel final"><div class="confetti-wrap" aria-hidden="true">${Array.from({length:32},(_,i)=>`<i class="confetti" style="--x:${(i*73)%100}%;--c:${i%3?'#d8ad75':'#c62a16'};--d:${4+i%5}s;--delay:-${i%7}s"></i>`).join('')}</div><div class="eyebrow">THE NEXT CHAPTER BEGINS</div><div class="hero-number" aria-hidden="true">41</div><h2>Level 41: Activated</h2><p>Jeremy, you are loved, appreciated, and everything God designed you to be. Continue to thrive, continue to grow, and continue being exactly who you are.</p><p class="verse"><strong>Philippians 4:13</strong><br>“You can do all things through Christ who strengthens you.”</p><p>Now relax. Bae has the rest handled. 😏❤️</p></section>`;
app.innerHTML=content;window.scrollTo({top:0,behavior:'instant'});}
function go(n){if(busy||n<0||n>7)return;step=n;render()}
app.addEventListener('input',e=>{const field=e.target.dataset.field;if(field){answers[field]=e.target.value;persist()}});
app.addEventListener('click',async e=>{const start=e.target.closest('[data-start]');if(start){answers=blank();persist();startAnthem();go(1);return}const choice=e.target.closest('[data-key]');if(choice){const {key,value}=choice.dataset;const list=answers[key],index=list.indexOf(value);if(index>=0)list.splice(index,1);else list.push(value);persist();app.querySelectorAll(`[data-key="${key}"]`).forEach(btn=>btn.setAttribute('aria-pressed',String(selected(key,btn.dataset.value))));const count=app.querySelector(`#${key==='activities'?'activity':'gift'}-count`);if(count&&(key==='activities'||key==='gifts'))count.textContent=`${answers[key].length} selected`;return}const next=e.target.closest('[data-go]');if(next){go(Number(next.dataset.go));return}if(e.target.closest('#submit')){const button=app.querySelector('#submit'),error=app.querySelector('#submit-error');error.textContent='';busy=true;button.disabled=true;button.textContent='Sending your plan…';try{await sendBirthdayPlan(answers,summary());sessionStorage.removeItem(KEY);busy=false;go(7)}catch(err){error.className='error';error.textContent=err.message||'We couldn’t send your plan. Please try again.';button.disabled=false;button.textContent='Retry Submission →'}finally{busy=false}}});
document.querySelector('#brand').addEventListener('click',e=>{e.preventDefault();go(0)});
// An unfinished refresh keeps the current browser tab's answers. The opening button always starts fresh.
try{const saved=JSON.parse(sessionStorage.getItem(KEY));if(saved&&typeof saved==='object'){answers={...blank(),...saved};for(const key of ['mood','restaurants','activities','gifts']){answers[key]=Array.isArray(answers[key])?answers[key]:(answers[key]?[String(answers[key])]:[])}}}catch{}render();

// One audio element lives outside the planner so screen changes never restart it.
const birthdayAudio=document.querySelector('#birthday-audio');
const musicToggle=document.querySelector('#music-toggle');
let musicPausedByVisitor=false;
birthdayAudio.volume=0.55;
function updateMusicControl(){
  const playing=!birthdayAudio.paused;
  musicToggle.textContent=playing?'♫ Pause music':'♫ Play music';
  musicToggle.setAttribute('aria-label',playing?'Pause birthday music':'Play birthday music');
  musicToggle.setAttribute('aria-pressed',String(playing));
}
function startAnthem(){
  if(musicPausedByVisitor||!birthdayAudio.paused)return;
  // Autoplay is best effort. A rejected request is retried from a real user tap.
  birthdayAudio.play().catch(()=>updateMusicControl());
}
function startFromInteraction(event){
  if(event.target.closest?.('#music-toggle'))return;
  if(event.type==='keydown'&&(event.ctrlKey||event.metaKey||event.altKey))return;
  startAnthem();
}
function removeStartupListeners(){
  document.removeEventListener('pointerdown',startFromInteraction);
  document.removeEventListener('keydown',startFromInteraction);
}
birthdayAudio.addEventListener('playing',()=>{updateMusicControl();removeStartupListeners()});
birthdayAudio.addEventListener('pause',updateMusicControl);
birthdayAudio.addEventListener('error',()=>{
  musicToggle.textContent='Music unavailable';
  musicToggle.setAttribute('aria-label','The music file could not be loaded');
  musicToggle.setAttribute('aria-pressed','false');
  musicToggle.disabled=true;
  removeStartupListeners();
});
musicToggle.addEventListener('click',()=>{
  if(birthdayAudio.paused){musicPausedByVisitor=false;startAnthem()}
  else{musicPausedByVisitor=true;birthdayAudio.pause()}
});
document.addEventListener('pointerdown',startFromInteraction);
document.addEventListener('keydown',startFromInteraction);
startAnthem();
