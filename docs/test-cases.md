# Test Cases

## Test Case 1 - Homepage loads correctly
- Check: Navbar, hero, services, CTA buttons
- Expected: No console errors, layout renders correctly.

## Test Case 2 - Navigation
- Routes to test:
  - /
  - /agents
  - /use-cases
  - /lab
  - /ai-roi-calculator
  - /insights
  - /book
- Expected: All pages load correctly with valid heading hierarchy.

## Test Case 3 - Booking form validation
- Test: Empty submission, invalid email, valid submission
- Expected: Validation errors appear for invalid inputs and success state appears for valid submission.

## Test Case 4 - Booking persistence
- Test: Submit valid form and inspect SQLite DB
- Expected: New record in `consultations` table with `createdAt` timestamp.

## Test Case 5 - AI Playground demos
- Verify:
  - Lead Qualification Bot
  - Knowledge Assistant
  - Automation Calculator
- Expected: Responses return without crashes.

## Test Case 6 - ROI Calculator
- Test: Numeric inputs produce valid results
- Expected: Output includes hours saved per month, automation %, monthly savings, annual savings, annual ROI.

## Test Case 7 - Responsive layout
- Verify on:
  - Desktop
  - Tablet
  - Mobile
- Expected: Layout remains readable with no major overflow issues.

## Test Case 8 - ChatHive widget
- Prompt tests:
  - Service discovery prompt
  - Lead qualification prompt
  - Booking prompt
  - French prompt
- Expected: Relevant responses and clear direction toward booking.
