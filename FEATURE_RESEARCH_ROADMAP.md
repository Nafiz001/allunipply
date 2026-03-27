# Allunipply Feature Research and Roadmap (March 2026)

## Goal
Identify high-impact features to add next for Allunipply (student application platform), based on:
- Current product state in this repository
- Web research from admissions, UX, accessibility, security, and analytics sources

## Research Method
I reviewed external sources on:
- College admissions trends and counselor workload
- Form completion and conversion UX
- Accessibility standards
- Web application security priorities
- Funnel analytics for drop-off optimization

Because some datasets are behind member dashboards, recommendations below combine public summary findings with product design best practices.

## Executive Summary
Top opportunities for Allunipply:
1. Application Completion Intelligence: save users from incomplete submissions with section-level blockers, smart nudges, and checklist automation.
2. Counselor and Assisted Guidance Layer: build lightweight in-app advising because counselor capacity is limited in many contexts.
3. Stronger Program Fit and Eligibility Engine: improve matching using transcript strength, criteria explainability, and confidence scoring.
4. Submission Quality and Trust Stack: document quality checks, anti-fraud controls, and compliance-grade audit trails.
5. Funnel Analytics and Experimentation: instrument every critical step and prioritize based on measured drop-off.
6. Accessibility and Inclusive UX hardening: target WCAG 2.2 AA and mobile-first interaction quality.

## Key External Findings (What the research says)

### 1) Grades and curriculum strength are still dominant in admissions
Source: NACAC Factors in the Admission Decision (Fall 2023)
- High school grades in college prep courses and overall grades remain the highest-weight decision factors.
- Strength of curriculum remains consistently important.
- Test score importance has declined in the post-pandemic test-optional era.
Implication for Allunipply:
- Put more emphasis on academic profile quality and curriculum context in program matching and readiness feedback.

### 2) Counselor capacity is constrained
Source: NACAC School Counseling: Caseloads and Responsibilities
- Public school counselor ratios average above recommended levels (example noted: 405:1 vs recommended 250:1).
- Students who get one-on-one counselor interaction are significantly more likely to complete key actions.
Implication for Allunipply:
- Platform should provide self-serve advising, guided decision support, and proactive reminders to replace unavailable human support.

### 3) Form UX strongly affects completion
Source: Nielsen Norman Group, Web form usability recommendations
- Shorter forms, better grouping, clear labels, and visible error guidance reduce errors and abandonment.
- One cited finding highlights much higher first-try submission success when forms follow usability guidelines.
Implication for Allunipply:
- Your application steps should include stronger inline guidance, clearer validation, and lower cognitive load.

### 4) Authentication and sign-in UX impacts conversion
Source: web.dev sign-in form best practices
- Use proper HTML form semantics, stable input names/ids, autocomplete, visible validation, and mobile-safe layouts.
- Measure with page and interaction analytics to reduce abandonment.
Implication for Allunipply:
- Improve sign-in/up and protected flow continuity (especially deep-link return paths from CTA clicks).

### 5) Accessibility is now a compliance and quality baseline
Sources: W3C WCAG overview, ISO/IEC 40500:2025
- WCAG 2.2 is current best-practice baseline and mapped in standards ecosystems.
Implication for Allunipply:
- Build an accessibility roadmap now, not later, to avoid retrofit cost and improve broad usability.

### 6) Funnel analysis is essential for prioritization
Source: Contentsquare funnel analysis guide
- Teams should prioritize high-traffic/high-exit steps, segment funnels, and validate fixes via behavior data.
Implication for Allunipply:
- Feature decisions should be tied to measurable drop-off points in onboarding, profile completion, and submission.

### 7) Security posture should follow recognized web-app risk model
Source: OWASP Top 10 (2025)
- Use OWASP risk categories as engineering guardrails for authentication, data handling, and file uploads.
Implication for Allunipply:
- Student PII, documents, and admission data require explicit secure-by-default controls and monitoring.

## Recommended Feature Set (Prioritized)

## Priority 0 (Immediate: 2-6 weeks)
### A. Application Progress Guardrails
What to add:
- "Blocking issues" panel before Save and Continue on each step
- Incomplete field heatmap per section
- "Ready to submit" gate with reason codes
Why now:
- Directly reduces dead-end flows and confusion already seen in current navigation issues.

### B. Smart Return Routing
What to add:
- Consistent `next` route handling across all CTA buttons and auth redirects
- Preserve context (selected university/program/applicationId) end-to-end
Why now:
- Eliminates flow breakage after Start Applying and sign-in transitions.

