# 🔧 VehicleRescue – Smart Vehicle Breakdown Assistant

> Detects your vehicle problem, explains it in plain language, and finds the nearest garage instantly. Works for both **cars and bikes**.

![VehicleRescue Banner](https://img.shields.io/badge/VehicleRescue-Open%20Source-ff4d00?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🚨 The Problem

Every day, thousands of people break down on highways and remote roads in India. They don't know what went wrong, and they have no idea where the nearest garage is — especially **bike riders** who have almost no digital support tools.

## ✅ The Solution

**VehicleRescue** is a web app that:
- 🔍 Detects your vehicle fault and explains it in **plain language**
- 🗺️ Uses **GPS** to find the **3 nearest garages** in real time
- 📤 Sends a **one-tap SOS alert** with your location + fault details to a garage
- 🏍️ Works for **both cars AND bikes** — unlike most existing apps

---

## 📱 Features

| Feature | Status |
|---|---|
| Manual fault selection (50+ faults) | ✅ Done |
| GPS-based garage finder | ✅ Done |
| One-tap SOS alert | ✅ Done |
| Car & Bike support | ✅ Done |
| OBD2 Bluetooth integration | 🔄 In Progress |
| SMS/WhatsApp alert via Twilio | ⏳ Planned |
| Mobile App (React Native) | ⏳ Planned |

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **APIs Used:** Geolocation API (GPS), Google Maps API (planned)
- **Hardware (Phase 3):** OBD2 ELM327 Bluetooth Dongle
- **Notifications (Phase 4):** Twilio SMS API

---

## 🚀 How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/vehicle-rescue.git

# 2. Go into the folder
cd vehicle-rescue

# 3. Open in browser
# Just double-click index.html OR use Live Server in VS Code
```

No install needed. No frameworks. Just open and run.

---

## 📂 Project Structure

```
vehicle-rescue/
├── index.html          ← Home page
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── main.js         ← Home page logic
│   ├── diagnose.js     ← Fault detection logic
│   └── garages.js      ← Garage finder logic
└── pages/
    ├── diagnose.html   ← Diagnose your vehicle
    ├── garages.html    ← Find nearest garage
    └── about.html      ← About the project
```

---

## 🗺️ Roadmap

- [x] Phase 1 – UI prototype with fault selection
- [x] Phase 2 – GPS garage finder
- [ ] Phase 3 – Real OBD2 Bluetooth connection
- [ ] Phase 4 – SMS/WhatsApp alert via Twilio
- [ ] Phase 5 – React Native mobile app

---

## 🤝 Contributing

Pull requests are welcome! If you want to add garage data for your city, improve the UI, or help with OBD2 integration, please open an issue first.

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 👨‍💻 Author

Built with ❤️ to help people stranded on India's roads.

⭐ **Star this repo** if you find it useful!  
🔗 **Connect on LinkedIn** — let's grow together.
