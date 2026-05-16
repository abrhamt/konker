## 2026-05-16 - Adding accessibility attributes to icon-only buttons
**Learning:** Found that multiple components (VoiceChat and EmojiPicker) lacked basic screen reader access via aria-labels for their icon-only interactive states.
**Action:** When creating new interactive elements using only icons, always add aria-label and title attributes to improve screen reader compatibility and visual hints.
