const label =
  "Illustration of a salary run summary: 1,284 employers, 48,920 workers, AED 92.4 million processed, with three employers marked validated, sent to bank, and awaiting funds. Sample data.";

const totals = [
  { value: "1,284", unit: "employers" },
  { value: "48,920", unit: "workers" },
  { value: "AED 92.4M", unit: "processed" },
];

const employers = [
  { name: "Desert Build LLC", workers: "412", status: "VALIDATED" },
  { name: "Gulf Logistics", workers: "1,060", status: "SENT TO BANK" },
  { name: "Palm Facilities", workers: "238", status: "AWAITING FUNDS" },
];

export function PaymentsIllustration() {
  return (
    <figure>
      <div className="ill" role="img" aria-label={label}>
        <div aria-hidden="true">
          <div className="ill-head">
            <span>WPS SALARY RUN · NOVEMBER</span>
            <span>SAMPLE DATA</span>
          </div>
          <div className="ill-totals">
            {totals.map(({ value, unit }) => (
              <span key={unit}>
                <b>{value}</b>
                {unit}
              </span>
            ))}
          </div>
          <div className="ill-row ill-cols">
            <span>EMPLOYER</span>
            <span>WORKERS</span>
            <span>STATUS</span>
          </div>
          {employers.map(({ name, workers, status }) => (
            <div className="ill-row" key={name}>
              <span>{name}</span>
              <span>{workers}</span>
              <span>
                <span className="ill-status">{status}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <figcaption>An illustration with made-up data. The real system is confidential.</figcaption>
    </figure>
  );
}