### C. Responsive Desktop Re-tuning Standards
What to add:
- Shared breakpoint tokens and layout utility for tab bars, data tables, and section cards
- Visual regression checklist for small, medium, and large viewports
Why now:
- Recent fixes show mobile improvements can regress desktop; standardization prevents oscillation.

## Priority 1 (Near-term: 1-2 months)
### D. Eligibility and Match Explainer Engine
What to add:
- Per-program fit score (for example: GPA, IELTS, tuition fit, deadline fit)
- Explainability panel: "Why this program is recommended"
- Alternate suggestions when low fit
Why:
- Aligns with admissions factors trends (grades/curriculum importance) and improves trust.

### E. Counselor-lite Guidance
What to add:
- Guided path by student intent (budget-first, speed-first, ranking-first)
- "Ask advisor" queue + asynchronous response center
- Embedded FAQ recommendations in each form step
Why:
- Helps students who lack counselor access and reduces abandonment.

### F. Document Quality Assistant
What to add:
- Pre-submit checks for missing pages, file type, blur, and unsupported formats
- Requirement mapping: required docs by university/program
- Upload status confidence meter
Why:
- Reduces post-submission rejection loops and support overhead.

## Priority 2 (Mid-term: 2-4 months)
### G. Funnel and Experimentation Platform
What to add:
- Event taxonomy for all core steps
- Funnels for: sign-up -> profile -> shortlist -> apply -> submit
- A/B framework for form copy, validation timing, and CTA labels
Why:
- Enables data-driven feature sequencing instead of intuition-only changes.

### H. Accessibility Compliance Program (WCAG 2.2 AA)
What to add:
- Keyboard-only audit
- Focus order and visible focus improvements
- Color contrast and error-state semantics
- Form label/description and ARIA hardening
Why:
- Improves usability for all users and reduces compliance risk.

### I. Security and Trust Hardening
What to add:
- Secure upload scanning pipeline and file signature checks
- Session risk controls (rate limits, suspicious activity prompts)
- Role-based access enforcement and audit logs for application edits
Why:
- Protects PII and document workflows critical to admissions operations.

## Product-Specific Opportunities from Current Codebase
Observed opportunities from current app structure:
- Multiple "dummy" CTA buttons exist across dashboard and listing pages.
- Similar "Apply Now" interactions route differently by page.
- Some pages still rely on local state placeholders rather than API-backed records.

Recommended implementation pattern:
- Create a central action map utility (single source of truth for CTA behavior)
- Standardize route intents:
  - Explore
  - Start application
  - Continue application
  - Submit application
  - Check status
- Replace ad hoc button handlers with typed action configs per page

## KPI Framework for Feature Validation
Use these metrics per release:
- Profile completion rate
- Section-level save success rate
- Application submission rate
- Median time from first visit to first submission
- Drop-off by step (funnel)
- Support ticket rate per 100 applications
- Document rejection rate
- Accessibility defect count by severity

## Suggested Delivery Plan

### Phase 1 (Weeks 1-3)
- Progress Guardrails
- Smart Return Routing
- CTA action map

### Phase 2 (Weeks 4-8)
- Eligibility and Match Explainer
- Counselor-lite guidance widgets
- Document Quality Assistant (basic version)

### Phase 3 (Weeks 9-14)
- Funnel instrumentation + first A/B tests
- WCAG 2.2 AA remediation sprint
- Security hardening milestones and audit trail expansion

## Risks and Mitigations
- Risk: Too many features without instrumentation.
  - Mitigation: Require event instrumentation before rollout.
- Risk: UX drift across pages.
  - Mitigation: Shared component library and action map.
- Risk: Regression in responsive layouts.
  - Mitigation: viewport QA matrix and screenshot baseline checks.

## Source Links
- NACAC State of College Admission: https://www.nacacnet.org/state-of-college-admission/
- NACAC Factors in Admission Decision: https://www.nacacnet.org/factors-in-the-admission-decision/
- NACAC School Counseling: https://www.nacacnet.org/school-counseling/
- W3C WCAG Overview: https://www.w3.org/WAI/standards-guidelines/wcag/
- ISO/IEC 40500:2025 (WCAG 2.2): https://www.iso.org/standard/91029.html
- Nielsen Norman Group form usability: https://www.nngroup.com/articles/web-form-design/
- web.dev sign-in best practices: https://web.dev/articles/sign-in-form-best-practices
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Funnel analysis guide (Contentsquare): https://contentsquare.com/guides/funnels/analysis/

## Notes on Evidence Quality
- NACAC pages provide strong domain context but some detailed dashboards are member-gated.
- UX and analytics sources include both research-backed and practitioner guidance.
- Security and accessibility sources are standards/consensus-level references and should be treated as baseline requirements.
