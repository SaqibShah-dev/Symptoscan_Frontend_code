
---

# SymptoScan — AI-Assisted Healthcare & Telemedicine Platform

> **Medical Disclaimer:** SymptoScan is an AI-assisted healthcare tool intended for decision-support and informational purposes only. It does **not** replace professional medical diagnosis, treatment, or clinical advice.

SymptoScan is an advanced React-based healthcare platform designed to empower patients and medical professionals, particularly in rural and remote regions. By combining deep learning image analysis, multilingual prescription OCR, document-based question answering (RAG), and integrated telemedicine tools, SymptoScan bridges the gap between remote patients and modern medical care.

---

## Key Features

**Patient Experience**

* **Role-Based Portals:** Seamless signup/login workflows customized for patient needs.
* **Health Overview & Alerts:** Real-time dashboards displaying medical history, risk trends, and health notifications.
* **Interactive Risk Assessment:** Self-assessment modules for calculating heart disease and diabetes risks.
* **Doctor Discovery:** Intuitive search interface to locate and connect with specialized healthcare providers.

**Doctor Workspace**

* **Clinical Profile Management:** Complete registration with credentials, experience, specializations, and hospital affiliations.
* **AI Analysis Suite:** Centralized workspace for reviewing CT scans, X-rays, risk scores, and patient records.
* **Telemedicine Hub:** Integrated platform for managing appointments, virtual meetings, and patient communication.

**AI Diagnostic Capabilities**

* **Radiology Analysis:** Upload CT scans or Chest X-rays to generate diagnostic predictions, confidence scores, and **Grad-CAM visual heatmaps**.
* **Prescription OCR:** Extract text from printed or handwritten prescriptions into editable, printable reports with **English and Urdu** label support.
* **RAG Knowledge Assistant:** Upload PDF medical documents and ask natural-language questions powered by document QA and optional live web search.
* **Human-in-the-Loop Feedback:** Submit doctor feedback on diagnostic outputs to continuously improve model precision.

---

## Tech Stack

* **Frontend Framework:** React 19, Vite 7, React Router DOM
* **Styling & Animations:** Tailwind CSS 4, Framer Motion, Lucide React
* **Data & Real-Time Communication:** Axios, Socket.IO Client
* **UI & Viewer Utilities:** React Zoom Pan Pinch, React Hot Toast

---

## Project Structure

```text
.
├── public/
│   └── icons/                 # Static asset icons
├── src/
│   ├── api/
│   │   └── API.js             # Axios API client configuration
│   ├── components/
│   │   ├── auth/              # Patient and doctor authentication forms
│   │   ├── disease/           # AI diagnostic tools (CT, X-ray, OCR, RAG)
│   │   └── patientdashboard/  # Patient portal view tabs
│   ├── pages/                 # Main entry views (Landing, Dashboards, Role Select)
│   ├── telemedicine/          # Real-time appointments, video calls, and chat
│   ├── App.jsx                # Application routes and layout
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles & Tailwind imports
├── index.html
├── package.json
└── vite.config.js

```

---

## Application Routes

| Route | View Description |
| --- | --- |
| `/` | SymptoScan landing page |
| `/select-role` | Role selection portal (Patient vs. Doctor) |
| `/patient/auth` | Patient registration and login |
| `/patient/dashboard` | Patient health dashboard and records |
| `/doctor/auth` | Doctor registration and credentials verification |
| `/doctor/dashboard` | Doctor workspace and AI diagnostic tools |

---

## Getting Started

### Prerequisites

Ensure you have the following installed locally:

* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher
* **Backend API**: A running instance of the SymptoScan backend service

### Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/SaqibShah-dev/Symptoscan_Frontend_code.git
cd Symptoscan_Frontend_code

```


2. **Install project dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://127.0.0.1:5000

```


*(Note: Defaults to `[http://127.0.0.1:5000](http://127.0.0.1:5000)` if omitted).*
4. **Start the Development Server:**
```bash
npm run dev

```


5. **Build for Production:**
```bash
npm run build

```



---

## Backend API Endpoints

The frontend client communicates with the backend via multipart form data and REST endpoints defined in `src/api/API.js`:

* `POST /api/kidneyctscan/predict` — Process CT images and retrieve Grad-CAM visual maps
* `POST /api/kidneyctscan/feedback` — Submit doctor corrections for CT predictions
* `POST /api/chestxray/predict` — Analyze chest X-ray images for pulmonary conditions
* `POST /api/prescriptionocr/predict` — Extract text and convert prescription images to structured data
* `POST /api/rag/upload` & `POST /api/rag/query` — Document embedding and semantic QA
* `GET /api/doctors/:doctorId/*` — Fetch real-time appointments, meetings, and messages

---

## Development Notes

* **Authentication:** Front-end authentication in `PatientAuth.jsx` and `DoctorAuth.jsx` currently includes mock transitions for rapid prototyping. Ensure API endpoints are fully re-connected before production release.
* **Mock Data:** Specific dashboard metrics and historical records rely on mock state variables that can be bound directly to server hooks.

---

## License

This repository does not currently specify an open-source license. Please consult the maintainer before public reuse or redistribution.

---
