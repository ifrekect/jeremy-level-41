// Separate Formspree form for Jeremy's birthday planner.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqpabgnz';
async function sendBirthdayPlan(data,summary){
  if(!/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(FORMSPREE_ENDPOINT))throw new Error('The birthday form is not connected yet. Please ask the planner to add the separate Formspree endpoint. Your answers are saved in this tab.');
  const response=await fetch(FORMSPREE_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({_subject:'🎂 Jeremy Submitted His 41st Birthday Plan!',name:'Jeremy Dumas',birthday_mood:(Array.isArray(data.mood)?data.mood.join(', '):data.mood)||'No answer',restaurant_choices:data.restaurants.join(', ')||'No answer',dining_out:data.dining||'No answer',home_cooked_meal:data.cooking||'No answer',activities:data.activities.join(', ')||'No answer',activity_other:data.activityOther||'No answer',gifts:data.gifts.join(', ')||'No answer',gift_notes:data.giftNotes||'No answer',perfect_birthday:data.wish||'No answer',full_birthday_summary:summary})});
  if(!response.ok){throw new Error('Your answers could not be sent. Please try again; everything is still saved here.')}return true;
}
