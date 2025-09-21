# BrainBytes : Skill Gap Mapper

## Getting Started

### Prerequisites

- Node.js
- npm or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mehaknaz1/BrainBytes.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Then configure your API keys:

#### OpenRouter API Key

- Visit [OpenRouter - Grok 4 Fast (Free)](https://openrouter.ai/x-ai/grok-4-fast:free)
- Go to the **API** tab section
- Copy your API key and set it as `VITE_OPENROUTER_API_KEY` in your `.env` file

#### TheirStack API Key

- Visit [TheirStack](https://theirstack.com) and create an account
- After login, go to [API Key Settings](https://app.theirstack.com/settings/api-key)
- Copy your API key and set it as `VITE_THEIRSTACK_API_KEY` in your `.env` file

### Running the Application

To start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```
