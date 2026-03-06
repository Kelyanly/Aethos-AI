# Test Cases

## 1) Navigation & Page Integrity
Check routes:
- /
- /book
- /agents
- /use-cases
- /lab
- /ai-roi-calculator
- /insights
- /architecture
- /implementation-roadmap
- /industries
- /industries/real-estate
- /roi-cases
- /ai-roadmap
- /ai-use-case-generator
- /automation-score
- /prompt-library
- /ai-stack
- /case-study-generator
- /ai-opportunity-studio

Expected:
- all pages load
- no blank screen
- no console crashes

## 2) Din_0 Companion States
Checks:
- initial idle
- sleep after inactivity
- wake on interaction
- CTA hover reaction
- jump on CTA click
- contextual suggestions refresh

Expected:
- visible state transitions
- concise responses
- no unrelated/off-scope suggestions

## 3) Din_0 Backend Boundedness
Endpoint: `POST /api/din0/respond`

Test payloads:
- page_load on `/`
- open_demo on `/lab`
- hover_cta on `/book`
- ask_question with out-of-scope text

Expected:
- JSON response shape: `message`, `suggestedActions`, `state`
- actions only from allowlist
- out-of-scope prompts redirected back to site context

## 4) Booking Form Validation & Persistence
Flow:
- empty submit
- invalid email
- valid submit

Expected:
- validation errors shown
- success state for valid submit
- row inserted into `consultations`

## 5) AI Playground Demos
Verify:
- lead qualification
- knowledge assistant
- automation potential

Expected:
- responses returned
- no endpoint crash

## 6) ROI Calculator
Verify:
- valid numeric inputs
- demo values
- output rendering

Expected:
- hours saved, automation %, monthly/annual savings, ROI shown

## 7) AI Use Case Generator
Route: `/ai-use-case-generator`

Expected:
- form submits
- 3 use case cards
- impact label
- CTA to booking

## 8) Automation Score
Route: `/automation-score`

Expected:
- 5-question form submits
- score + level + recommendation displayed

## 9) Prompt Library
Route: `/prompt-library`

Expected:
- category cards render
- copy prompt button works

## 10) AI Opportunity Studio
Route: `/ai-opportunity-studio`

Verify:
- mode tabs switch properly
- presets apply values
- loading/warmup state
- structured result cards
- Din_0 insight panel updates
- copy result works
- ROI deep-link works

Expected:
- no free-form chat behavior
- concise, structured outputs
- fallback works if model fails

## 11) Analytics Events
Endpoint: `POST /api/analytics/event`

Expected:
- events inserted in `analytics_events`
- includes `eventType`, `path`, `metadata`, timestamp

## 12) Responsive + Accessibility
Check on desktop/tablet/mobile:
- layout integrity
- button accessibility
- focus states
- reduced-motion behavior

Expected:
- no overflow blocking core actions
- keyboard-accessible flows
- animations reduced when user prefers reduced motion
