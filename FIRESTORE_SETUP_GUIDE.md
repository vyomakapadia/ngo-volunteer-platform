# 🔥 Firestore Setup Guide for ImpactSync Chatbot

## Why You're Seeing Those Errors

Your chatbot reads from a Firestore collection called **`tasks`**.
If that collection is empty — or the field names don't exactly match — you'll see:

- ❌ "No task data available"
- ❌ "No urgent tasks"
- ❌ "No tasks in Surat"

---

## ✅ Step 1: The Exact Field Names Your Code Expects

Your `chat.html` uses these field names (copy them EXACTLY — they are case-sensitive):

| Field Name           | Type    | What It Means                          |
|----------------------|---------|----------------------------------------|
| `title`              | string  | Name of the task                       |
| `category`           | string  | Type of work (e.g. "Education")        |
| `location`           | string  | City name (e.g. "Surat")               |
| `volunteersFilled`   | number  | How many volunteers have joined        |
| `volunteersNeeded`   | number  | Total volunteers required              |
| `skills`             | array   | List of required skills                |
| `status`             | string  | Must be exactly: `open` (lowercase!)   |

> ⚠️ **Common Mistake:** Writing `"Open"` (capital O) instead of `"open"` (lowercase).
> Your code compares it as lowercase, so `"Open"` will NOT match.

---

## ✅ Step 2: 5 Sample Task Documents to Add

Copy these exactly into Firestore. Each one is one document in the `tasks` collection.

---

### Document 1 — Food Distribution (Urgent)
```
title:            "Food Distribution Drive"
category:         "Food Relief"
location:         "Surat"
volunteersFilled: 2
volunteersNeeded: 20
skills:           ["Driving", "Packing", "Communication"]
status:           "open"
```

---

### Document 2 — Medical Camp (Urgent)
```
title:            "Free Medical Camp"
category:         "Healthcare"
location:         "Surat"
volunteersFilled: 1
volunteersNeeded: 15
skills:           ["First Aid", "Medical Knowledge", "Coordination"]
status:           "open"
```

---

### Document 3 — Tutoring (Partially filled)
```
title:            "Student Tutoring Program"
category:         "Education"
location:         "Surat"
volunteersFilled: 8
volunteersNeeded: 10
skills:           ["Teaching", "Maths", "English"]
status:           "open"
```

---

### Document 4 — Tree Plantation (Mumbai)
```
title:            "Tree Plantation Drive"
category:         "Environment"
location:         "Mumbai"
volunteersFilled: 12
volunteersNeeded: 25
skills:           ["Physical Fitness", "Teamwork"]
status:           "open"
```

---

### Document 5 — Clothes Collection (Ahmedabad)
```
title:            "Winter Clothes Collection"
category:         "Relief"
location:         "Ahmedabad"
volunteersFilled: 5
volunteersNeeded: 8
skills:           ["Sorting", "Driving", "Communication"]
status:           "open"
```

---

## ✅ Step 3: How to Add These in Firebase Console (Step by Step)

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click on your project
3. In the left sidebar, click **Firestore Database**
4. Click **"+ Start collection"** (if no collection exists)
   - Collection ID: `tasks`  ← type this exactly
5. To add a document:
   - Click **"+ Add document"**
   - Leave the Document ID blank (Firebase will auto-generate it)
   - Now add each field one by one:
     - Click **"+ Add field"**
     - Field name: `title` → Type: `string` → Value: `Food Distribution Drive`
     - Click **"+ Add field"**
     - Field name: `location` → Type: `string` → Value: `Surat`
     - ... (repeat for all fields)
     - For `skills`: choose Type **`array`**, then add each skill as a string item
     - For `volunteersFilled` and `volunteersNeeded`: choose Type **`number`**
6. Click **Save**
7. Repeat for all 5 documents

---

## ✅ Step 4: Common Mistakes to Avoid

| ❌ Wrong                | ✅ Correct              | Why It Matters                        |
|------------------------|------------------------|---------------------------------------|
| `"Open"`               | `"open"`               | Status check is case-sensitive        |
| `volunteers` (number)  | `volunteersNeeded`     | Code reads `volunteersNeeded` field   |
| `volunteersAccepted`   | `volunteersFilled`     | Code reads `volunteersFilled` field   |
| `city: "Surat"`        | `location: "Surat"`    | Code reads `location`, not `city`     |
| `skill` (string)       | `skills` (array)       | Must be an array, even for one skill  |
| Missing `status` field | `status: "open"`       | Needed for filtering open tasks       |
| Collection: `Tasks`    | Collection: `tasks`    | Collection name is case-sensitive     |

---

## ✅ Step 5: How to Verify It's Working

After adding documents, open `chat.html` in your browser and try:

- Type: **"Give me a summary"** → should show total tasks and volunteers
- Type: **"Show urgent tasks"** → should show tasks with < 20% fill rate (Docs 1 & 2 above)
- Type: **"Tasks in Surat"** → should show 3 tasks from Surat
- Type: **"Show required skills"** → should list all skills from all tasks

---

## ✅ Firestore Rules (Make Sure Read is Allowed)

Open `firestore.rules` in Firebase Console and check it allows reads:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read: if true;   // Allow public read for chatbot
      allow write: if request.auth != null;
    }
  }
}
```

If rules are blocking reads, your chatbot will silently return an empty list.

---

## Summary Checklist

- [ ] Collection is named exactly `tasks` (lowercase)
- [ ] Field `title` exists (string)
- [ ] Field `location` contains city name like "Surat"
- [ ] Field `volunteersFilled` is a **number**
- [ ] Field `volunteersNeeded` is a **number**
- [ ] Field `skills` is an **array** of strings
- [ ] Field `status` is `"open"` (all lowercase)
- [ ] Firebase config in `chat.html` has your real `apiKey` and `projectId`
- [ ] Firestore rules allow reading the `tasks` collection
