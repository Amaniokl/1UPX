# 1UPX

# AgentAI - Onboarding and Cross-Chain Application

## Description

AgentAI is a React-based web application designed to streamline the onboarding process and provide cross-chain functionality. This project focuses on a modular architecture, allowing users to configure AI agents, upload data, and seamlessly interact across multiple blockchains. This project aims to empower developers to create applications that can interface with AI agents on multiple chains for enhanced UX.

This project is targeted towards developers looking to:

*   Build applications with seamless onboarding flows.
*   Implement token bridging and cross-chain interactions.
*   Create interfaces for AI agent configuration and management.
*   Integrate Web3 authentication and user flows.

Key Features:

*   **Modular Onboarding:** Multi-step onboarding process with component reusability and data management via React Context.
*   **AI Agent Configuration:** AI agent selection and customization, supporting file uploads and prompt interaction.
*   **Cross-Chain Bridging:** Securely transfer tokens across multiple blockchains including Ethereum, Arbitrum, Base, Optimism, and Solana.
*   **Web3 Authentication:** Securely authenticates users using wallet-based authentication via `Web3Context`.
*   **Responsive UI:** A modern and responsive user interface built using Tailwind CSS.

## Technologies Used

*   **Frontend:** React, TypeScript, Tailwind CSS, `react-router-dom`, `lucide-react`
*   **State Management:** React Context API, `useState`
*   **Web3:** `ethers`, `viem`, `bs58`, `@solana/web3.js`, `@web3auth/base`, `@web3auth/web3auth`
*   **Cross-Chain Bridging:** `@lifi/sdk`
*   **UI Libraries:** `shadcn/ui` components library.
*   **Build Tools:** ESLint, PostCSS
*   **Other:**  `axios`

## File Structure

*   `src/` - Main source code directory.
    *   `components/` - Contains reusable React components.
        *   `OnboardingStep1.tsx`, `OnboardingStep2.tsx`, `OnboardingStep3.tsx`, `OnboardingStep4.tsx`:  Implements the multi-step onboarding flow.
        *   `WhyWeDo.tsx`: Displays the "Why We Do" section, including background effects and dynamic UI.
        *   `Navbar.tsx`:  Responsive navigation bar with user authentication and mobile menu.
        *   `FloatingChatbot.tsx`: A floating chatbot UI for interacting with an AI assistant.
        *   `SignUpPopup.tsx`:  A modal for early access sign-ups.
        *   `Benefits.tsx`: Displays benefits information.
        *   `PrivacyOwnership.tsx`: Displays privacy-focused information.
        *   `WhatWeDo.tsx`: Displays a "What We Do" section.
    *   `utils/` - Utility functions.
        *   `bridgeUtils.ts`:  Functions for cross-chain token bridging and network interactions.
    *   `App.tsx` - Entry point of the React application.
    *   `index.tsx` - Renders the application.
*   `tailwind.config.js` - Tailwind CSS configuration.
*   `postcss.config.js` - PostCSS configuration.
*   `eslint.config.js` - ESLint configuration.
*   `package.json` - Project dependencies and scripts.

## Architecture Overview

The application follows a modular, component-based architecture built with React. The primary goal of this project is to implement a seamless onboarding experience and to bridge tokens between blockchains.

**Overall Architecture:**

*   The application uses a component-based architecture, providing a structured way to organize and maintain the user interface.  The structure is built within the React framework.
*   Responsibilities are distributed across modules: configurations handle tooling, styling, and code quality (`tailwind.config.js`, `postcss.config.js`, `eslint.config.js`), while components handle user workflows and page structures (`OnboardingStep1.tsx`, `OnboardingStep2.tsx`, `OnboardingStep3.tsx`, `OnboardingStep4.tsx`, `WhyWeDo.tsx`, `OnboardingNavbar.tsx`). The `bridgeUtils.ts` module encapsulates complex cross-chain transaction logic and utility functions.

**Key Components/Services:**

*   **Onboarding Flow:** A multi-step onboarding process managed by components like `OnboardingStep1`, `OnboardingStep2`, `OnboardingStep3`, and `OnboardingStep4`. These components handle user input, data validation, and navigation between steps.
*   **Navigation Bar:**  `OnboardingNavbar` provides a responsive navigation bar with user authentication controls, mobile menu, and scroll-to-section features.
*   **Cross-Chain Bridge:** The `bridgeUtils.ts` module exposes functions for bridging tokens across Ethereum and other blockchains, utilizing the `@lifi/sdk` library.
*   **AI Agent Interface:** `OnboardingStep4` allows users to configure AI agents, upload knowledge base files, and interact with the agents via a prompt interface.
*   **"Why We Do" Section:** The `WhyWeDo.tsx` component dynamically generates a visual appealing and informative content section, displaying the application's purpose and benefits.

**Data Flow & State Management:**

*   **Unidirectional Data Flow:** Data flows primarily through props and the React Context API. Data moves from parent to child components, like with the onboarding steps.
*   **Context API:** Used for managing and sharing global application state, particularly during the onboarding process. Components like `OnboardingStep1`, `OnboardingStep2`, `OnboardingStep3`, and `OnboardingStep4` interact with `OnboardingContext`.
*   **Local State:** Components like `SignUpPopup` and `OnboardingNavbar` use `useState` for handling their local UI-specific state.

**API Design & Integration Points:**

*   API calls are made via `fetch` (e.g., in `OnboardingStep4.tsx` and `SignUpPopup.tsx`).
*   `/api/signup` endpoint is mentioned.
*   Backend endpoints for AI interaction.

**Authentication & Authorization:**

*   `Web3Context` handles wallet-based authentication, allowing users to connect with their wallets.  Authentication logic includes `handleLogin` and `handleLogout` functions, and conditional rendering of authentication controls.

## Installation

**Prerequisites:**

*   Node.js (v16 or higher)
*   npm or yarn
*   Git

**Setup:**

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup:**

    *   Create a `.env` file in the root of the project.
    *   Define environment variables (e.g., API keys, Web3 provider URLs).

    ```
    # Example .env
    VITE_API_KEY=YOUR_API_KEY
    VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
    ```

## Usage

**Running the Application:**

```bash
npm run dev
# or
yarn dev
```

This will start the development server. Open your web browser and navigate to the address provided (usually `http://localhost:5173`).

**Example API Usage:**

The application makes API calls to backend endpoints (e.g., the signup endpoint):

```javascript
// Example in SignUpPopup.tsx
fetch('/api/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
})
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear commit messages.
4.  Submit a pull request.

See [`CONTRIBUTING.md`](<insert_link_to_contributing.md_file_if_available>) if available for more detailed information.

## License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) [Year] [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
