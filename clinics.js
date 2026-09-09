/**
 * AyuCase Clinical Suite — Nearby Clinics & Referral Centers Mock Data
 */

export const clinicsData = [
  {
    id: "cln_01",
    name: "AyuCare Multispecialty Medical Center",
    specialty: "General & Internal Medicine",
    specialties: ["Internal Medicine", "Cardiology", "Neurology", "Diagnostics"],
    address: "Plot 14, Linking Road, Bandra West, Mumbai",
    distance: "1.2 km away",
    distanceKm: 1.2,
    rating: 4.9,
    reviewsCount: 328,
    isOpen: true,
    hours: "Open 24/7 (Emergency & OPD)",
    phone: "+91 (022) 2640-8800",
    email: "referrals@ayucarehealth.in",
    doctors: [
      { name: "DOCTOR", role: "Chief Cardiologist & Internal Medicine", exp: "14 yrs" },
      { name: "Dr. Rajesh Gupta", role: "Senior Neurologist", exp: "18 yrs" }
    ],
    facilities: ["Advanced MRI/CT", "24/7 Pharmacy", "Daycare Ward", "In-house Pathology Lab"]
  },
  {
    id: "cln_02",
    name: "Metro Neuro & Spine Diagnostic Institute",
    specialty: "Neurology",
    specialties: ["Neurology", "Spine Surgery", "Headache Clinic", "Physiotherapy"],
    address: "Tower B, Health City Complex, Andheri East, Mumbai",
    distance: "3.5 km away",
    distanceKm: 3.5,
    rating: 4.8,
    reviewsCount: 215,
    isOpen: true,
    hours: "08:00 AM - 09:00 PM",
    phone: "+91 (022) 4211-9900",
    email: "neuro@metromedic.in",
    doctors: [
      { name: "Dr. Siddharth Sen", role: "Headache Specialist", exp: "16 yrs" },
      { name: "Dr. Meera Iyer", role: "Neuro-radiologist", exp: "12 yrs" }
    ],
    facilities: ["High-field 3T MRI", "EEG / EMG Lab", "Migraine Infusion Center"]
  },
  {
    id: "cln_03",
    name: "Apex Orthopedics & Joint Care Clinic",
    specialty: "Orthopedics",
    specialties: ["Orthopedics", "Sports Medicine", "Rheumatology", "Rehabilitation"],
    address: "Shop 4-6, Silver Arch, SV Road, Santacruz West, Mumbai",
    distance: "4.8 km away",
    distanceKm: 4.8,
    rating: 4.7,
    reviewsCount: 180,
    isOpen: true,
    hours: "09:00 AM - 08:00 PM",
    phone: "+91 (022) 2605-1122",
    email: "care@apexortho.org",
    doctors: [
      { name: "Dr. Vikram Malhotra", role: "Senior Orthopedic Surgeon", exp: "15 yrs" }
    ],
    facilities: ["Digital X-Ray", "Musculoskeletal Ultrasound", "Physical Therapy Wing"]
  },
  {
    id: "cln_04",
    name: "Beacon Pediatric & Family Health Center",
    specialty: "Pediatrics",
    specialties: ["Pediatrics", "Neonatology", "Immunization", "Family Medicine"],
    address: "102, Sunrise Enclave, Juhu Tara Road, Mumbai",
    distance: "6.1 km away",
    distanceKm: 6.1,
    rating: 4.9,
    reviewsCount: 410,
    isOpen: false,
    hours: "Opens tomorrow at 08:30 AM",
    phone: "+91 (022) 2618-3344",
    email: "kids@beaconpediatrics.com",
    doctors: [
      { name: "Dr. Kavita Deshmukh", role: "Senior Pediatrician", exp: "19 yrs" }
    ],
    facilities: ["Vaccination Center", "Pediatric Observation Unit", "Lactation Support"]
  },
  {
    id: "cln_05",
    name: "DermaCare Skin & Allergy Institute",
    specialty: "Dermatology",
    specialties: ["Dermatology", "Immunology & Allergy", "Trichology", "Laser Clinic"],
    address: "5th Floor, Platinum Plaza, Khar West, Mumbai",
    distance: "5.4 km away",
    distanceKm: 5.4,
    rating: 4.8,
    reviewsCount: 290,
    isOpen: true,
    hours: "10:00 AM - 07:30 PM",
    phone: "+91 (022) 2648-7711",
    email: "skin@dermacare.in",
    doctors: [
      { name: "Dr. Rohan Nambiar", role: "Consultant Dermatologist & Allergist", exp: "11 yrs" }
    ],
    facilities: ["Patch Testing Lab", "Dermoscopy", "Allergy Desensitization"]
  }
];
