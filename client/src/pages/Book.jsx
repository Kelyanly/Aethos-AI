import { useMemo, useState } from "react";
import Seo from "../components/Seo.jsx";
import { submitConsultation } from "../lib/api.js";
import ScrollRevealSection from "../components/ScrollRevealSection.jsx";

const initialState = {
  fullName: "",
  email: "",
  company: "",
  website: "",
  businessType: "",
  projectGoal: "",
  budgetRange: "",
  desiredTimeline: "",
  message: "",
};

const budgetOptions = [
  "Below EUR 5k",
  "EUR 5k - EUR 15k",
  "EUR 15k - EUR 30k",
  "EUR 30k+",
];

const timelineOptions = [
  "As soon as possible",
  "Within 30 days",
  "Within this quarter",
  "Exploration phase",
];

export default function Book() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const isLoading = status === "loading";

  const requiredMissing = useMemo(() => {
    const required = [
      "fullName",
      "email",
      "businessType",
      "projectGoal",
      "budgetRange",
      "desiredTimeline",
      "message",
    ];
    return required.some((key) => !String(form[key]).trim());
  }, [form]);

  function onFieldChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      await submitConsultation(form);
      setStatus("success");
      setFeedback(
        "Your request was received. You will get a tailored response with next steps within one business day."
      );
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setFeedback(error.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <main>
      <Seo
        title="Book an AI Consultation | Aethos AI"
        description="Discuss your AI opportunities with Aethos AI. Request a consultation for AI lead generation, assistants, and workflow automation."
      />

      <ScrollRevealSection className="section booking-intro">
        <div className="container intro-grid">
          <div>
            <p className="eyebrow">Consultation Request</p>
            <h1>Book a strategic AI consultation.</h1>
            <p className="muted hero-copy">
              Share your current challenge and business objective. Aethos AI reviews your
              request and replies with a practical recommendation, timeline guidance, and
              implementation options.
            </p>
          </div>
          <aside className="surface-card reassurance-card">
            <h2>What happens next</h2>
            <ul>
              <li>Review of your context and constraints</li>
              <li>Structured response with recommended scope</li>
              <li>Proposal of first milestones and delivery approach</li>
            </ul>
            <p className="muted small">
              Your information is handled confidentially and used only for consultation
              assessment.
            </p>
          </aside>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="section section-alt">
        <div className="container booking-grid">
          <form className="lead-form" onSubmit={onSubmit}>
            <label>
              Full Name*
              <input
                name="fullName"
                value={form.fullName}
                onChange={onFieldChange}
                required
              />
            </label>

            <label>
              Email*
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onFieldChange}
                required
              />
            </label>

            <label>
              Company
              <input name="company" value={form.company} onChange={onFieldChange} />
            </label>

            <label>
              Website
              <input
                name="website"
                type="url"
                placeholder="https://"
                value={form.website}
                onChange={onFieldChange}
              />
            </label>

            <label>
              Business Type*
              <input
                name="businessType"
                placeholder="Example: consulting, agency, B2B services"
                value={form.businessType}
                onChange={onFieldChange}
                required
              />
            </label>

            <label>
              Project Goal*
              <input
                name="projectGoal"
                placeholder="Example: improve inbound lead qualification"
                value={form.projectGoal}
                onChange={onFieldChange}
                required
              />
            </label>

            <label>
              Budget Range*
              <select
                name="budgetRange"
                value={form.budgetRange}
                onChange={onFieldChange}
                required
              >
                <option value="">Select budget range</option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Desired Timeline*
              <select
                name="desiredTimeline"
                value={form.desiredTimeline}
                onChange={onFieldChange}
                required
              >
                <option value="">Select timeline</option>
                {timelineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="full-row">
              Message*
              <textarea
                name="message"
                rows="7"
                value={form.message}
                onChange={onFieldChange}
                placeholder="Describe your current bottleneck, target outcome, and relevant context."
                required
              />
            </label>

            <div className="full-row form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading || requiredMissing}
              >
                {isLoading ? "Submitting..." : "Submit Request"}
              </button>
              <p className="muted small">Fields marked * are required.</p>
            </div>

            {feedback ? (
              <p className={`form-feedback ${status}`} role="status">
                {feedback}
              </p>
            ) : null}
          </form>

          <aside className="booking-side-panel">
            <div className="surface-card">
              <h2>Consultation focus</h2>
              <p className="muted">
                We prioritize high-impact opportunities where AI can improve revenue,
                response time, or delivery efficiency.
              </p>
            </div>
            <div className="surface-card">
              <h2>Best fit profiles</h2>
              <ul>
                <li>Service businesses with growing inbound demand</li>
                <li>Teams with recurring knowledge-heavy work</li>
                <li>Organizations ready for practical automation</li>
              </ul>
            </div>
          </aside>
        </div>
      </ScrollRevealSection>
    </main>
  );
}
