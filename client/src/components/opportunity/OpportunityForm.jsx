function commonIndustryField(form, onChange) {
  return (
    <label>
      Industry
      <select name="industry" value={form.industry || "service"} onChange={onChange}>
        <option value="agency">Agency</option>
        <option value="real_estate">Real Estate</option>
        <option value="accounting">Accounting</option>
        <option value="service">Service Business</option>
        <option value="saas">SaaS</option>
      </select>
    </label>
  );
}

export default function OpportunityForm({ mode, form, onChange, onSubmit, disabled }) {
  return (
    <form className="lead-form op-form" onSubmit={onSubmit}>
      {(mode === "use_cases" || mode === "roadmap") && commonIndustryField(form, onChange)}

      {(mode === "use_cases" || mode === "readiness") ? (
        <label>
          Company size
          <input name="companySize" type="number" min="1" value={form.companySize || ""} onChange={onChange} required />
        </label>
      ) : null}

      {mode === "roadmap" ? (
        <label>
          Business priority
          <input name="businessPriority" value={form.businessPriority || ""} onChange={onChange} placeholder="Example: improve lead quality" required />
        </label>
      ) : null}

      {mode === "readiness" ? (
        <label>
          Monthly lead volume
          <input name="monthlyLeadVolume" type="number" min="0" value={form.monthlyLeadVolume || ""} onChange={onChange} required />
        </label>
      ) : null}

      {mode === "readiness" ? (
        <label>
          Support volume (monthly)
          <input name="supportVolume" type="number" min="0" value={form.supportVolume || ""} onChange={onChange} required />
        </label>
      ) : null}

      {mode === "readiness" ? (
        <label>
          Internal process maturity
          <select name="processMaturity" value={form.processMaturity || "medium"} onChange={onChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      ) : null}

      {mode === "use_cases" ? (
        <label className="full-row">
          Main repetitive task
          <textarea name="repetitiveTask" rows="3" value={form.repetitiveTask || ""} onChange={onChange} required />
        </label>
      ) : null}

      {mode === "use_cases" ? (
        <label className="full-row">
          Customer-facing challenge
          <textarea name="customerChallenge" rows="3" value={form.customerChallenge || ""} onChange={onChange} required />
        </label>
      ) : null}

      {mode === "workflow" ? (
        <label className="full-row">
          Describe a current manual workflow
          <textarea name="manualWorkflow" rows="3" value={form.manualWorkflow || ""} onChange={onChange} required />
        </label>
      ) : null}

      {mode === "workflow" ? (
        <label>
          Where does it slow down?
          <input name="slowdown" value={form.slowdown || ""} onChange={onChange} required />
        </label>
      ) : null}

      {mode === "workflow" ? (
        <label>
          Who is involved?
          <input name="stakeholders" value={form.stakeholders || ""} onChange={onChange} required />
        </label>
      ) : null}

      {mode === "roadmap" ? (
        <label className="full-row">
          Current process issue
          <textarea name="processIssue" rows="3" value={form.processIssue || ""} onChange={onChange} required />
        </label>
      ) : null}

      <div className="full-row form-actions">
        <button className="btn btn-primary" disabled={disabled}>{disabled ? "Generating..." : "Generate"}</button>
      </div>
    </form>
  );
}
