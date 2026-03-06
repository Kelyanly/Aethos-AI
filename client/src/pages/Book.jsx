import { useMemo, useState } from "react";
import { submitConsultation } from "../lib/api.js";

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
        "Request received. You will get a response with next steps within one business day."
      );
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setFeedback(error.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <main>
      <section className="section page-intro">
        <div className="container intro-grid">
          <div>
            <p className="eyebrow">Consultation Request</p>
            <h1>Tell us about your project.</h1>
            <p className="muted">
              After you submit this form, Aethos AI reviews your request and returns a
              tailored response with recommended scope, expected timeline, and next
              action steps.
            </p>
          </div>
          <aside className="surface-card reassurance">
            <h3>What happens next</h3>
            <ul>
              <li>Initial review of your context and business objective</li>
              <li>Follow-up with targeted questions if needed</li>
              <li>Practical recommendation with delivery options</li>
            </ul>
            <p className="muted small">
              Your information is treated confidentially and used only to evaluate your
              consultation request.
            </p>
          </aside>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container form-shell">
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
              <input
                name="company"
                value={form.company}
                onChange={onFieldChange}
              />
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
                placeholder="Example: B2B services, legal, consulting"
                value={form.businessType}
                onChange={onFieldChange}
                required
              />
            </label>

            <label>
              Project Goal*
              <input
                name="projectGoal"
                placeholder="Example: qualify inbound leads automatically"
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
                rows="6"
                value={form.message}
                onChange={onFieldChange}
                placeholder="Share your context, current bottleneck, and desired outcome."
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
        </div>
      </section>
    </main>
  );
}
