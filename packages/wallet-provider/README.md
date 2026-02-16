# OPTZ Social Login Smart Wallet

Premium Social Login & Smart Wallet SDK for Starknet. Designed to reduce friction for developers by providing pre-styled components and automatic wallet orchestration.

## Features

- **SocialLogin**: Pre-configured Sign-In/Sign-Up forms with premium glassmorphism styling.
- **WalletCard**: A reactive component that displays the user's Starknet Smart Wallet (auto-creates if missing).
- **useFetchWallet**: High-level hook to access wallet address, status, and orchestrate auto-creation with Open The Doorz.

## Installation

```bash
npm install @optref/social-login-smart-wallet
```

## Deployment (Full System)

If you want to deploy the entire pre-configured system (Next.js pages, components, and infrastructure) into your current project:

```bash
npx optz-init
```

```bash
npm install
```

```bash
npm run dev
```

This will scaffold the `app`, `components`, `hooks`, and `infrastructure` folders into your root directory.

## Usage

```tsx
import { SocialLogin } from "@optref/social-login-smart-wallet";

function App() {
  return <SocialLogin />;
}
```
