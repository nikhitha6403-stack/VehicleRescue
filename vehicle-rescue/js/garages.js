// garages.js - VehicleRescue Garage Finder Logic

// ---- MOCK GARAGE DATA ----
// In the real app, these come from Google Places API using your GPS coordinates
const mockGarages = [
  {
    rank: 1,
    name: 'Kumar Auto Works',
    distance: '0.8 km',
    rating: '4.8 ⭐',
    phone: '+91 98765 43210',
    open: true,
    hours: 'Open · Closes 9 PM',
    tags: ['Cars', 'Bikes', 'OBD Scan', 'AC Repair'],
    address: 'Near Jubilee Hills Checkpost, Hyderabad'
  },
  {
    rank: 2,
    name: 'Singh Bike Service Center',
    distance: '1.4 km',
    rating: '4.5 ⭐',
    phone: '+91 91234 56789',
    open: true,
    hours: 'Open · Closes 8 PM',
    tags: ['Bikes Only', 'Puncture', 'Chain Repair', '24hr'],
    address: 'Banjara Hills Road No. 12, Hyderabad'
  },
  {
    rank: 3,
    name: 'City Motors & Garage',
    distance: '2.1 km',
    rating: '4.2 ⭐',
    phone: '+91 87654 32109',
    open: false,
    hours: 'Closed · Opens 8 AM',
    tags: ['Cars', 'SUVs', 'Body Work', 'Tyre Change'],
    address: 'Madhapur Main Road, Hyderabad'
  }
];

// ---- INIT ----
renderGarages();
getLocation();

// Show saved fault if coming from diagnose page
const savedFault = localStorage.getItem('vr_fault');
if (savedFault) {
  const fault = JSON.parse(savedFault);
  const header = document.querySelector('.page-header p');
  if (header) {
    header.textContent = `Fault detected: ${fault.emoji} ${fault.title} — Garages that can help are listed below.`;
  }
}

// ---- GPS LOCATION ----
function getLocation() {
  const locText = document.getElementById('locationText');
  locText.textContent = '📍 Detecting your location...';

  if (!navigator.geolocation) {
    locText.textContent = '📍 GPS not supported – showing Hyderabad garages';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude.toFixed(4);
      const lng = position.coords.longitude.toFixed(4);
      locText.textContent = `📍 Your location: ${lat}, ${lng} — Showing nearest garages`;
    },
    () => {
      locText.textContent = '📍 Location access denied – showing demo garages near Hyderabad';
    }
  );
}

// ---- RENDER GARAGES ----
function renderGarages() {
  const list = document.getElementById('garageList');
  list.innerHTML = '';

  mockGarages.forEach(garage => {
    const card = document.createElement('div');
    card.className = `garage-card ${garage.rank === 1 ? 'top' : ''}`;

    const tagsHTML = garage.tags.map(t => `<span class="garage-tag">${t}</span>`).join('');

    card.innerHTML = `
      <div class="garage-rank rank-${garage.rank}">#${garage.rank}</div>
      <div class="garage-info">
        <h3>${garage.name}</h3>
        <div class="garage-meta">
          <span>📍 ${garage.distance}</span>
          <span>${garage.rating}</span>
          <span class="${garage.open ? 'open' : 'closed'}">${garage.hours}</span>
        </div>
        <p style="font-size:12px; color:var(--muted); margin-bottom:10px; font-weight:400;">${garage.address}</p>
        <div class="garage-tags">${tagsHTML}</div>
      </div>
      <div class="garage-actions">
        <button class="btn-call" onclick="callGarage('${garage.phone}', '${garage.name}')">
          📞 Call
        </button>
        <button class="btn-alert" onclick="sendAlert('${garage.name}')">
          📤 Send Alert
        </button>
      </div>
    `;

    list.appendChild(card);
  });
}

// ---- ACTIONS ----
function callGarage(phone, name) {
  // In real app: window.location.href = `tel:${phone}`;
  showToast(`📞 Calling ${name}... (${phone})`);
}

function sendAlert(name) {
  const fault = localStorage.getItem('vr_fault');
  let faultText = 'Vehicle breakdown';

  if (fault) {
    const f = JSON.parse(fault);
    faultText = `${f.emoji} ${f.title}`;
  }

  showToast(`✅ Alert sent to ${name}! They know: "${faultText}" + your GPS location.`);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}
