# AFCO — Asian Financial Centres Observatory

## Quick start
1. Create a public Google Sheet with tabs for each dataset.
2. Publish the sheet to the web (File → Share → Publish to web).
3. Copy `.env.example` to `.env.local` and fill the sheet ID + tab GIDs.
4. Install deps and run:

```bash
npm install
npm run dev
```

## Required sheet tabs and columns
### 1) GFCI (GFCI tab)
Columns: `year`, `hong_kong`, `singapore`, `shanghai`

### 2) FDI inflows (% GDP)
Columns: `year`, `hong_kong`, `singapore`

### 3) Institutional indicators
Columns: `indicator`, `hong_kong`, `singapore`

### 4) Model classification
Columns: `model_type`, `centres`

### 5) Regression results
Columns: `variable`, `coef`, `p_value`, `significance`

### 6) Map of centres
Columns: `centre`, `lat`, `lon`, `gfci_score`, `cluster`, `model_type`, `year`

## Where to find the sheet ID and tab GID
- Sheet ID: part between `/d/` and `/edit` in the sheet URL.
- Tab GID: number after `gid=` when you open a tab.

Example:
`https://docs.google.com/spreadsheets/d/THIS_IS_ID/edit#gid=123456`

Then set:
- `NEXT_PUBLIC_SHEETS_DOC_ID=THIS_IS_ID`
- `NEXT_PUBLIC_SHEET_GID_...=123456`
