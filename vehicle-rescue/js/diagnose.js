// diagnose.js - VehicleRescue Fault Diagnosis Logic

// ---- FAULT DATABASE ----
const faults = {
  car: [
    {
      id: 'engine_misfire',
      emoji: '💥',
      title: 'Engine Misfire',
      hint: 'Rough idle, shaking',
      severity: 'high',
      description: 'Your engine is not firing on all cylinders. This is usually caused by a worn spark plug, bad ignition coil, or fuel injector issue. Do NOT drive at high speed. Get to a garage as soon as possible to avoid engine damage.'
    },
    {
      id: 'battery_low',
      emoji: '🔋',
      title: 'Battery / Electrical Issue',
      hint: 'Won\'t start, dim lights',
      severity: 'high',
      description: 'Your battery voltage is low or there\'s an electrical fault. The car may not restart once turned off. Keep the engine running if possible and head straight to the nearest garage. Avoid using AC or heavy electrics.'
    },
    {
      id: 'overheating',
      emoji: '🌡️',
      title: 'Engine Overheating',
      hint: 'Temp gauge rising, steam',
      severity: 'high',
      description: 'Your engine coolant temperature is dangerously high. STOP the vehicle immediately, turn off the engine, and do NOT open the radiator cap. Wait 15 minutes before calling a mechanic. Continuing to drive will destroy the engine.'
    },
    {
      id: 'flat_tyre',
      emoji: '🛞',
      title: 'Flat Tyre / Puncture',
      hint: 'Pulling to one side, vibration',
      severity: 'med',
      description: 'You have a flat or rapidly deflating tyre. Slow down gradually — do NOT brake hard. Pull over safely, turn on hazard lights, and use your spare tyre if available. Otherwise, call a roadside assistance garage.'
    },
    {
      id: 'brake_issue',
      emoji: '🛑',
      title: 'Brake Warning',
      hint: 'Squealing, soft pedal',
      severity: 'high',
      description: 'Your brakes are showing signs of wear or failure. This is a safety-critical issue. Do not drive fast. Pump the brakes gently and get to a garage immediately. Brake pads or brake fluid may need replacement.'
    },
    {
      id: 'oil_low',
      emoji: '🛢️',
      title: 'Low Engine Oil',
      hint: 'Oil warning light on',
      severity: 'med',
      description: 'Your engine oil level is critically low. Continuing to drive without oil will permanently damage the engine. Stop safely, check the oil level with the dipstick. You may be able to add oil yourself before driving to a garage.'
    },
    {
      id: 'transmission',
      emoji: '⚙️',
      title: 'Transmission / Gear Issue',
      hint: 'Slipping gears, grinding',
      severity: 'med',
      description: 'Your transmission is slipping or struggling to shift gears. This could be low transmission fluid or a worn clutch. Avoid aggressive acceleration. Drive gently to the nearest garage for a diagnosis.'
    },
    {
      id: 'check_engine',
      emoji: '⚠️',
      title: 'Check Engine Light',
      hint: 'Warning light on dashboard',
      severity: 'low',
      description: 'The check engine light has come on. This could be anything from a loose fuel cap to a sensor issue. The car may still be drivable, but you should get it scanned with an OBD2 reader at a garage soon to find the exact fault code.'
    },
  ],
  bike: [
    {
      id: 'bike_wont_start',
      emoji: '🔑',
      title: 'Bike Won\'t Start',
      hint: 'No crank or weak crank',
      severity: 'high',
      description: 'Your bike is not cranking or cranking weakly. This is likely a dead battery, blown fuse, or kickstart issue. Check if the kill switch is off and the side stand is up. If it still won\'t start, you\'ll need a jump start or garage visit.'
    },
    {
      id: 'bike_overheating',
      emoji: '🌡️',
      title: 'Engine Overheating',
      hint: 'Very hot engine, power loss',
      severity: 'high',
      description: 'Your bike engine is running dangerously hot. Pull over immediately in a shaded spot and let it cool for at least 20 minutes with the engine OFF. Check coolant (for liquid-cooled bikes) or look for blocked air vents (for air-cooled bikes).'
    },
    {
      id: 'chain_issue',
      emoji: '⛓️',
      title: 'Chain / Drive Issue',
      hint: 'Clicking, slipping chain',
      severity: 'high',
      description: 'Your drive chain may be loose, broken, or jumped off the sprocket. This is dangerous — a snapped chain can lock the rear wheel. Stop riding immediately. Do NOT try to ride with a loose chain. Call a mechanic or push to the nearest garage.'
    },
    {
      id: 'bike_puncture',
      emoji: '🛞',
      title: 'Tyre Puncture',
      hint: 'Wobbling, losing balance',
      severity: 'high',
      description: 'Your bike tyre is flat or punctured. This is very dangerous on a two-wheeler. Gradually slow down by engine braking — do NOT use the brake sharply. Pull over safely, put the side stand down, and call a nearby puncture repair shop.'
    },
    {
      id: 'bike_brakes',
      emoji: '🛑',
      title: 'Brake Problem',
      hint: 'Spongy lever, grinding noise',
      severity: 'high',
      description: 'Your brake lever feels spongy or is making grinding noises. This means brake pads are worn or brake fluid is low (for disc brakes). Avoid high-speed riding and head to a garage immediately. Do not ride in heavy traffic with faulty brakes.'
    },
    {
      id: 'fuel_empty',
      emoji: '⛽',
      title: 'Out of Fuel',
      hint: 'Engine sputtering, reserve',
      severity: 'low',
      description: 'Your bike has run out of fuel or is very low. Switch to reserve mode if your bike has it (turn petcock to RES). Find the nearest petrol bunk using the garage finder. Most bikes can travel 20–30 km on reserve.'
    },
    {
      id: 'electrical_bike',
      emoji: '⚡',
      title: 'Electrical / Lights Issue',
      hint: 'Lights not working, fuse blown',
      severity: 'med',
      description: 'Your bike has an electrical fault — possibly a blown fuse, loose wiring connection, or faulty regulator. Check the fuse box first. If lights are completely dead, do NOT ride at night. Visit a garage for a proper electrical inspection.'
    },
    {
      id: 'engine_noise',
      emoji: '🔊',
      title: 'Unusual Engine Noise',
      hint: 'Knocking, rattling sound',
      severity: 'med',
      description: 'Your engine is making an unusual knocking or rattling sound. This can indicate low engine oil, loose engine mounts, or internal wear. Reduce your speed, avoid revving hard, and visit a mechanic soon before it becomes a bigger problem.'
    },
  ]
};

