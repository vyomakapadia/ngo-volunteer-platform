# ImpactSync — Change Log

## v2.0 — Dual AI Chatbot Release

### 🐛 Bug Fix: "Missing or insufficient permissions" in chat.html
- **Root cause**: `getTaskContext()` was firing before Firebase Auth initialized,
  causing Firestore reads with `auth == null` which correctly failed the security rules.
- **Fix**: Added `onAuthStateChanged` guard to `chat.html` — Firestore reads now
  only happen after a confirmed authenticated session.
- **Fix**: Added `authReady` flag check inside `sendMessage()` to give a friendly
  message instead of a cryptic error if the user clicks before auth resolves.
- **Fix**: `getTaskContext()` now filters by `where('ngoId', '==', currentUser.uid)`
  so the NGO analyst only sees their own tasks (security + relevance improvement).
- **Note**: `firestore.rules` was already correct — no rule changes needed.

### ✨ New: volunteer-buddy.html — Spark the Volunteer Buddy
- Separate AI chatbot page for volunteers, distinct from the NGO Analyst.
- **System prompt**: Warm, encouraging "Spark" persona vs. professional analyst tone.
- **Skill detection**: Client-side keyword→skill mapping detects mentioned skills
  (e.g. "I can cook" → flags cooking tasks) before sending to Gemini.
- **Smart context**: Task context includes `⭐ MATCHES YOUR SKILLS` and
  `📍 NEAR YOUR LOCATION` tags per task, pre-computed from volunteer profile.
- **UI**: Teal/green gradient header (vs. dark navy for NGO), friendly chip suggestions,
  teal-themed bubbles, and volunteer-friendly error messages with emojis.
- Linked from the Volunteer Dashboard navbar.

## v1.x — Previous Changes
(see original CHANGES.md history)
