/**
 * AyuCase Clinical Suite — Notifications Mock Data
 */

export const initialNotifications = [
  {
    id: "notif_1",
    title: "Review Required: Lumbar Spine Case",
    message: "Patient Sunita Verma's radicular pain case has new physical therapy notes awaiting review.",
    time: "15 mins ago",
    type: "review",
    unread: true,
    targetPatientId: "AYU-2026-082"
  },
  {
    id: "notif_2",
    title: "Follow-up Due: Glycemic Control",
    message: "Patient Rajesh Kumar is scheduled for a 3-month HbA1c repeat follow-up today.",
    time: "1 hour ago",
    type: "followup",
    unread: true,
    targetPatientId: "AYU-2026-083"
  },
  {
    id: "notif_3",
    title: "Lab Results Ready: Lipid Panel",
    message: "Pathology report for Ramesh Patel has been uploaded and linked to active case sheet.",
    time: "3 hours ago",
    type: "lab",
    unread: false,
    targetPatientId: "AYU-2026-081"
  },
  {
    id: "notif_4",
    title: "System Update: AyuCase Diagnostics v2.4",
    message: "Diagnostic decision engine updated with revised 2026 ADA & AHA clinical guidelines.",
    time: "Yesterday",
    type: "system",
    unread: false,
    targetPatientId: null
  }
];
