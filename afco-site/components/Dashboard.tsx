'use client';

import { useMemo, useState } from 'react';
import Plot from './PlotlyChart';
import { useCsvData } from '../lib/useCsvData';
import { getSheetCsvUrl, SHEET_GIDS } from '../lib/sheets';
import { toNumber } from '../lib/csv';

function LoadingState({ label }: { label: string }) {
  return <div className="notice">Загрузка данных: {label}</div>;
}

function ErrorState({ label, error }: { label: string; error: string }) {
  return <div className="notice">Не удалось загрузить {label}: {error}</div>;
}

export default function Dashboard() {
  const gfciUrl = getSheetCsvUrl(SHEET_GIDS.gfci);
  const fdiUrl = getSheetCsvUrl(SHEET_GIDS.fdi);
  const instUrl = getSheetCsvUrl(SHEET_GIDS.institutions);
  const modelUrl = getSheetCsvUrl(SHEET_GIDS.models);
  const regUrl = getSheetCsvUrl(SHEET_GIDS.regression);
  const mapUrl = getSheetCsvUrl(SHEET_GIDS.map);

  const gfci = useCsvData(gfciUrl);
  const fdi = useCsvData(fdiUrl);
  const inst = useCsvData(instUrl);
  const models = useCsvData(modelUrl);
  const regression = useCsvData(regUrl);
  const map = useCsvData(mapUrl);

  const gfciYears = gfci.rows.map((row) => row.year).filter(Boolean);
  const fdiYears = fdi.rows.map((row) => row.year).filter(Boolean);

  const [gfciEndYear, setGfciEndYear] = useState<string | null>(null);
  const [fdiYear, setFdiYear] = useState<string | null>(null);

  const gfciAvailableYears = useMemo(() => [...new Set(gfciYears)], [gfciYears]);
  const fdiAvailableYears = useMemo(() => [...new Set(fdiYears)], [fdiYears]);

  const gfciEnd = gfciEndYear ?? gfciAvailableYears[gfciAvailableYears.length - 1];
  const fdiSelectedYear = fdiYear ?? fdiAvailableYears[fdiAvailableYears.length - 1];

  const gfciFilteredRows = gfci.rows.filter((row) => row.year && row.year <= gfciEnd);
  const fdiFilteredRows = fdi.rows.filter((row) => row.year === fdiSelectedYear);

  const mapYears = map.rows.map((row) => row.year).filter(Boolean);
  const mapAvailableYears = useMemo(() => [...new Set(mapYears)], [mapYears]);
  const [mapYear, setMapYear] = useState<string | null>(null);
  const [mapCluster, setMapCluster] = useState<string>('All');
  const [mapModel, setMapModel] = useState<string>('All');

  const mapSelectedYear = mapYear ?? mapAvailableYears[mapAvailableYears.length - 1];
  const mapClusters = useMemo(
    () => ['All', ...new Set(map.rows.map((row) => row.cluster).filter(Boolean))],
    [map.rows]
  );
  const mapModels = useMemo(
    () => ['All', ...new Set(map.rows.map((row) => row.model_type).filter(Boolean))],
    [map.rows]
  );

  const mapFilteredRows = map.rows.filter((row) => {
    const matchesYear = mapSelectedYear ? row.year === mapSelectedYear : true;
    const matchesCluster = mapCluster === 'All' ? true : row.cluster === mapCluster;
    const matchesModel = mapModel === 'All' ? true : row.model_type === mapModel;
    return matchesYear && matchesCluster && matchesModel;
  });

  return (
    <div className="dashboard">
      <div className="panel">
        <h3>GFCI ranking dynamics</h3>
        <div className="notice">
          Показаны данные до года:&nbsp;
          <select
            value={gfciEnd ?? ''}
            onChange={(event) => setGfciEndYear(event.target.value)}
          >
            {gfciAvailableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {gfci.loading && <LoadingState label="GFCI" />}
        {gfci.error && <ErrorState label="GFCI" error={gfci.error} />}
        {!gfci.loading && !gfci.error && gfciFilteredRows.length > 0 && (
          <Plot
            data={[
              {
                x: gfciFilteredRows.map((row) => row.year),
                y: gfciFilteredRows.map((row) => toNumber(row.hong_kong)),
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Hong Kong',
                line: { color: '#116466' }
              },
              {
                x: gfciFilteredRows.map((row) => row.year),
                y: gfciFilteredRows.map((row) => toNumber(row.singapore)),
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Singapore',
                line: { color: '#d9812c' }
              },
              {
                x: gfciFilteredRows.map((row) => row.year),
                y: gfciFilteredRows.map((row) => toNumber(row.shanghai)),
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Shanghai',
                line: { color: '#314b60' }
              }
            ]}
            layout={{
              height: 320,
              margin: { l: 40, r: 20, t: 20, b: 40 },
              yaxis: { title: 'Ranking (lower is better)', autorange: 'reversed' },
              paper_bgcolor: 'transparent',
              plot_bgcolor: 'transparent',
              legend: { orientation: 'h', y: -0.2 }
            }}
            config={{ displayModeBar: false, responsive: true }}
          />
        )}
      </div>

      <div className="dashboard-row">
        <div className="panel">
          <h3>FDI inflows (% GDP)</h3>
          <div className="notice">
            Год:&nbsp;
            <select
              value={fdiSelectedYear ?? ''}
              onChange={(event) => setFdiYear(event.target.value)}
            >
              {fdiAvailableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {fdi.loading && <LoadingState label="FDI" />}
          {fdi.error && <ErrorState label="FDI" error={fdi.error} />}
          {!fdi.loading && !fdi.error && fdiFilteredRows.length > 0 && (
            <Plot
              data={[
                {
                  x: fdiFilteredRows.map((row) => row.year),
                  y: fdiFilteredRows.map((row) => toNumber(row.hong_kong)),
                  type: 'bar',
                  name: 'Hong Kong',
                  marker: { color: '#116466' }
                },
                {
                  x: fdiFilteredRows.map((row) => row.year),
                  y: fdiFilteredRows.map((row) => toNumber(row.singapore)),
                  type: 'bar',
                  name: 'Singapore',
                  marker: { color: '#d9812c' }
                }
              ]}
              layout={{
                height: 320,
                barmode: 'group',
                margin: { l: 40, r: 20, t: 20, b: 40 },
                paper_bgcolor: 'transparent',
                plot_bgcolor: 'transparent',
                legend: { orientation: 'h', y: -0.2 }
              }}
              config={{ displayModeBar: false, responsive: true }}
            />
          )}
        </div>

        <div className="panel">
          <h3>Institutional indicators</h3>
          {inst.loading && <LoadingState label="Institutions" />}
          {inst.error && <ErrorState label="Institutions" error={inst.error} />}
          {!inst.loading && !inst.error && inst.rows.length > 0 && (
            <Plot
              data={[
                {
                  type: 'scatterpolar',
                  r: inst.rows.map((row) => toNumber(row.hong_kong)),
                  theta: inst.rows.map((row) => row.indicator),
                  fill: 'toself',
                  name: 'Hong Kong',
                  line: { color: '#116466' }
                },
                {
                  type: 'scatterpolar',
                  r: inst.rows.map((row) => toNumber(row.singapore)),
                  theta: inst.rows.map((row) => row.indicator),
                  fill: 'toself',
                  name: 'Singapore',
                  line: { color: '#d9812c' }
                }
              ]}
              layout={{
                height: 320,
                polar: { radialaxis: { visible: true, range: [0, 1] } },
                margin: { l: 40, r: 20, t: 20, b: 40 },
                paper_bgcolor: 'transparent',
                plot_bgcolor: 'transparent',
                legend: { orientation: 'h', y: -0.2 }
              }}
              config={{ displayModeBar: false, responsive: true }}
            />
          )}
        </div>
      </div>

      <div className="dashboard-row">
        <div className="panel">
          <h3>Institutional model classification</h3>
          {models.loading && <LoadingState label="Models" />}
          {models.error && <ErrorState label="Models" error={models.error} />}
          {!models.loading && !models.error && models.rows.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Model Type</th>
                  <th>Centres</th>
                </tr>
              </thead>
              <tbody>
                {models.rows.map((row) => (
                  <tr key={row.model_type}>
                    <td>{row.model_type}</td>
                    <td>{row.centres}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="panel">
          <h3>Regression results</h3>
          {regression.loading && <LoadingState label="Regression" />}
          {regression.error && <ErrorState label="Regression" error={regression.error} />}
          {!regression.loading && !regression.error && regression.rows.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>Coef.</th>
                  <th>p-value</th>
                  <th>Significance</th>
                </tr>
              </thead>
              <tbody>
                {regression.rows.map((row) => (
                  <tr key={row.variable}>
                    <td>{row.variable}</td>
                    <td>{row.coef}</td>
                    <td>{row.p_value}</td>
                    <td><span className="badge">{row.significance}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="panel">
        <h3>Interactive map of Asian financial centres</h3>
        <div className="notice">
          <span>Год:</span>
          <select value={mapSelectedYear ?? ''} onChange={(event) => setMapYear(event.target.value)}>
            {mapAvailableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <span>Кластер:</span>
          <select value={mapCluster} onChange={(event) => setMapCluster(event.target.value)}>
            {mapClusters.map((cluster) => (
              <option key={cluster} value={cluster}>
                {cluster}
              </option>
            ))}
          </select>
          <span>Тип модели:</span>
          <select value={mapModel} onChange={(event) => setMapModel(event.target.value)}>
            {mapModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
        {map.loading && <LoadingState label="Map" />}
        {map.error && <ErrorState label="Map" error={map.error} />}
        {!map.loading && !map.error && mapFilteredRows.length > 0 && (
          <Plot
            data={[
              {
                type: 'scattergeo',
                mode: 'markers+text',
                lat: mapFilteredRows.map((row) => toNumber(row.lat)),
                lon: mapFilteredRows.map((row) => toNumber(row.lon)),
                text: mapFilteredRows.map((row) => row.centre),
                marker: {
                  size: mapFilteredRows.map((row) => Math.max(6, toNumber(row.gfci_score) / 5)),
                  color: mapFilteredRows.map((row) => row.cluster),
                  colorscale: 'Viridis',
                  showscale: false,
                  line: { width: 1, color: '#ffffff' },
                  opacity: 0.85
                }
              }
            ]}
            layout={{
              height: 420,
              margin: { l: 0, r: 0, t: 0, b: 0 },
              geo: {
                scope: 'asia',
                projection: { type: 'natural earth' },
                bgcolor: 'rgba(0,0,0,0)',
                showland: true,
                landcolor: '#f1ede4',
                showcountries: true,
                countrycolor: '#d5cfc3'
              },
              paper_bgcolor: 'transparent'
            }}
            config={{ displayModeBar: false, responsive: true }}
          />
        )}
      </div>
    </div>
  );
}
