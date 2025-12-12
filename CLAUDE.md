# BLANXLAIT Infrastructure

AI-native software consultancy website hosted on Firebase.

## Project Structure

```
blanxlait-infrastructure/
├── blanxlait-site/          # React + Vite frontend
│   ├── src/components/      # React components
│   ├── tests/               # Playwright tests
│   └── dist/                # Build output
├── firebase.json            # Firebase hosting config
├── firestore.rules          # Firestore security rules
└── .github/workflows/       # CI/CD (GitHub Actions)
```

## Development

```bash
# Start dev server
npm run dev

# Build
npm run build
```

## Testing

**IMPORTANT: Always run tests before pushing to avoid CI failures.**

```bash
cd blanxlait-site

# Run all tests (quick, chromium only)
npm test -- --project=chromium

# Run specific test suites
npm run test:functionality
npm run test:accessibility
npm run test:security
npm run test:responsive
npm run test:seo
npm run test:performance

# Run tests with UI (debugging)
npm run test:ui
```

## Deployment

- **Automatic**: Push to `main` triggers CI/CD (test → deploy to Firebase)
- **Manual**: `npm run deploy` (requires Firebase auth)

## Architecture

- **Frontend**: React 19 + Vite + TypeScript
- **Hosting**: Firebase Hosting
- **CI/CD**: GitHub Actions with Workload Identity Federation (no secrets)
- **Booking**: Cal.com integration (cal.com/ryan-niemes-wwremh/30min)

## Key Files

- `blanxlait-site/src/components/Contact.tsx` - Cal.com booking integration
- `blanxlait-site/src/components/Logo.tsx` - Logo with light/dark variants
- `.github/workflows/test.yml` - CI/CD pipeline
- `firebase.json` - Hosting and security headers config

## Firebase Project

- Project ID: `blanxlait-infrastructure`
- Hosting URL: https://blanxlait-infrastructure.web.app