// ---- STATE ----
let currentVehicle = 'car';
let selectedFault = null;

// ---- INIT ----
renderFaults('car');

// ---- FUNCTIONS ----
function selectVehicle(type, btn) {
  currentVehicle = type;
  selectedFault = null;

  // Update button styles
  document.querySelectorAll('.v-select-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Hide result
  document.getElementById('resultBox').classList.remove('show');

  // Re-render faults
  renderFaults(type);
}

function renderFaults(type) {
  const grid = document.getElementById('faultGrid');
  grid.innerHTML = '';

  faults[type].forEach(fault => {
    const btn = document.createElement('button');
    btn.className = 'fault-btn';
    btn.innerHTML = `
      <span class="fault-emoji">${fault.emoji}</span>
      <span class="fault-title">${fault.title}</span>
      <span class="fault-hint">${fault.hint}</span>
    `;
    btn.onclick = () => selectFault(fault, btn);
    grid.appendChild(btn);
  });
}

function selectFault(fault, btn) {
  selectedFault = fault;

  // Update button styles
  document.querySelectorAll('.fault-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  // Show result
  const box = document.getElementById('resultBox');
  document.getElementById('resultTitle').textContent = fault.emoji + ' ' + fault.title;
  document.getElementById('resultDesc').textContent = fault.description;

  const sev = document.getElementById('resultSeverity');
  if (fault.severity === 'high') {
    sev.textContent = '🔴 HIGH SEVERITY – Get help immediately';
    sev.className = 'result-severity severity-high';
  } else if (fault.severity === 'med') {
    sev.textContent = '🟡 MEDIUM – Drive carefully to garage';
    sev.className = 'result-severity severity-med';
  } else {
    sev.textContent = '🟢 LOW – Monitor & visit garage soon';
    sev.className = 'result-severity severity-low';
  }

  box.classList.add('show');
  box.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Save to localStorage for garage page
  localStorage.setItem('vr_fault', JSON.stringify(fault));
  localStorage.setItem('vr_vehicle', currentVehicle);
}

function sendSOS() {
  if (!selectedFault) return;
  const toast = document.getElementById('toast');
  toast.textContent = '🚨 SOS Sent! Kumar Auto Works notified with your location.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}
