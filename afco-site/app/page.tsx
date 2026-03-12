import Dashboard from '../components/Dashboard';
import Section from '../components/Section';

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">Asian Financial Centres Observatory</div>
            <h1>Determinants of Asian Financial Centres’ Competitiveness</h1>
            <p>
              Comparative institutional analysis of Hong Kong and Singapore, with a focus on how governance quality,
              regulatory effectiveness, and rule of law shape global financial centre performance.
            </p>
            <div className="notice">
              Goal: to analyse how institutional quality affects competitiveness of Asian financial centres using GFCI,
              FDI, and institutional governance indicators.
            </div>
          </div>
          <div className="hero-card">
            <h3>Key preliminary insights</h3>
            <ul>
              <li>Asia hosts ~30–40 financial centres with growing global influence.</li>
              <li>Hong Kong and Singapore remain top-tier hubs despite regional competition.</li>
              <li>Institutional indicators are the most consistent predictors of competitiveness.</li>
            </ul>
          </div>
        </div>
      </section>

      <Section
        id="dashboard"
        title="Data Dashboard"
        subtitle="Live visuals from Google Sheets (update the table, and the charts refresh)"
      >
        <Dashboard />
      </Section>

      <Section
        id="methodology"
        title="Methodology"
        subtitle="How the index is built and why it matters"
      >
        <div className="card-grid">
          <div className="panel">
            <h3>Institutional Competitiveness Index</h3>
            <p>
              Composite score based on Rule of Law, Regulatory Quality, and Control of Corruption, harmonised across
              the sample and re-scaled to a 0–1 range for cross-centre comparability.
            </p>
          </div>
          <div className="panel">
            <h3>Comparative focus</h3>
            <p>
              Hong Kong and Singapore are evaluated as benchmark cases of liberal institutional models, contrasted
              with state-led and hybrid centres in the region.
            </p>
          </div>
          <div className="panel">
            <h3>Empirical model</h3>
            <p>
              Regression specification controls for GDP per capita and market size; institutional variables remain
              statistically significant across model variations.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="downloads"
        title="Downloads"
        subtitle="Share data and reproducible outputs"
      >
        <div className="panel">
          <p>
            Add links to downloadable CSV/Excel exports, regression tables, and appendix materials. When you publish
            the Google Sheet, you can expose a public CSV link here.
          </p>
        </div>
      </Section>

      <footer>
        Prepared for the dissertation "Determinants of Asian Financial Centres’ Competitiveness". Data sources: GFCI,
        World Bank, WGI.
      </footer>
    </main>
  );
}
