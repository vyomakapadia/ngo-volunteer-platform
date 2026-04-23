// ============================================================
// seed_firestore.js — Run this ONCE to populate your Firestore
// ============================================================
// HOW TO USE:
//   1. npm install firebase-admin
//   2. Download your Service Account Key from Firebase Console:
//      Project Settings → Service Accounts → Generate new private key
//   3. Save it as serviceAccountKey.json in this folder
//   4. Run: node seed_firestore.js
// ============================================================

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// ✅ 5 sample tasks — fields match chat.html exactly
const sampleTasks = [
  {
    title: "Food Distribution Drive",
    category: "Food Relief",
    location: "Surat",
    volunteersFilled: 2,
    volunteersNeeded: 20,
    skills: ["Driving", "Packing", "Communication"],
    status: "open",         // ← must be lowercase "open"
  },
  {
    title: "Free Medical Camp",
    category: "Healthcare",
    location: "Surat",
    volunteersFilled: 1,
    volunteersNeeded: 15,
    skills: ["First Aid", "Medical Knowledge", "Coordination"],
    status: "open",
  },
  {
    title: "Student Tutoring Program",
    category: "Education",
    location: "Surat",
    volunteersFilled: 8,
    volunteersNeeded: 10,
    skills: ["Teaching", "Maths", "English"],
    status: "open",
  },
  {
    title: "Tree Plantation Drive",
    category: "Environment",
    location: "Mumbai",
    volunteersFilled: 12,
    volunteersNeeded: 25,
    skills: ["Physical Fitness", "Teamwork"],
    status: "open",
  },
  {
    title: "Winter Clothes Collection",
    category: "Relief",
    location: "Ahmedabad",
    volunteersFilled: 5,
    volunteersNeeded: 8,
    skills: ["Sorting", "Driving", "Communication"],
    status: "open",
  },
];

async function seedTasks() {
  console.log("🌱 Starting Firestore seed...\n");

  for (const task of sampleTasks) {
    const ref = await db.collection("tasks").add(task);
    console.log(`✅ Added: "${task.title}" → ID: ${ref.id}`);
  }

  console.log("\n🎉 Done! 5 tasks added to Firestore.");
  console.log("Now open chat.html and try: 'Give me a summary'");
  process.exit(0);
}

seedTasks().catch((err) => {
  console.error("❌ Error seeding tasks:", err.message);
  process.exit(1);
});
