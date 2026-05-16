Ich werde die bestehende App nicht redesignen, sondern die Funktion gezielt in der vorhandenen Struktur fertigstellen.

## Zielzustand

Die `/app`-Ansicht hat genau diese 4 Tabs:

1. History
2. Files
3. Memory Training
4. Dashboard

Kein sichtbarer Call-Tab, keine Demo-/How-it-works-Erweiterung, kein neues Hauptlayout.

## Umsetzung

### 1. Navigation bereinigen
- In `src/routes/app.tsx` sicherstellen, dass die Tabs nur aus History, Files, Memory Training und Dashboard bestehen.
- Entfernen von übrig gebliebenem sichtbaren oder ungenutzten Call-/Voice-UI-Code, der die 4-Sektionen-Anforderung verwässert.
- Bestehende Optik, Karten, Abstände und Design-Tokens beibehalten.

### 2. Mock-Analytics als spätere AI-Grundlage strukturieren
- In `src/data/insights.ts` realistische Mock-Daten pflegen für:
  - vergangene Call-/History-Fragen
  - repeated questions
  - memory gap categories
  - training scores
  - remembered / not remembered
  - Format-Erfolg: text, voice, visuals
- Eine klare `buildInsightsPayload()`-Struktur behalten/ergänzen, damit später ein echter AI-Call mit Prompt angeschlossen werden kann.
- MVP bleibt simuliert, kein echter OpenAI-/Backend-Call.

### 3. History: “AI Memory Insights” hinzufügen/absichern
In der History-Sektion erscheint oben ein Bereich `AI Memory Insights` mit vier Karten:

- Repeated Questions
  - z. B. “Why am I at the hospital?” — 5× this week
- Frequent Memory Gaps
  - Kategorien wie people, places, appointments, medication, recent actions, daily schedule
  - mit Progress Bars
- Improvement Trend
  - einfache kleine Chart-/Trend-Darstellung über die Woche
- Best Support Format
  - Vergleich text / voice / visuals mit Erfolgsraten

Texte werden assistiv formuliert, z. B. “The app noticed…” und “This may suggest…”.

### 4. Dashboard: “Caregiver Feedback Summary” hinzufügen/absichern
Im Dashboard erscheint eine klare Caregiver-Karte mit:

- Weekly Summary
- Top Repeated Memory
- Strongest Memory Category
- Weakest Category
- Recommended Caregiver Action
- Patient-Friendly Message

Die Patientenversion wird sanft und nicht wertend formuliert.

### 5. Sicherheits-/Wording-Anforderungen
- Keine Diagnose, kein medizinisches Urteil, keine Aussagen über Krankheitsprogression.
- Zulässige Formulierungen verwenden:
  - “This may suggest…”
  - “The app noticed…”
  - “Consider reviewing…”
  - “This is support information, not medical advice.”
- Den Disclaimer sichtbar in History und Dashboard platzieren:
  - “These insights are assistive memory support and are not a medical diagnosis.”

### 6. Qualitätssicherung
- Prüfen, dass die App weiterhin kompiliert und die `/app`-UI nur die 4 gewünschten Tabs zeigt.
- Prüfen, dass die Feedback-Bereiche in History und Dashboard sichtbar sind und keine alten Call-/Demo-Navigationselemente erscheinen.