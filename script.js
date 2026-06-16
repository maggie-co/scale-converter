// Unit -> millimeters. Add a unit here and it works everywhere.
const U = { in:25.4, ft:304.8, mm:1, cm:10, m:1000 };

const realVal = document.getElementById('realVal');
const realUnit = document.getElementById('realUnit');
const modelVal = document.getElementById('modelVal');
const modelUnit = document.getElementById('modelUnit');
const scale = document.getElementById('scale');
const customWrap = document.getElementById('customWrap');
const customN = document.getElementById('customN');
const scaleInfo = document.getElementById('scaleInfo');
const paperInfo = document.getElementById('paperInfo');
const resultLabel = document.getElementById('resultLabel');
const bigValue = document.getElementById('bigValue');
const alsoLine = document.getElementById('alsoLine');
const copyBtn = document.getElementById('copyBtn');

let lastEdited = 'real';
let copyText = '';

function fmt(v){
  if(!isFinite(v)) return '—';
  const a = Math.abs(v);
  let d;
  if(a===0) return '0';
  if(a>=1000) d=0; else if(a>=100) d=1; else if(a>=1) d=2;
  else if(a>=0.1) d=3; else d=4;
  let s = v.toFixed(d);
  if(s.indexOf('.')>=0) s = s.replace(/0+$/,'').replace(/\.$/,'');
  return s;
}

function currentN(){
  if(scale.value === 'custom'){
    const v = parseFloat(customN.value);
    return (isFinite(v) && v>0) ? v : NaN;
  }
  return parseFloat(scale.value);
}

function paperHint(n){
  if(!isFinite(n)) return '';
  if(n<=24) return 'Best for details and small objects. Fits A4–A3.';
  if(n<=60) return 'Good for furniture and room plans. Fits A3 or 11×17.';
  if(n<=120) return 'Floor plans. Use A3–A2.';
  if(n<=250) return 'Building and site plans. A2 or larger.';
  return 'Masterplans. A1 or larger.';
}

function updateScaleInfo(n){
  let label;
  if(scale.value === 'custom'){
    label = 'Custom (1:' + (isFinite(n)?fmt(n):'?') + ')';
  } else {
    label = scale.options[scale.selectedIndex].text;
  }
  scaleInfo.textContent = isFinite(n)
    ? label + '  ·  divide real by ' + fmt(n) + ' for model'
    : label + '  ·  enter a scale';
  paperInfo.textContent = paperHint(n);
}

function clearResult(){
  bigValue.textContent = '—';
  alsoLine.textContent = '';
  copyText = '';
}

function renderResult(mm, label, outUnit){
  resultLabel.textContent = label;
  bigValue.textContent = fmt(mm / U[outUnit]) + ' ' + outUnit;
  const all = {
    in: mm/U.in, ft: mm/U.ft, mm: mm/U.mm, cm: mm/U.cm, m: mm/U.m
  };
  const also = Object.keys(all)
    .filter(u => u !== outUnit)
    .map(u => fmt(all[u]) + ' ' + u)
    .join('   ·   ');
  alsoLine.textContent = 'Also:  ' + also;
  copyText = Object.keys(all).map(u => fmt(all[u]) + ' ' + u).join(' / ');
}

function compute(){
  const n = currentN();
  updateScaleInfo(n);
  if(!isFinite(n)){ clearResult(); return; }

  if(lastEdited === 'model'){
    const v = parseFloat(modelVal.value);
    if(!isFinite(v)){ clearResult(); realVal.value=''; return; }
    const modelMM = v * U[modelUnit.value];
    const realMM = modelMM * n;
    realVal.value = fmt(realMM / U[realUnit.value]);
    renderResult(realMM, 'Real size', realUnit.value);
  } else {
    const v = parseFloat(realVal.value);
    if(!isFinite(v)){ clearResult(); modelVal.value=''; return; }
    const realMM = v * U[realUnit.value];
    const modelMM = realMM / n;
    modelVal.value = fmt(modelMM / U[modelUnit.value]);
    renderResult(modelMM, 'Model size', modelUnit.value);
  }
}

realVal.addEventListener('input', () => { lastEdited='real'; compute(); });
modelVal.addEventListener('input', () => { lastEdited='model'; compute(); });
realUnit.addEventListener('change', compute);
modelUnit.addEventListener('change', compute);
customN.addEventListener('input', compute);
scale.addEventListener('change', () => {
  const isCustom = scale.value === 'custom';
  customWrap.classList.toggle('hidden', !isCustom);
  if(isCustom) customN.focus();
  compute();
});
copyBtn.addEventListener('click', async () => {
  if(!copyText) return;
  try{
    await navigator.clipboard.writeText(copyText);
    copyBtn.textContent = 'Copied';
    setTimeout(() => copyBtn.textContent = 'Copy all', 1200);
  }catch(e){ copyBtn.textContent = 'Copy failed'; }
});

compute();   // run once on load
