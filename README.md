[![Playwright Tests](https://github.com/AylinVOO/Playwright-TS-E2E-Framework/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/AylinVOO/Playwright-TS-E2E-Framework/actions/workflows/playwright.yml)

# Playwright TypeScript E2E Framework

An automation suite for SauceDemo built with **TypeScript** and **Page Object Model (POM)** architecture, featuring **Hybrid API/UI Testing**, **Visual Regression**, and **Network Interception**.

---

## 🏗️ Architecture & Design

I built this framework to be organized and easy to update. It separates the "where" from the "what" so the code stays clean and maintainable.

| Layer | Implementation | Benefit |
| :--- | :--- | :--- |
| **Pages** | Page Object Model (POM) | Encapsulates locators; prevents "fragile" tests. |
| **Data** | JSON-based DDT | Validates multiple user personas via a single logic layer. |
| **CI/CD** | GitHub Actions | Automated validation on every commit (Continuous Integration). |

## 💡 Technical Highlights

* **Hybrid API/UI Validation**: Integrated backend health checks that verify site reachability via API before initiating UI tests, reducing execution time and false failures.

* **Visual Regression Testing**: Implemented automated snapshot comparison to ensure UI consistency across Chromium, Firefox, and WebKit.

* **API Mocking**: Implemented **Network Interception** to simulate successful logins, ensuring test stability when external APIs are restricted.

* **Negative Testing**: Implemented **Login Failure Tests** to ensure the application handles invalid credentials.

* **Type Safety**: Uses **Interfaces** to catch data errors during development.
* **E2E Workflows**: Automates the whole journey from Login to Purchase confirmation.
* **Parallel Execution**: Runs tests on **Chromium, Firefox, and WebKit** at the same time.
* **Easy Debugging**: Saves **Screenshots and Videos** automatically if a test fails.


## 🛠️ Challenges Solved

### **Cross-Platform Visual Consistency**
While implementing visual testing, I encountered "false failures" where tests passed on my local Windows machine but failed on the GitHub Linux environment due to subtle font and color rendering differences.

**Solution:** - Analyzed CI error logs and artifacts to identify operating system mismatches.
- Implemented `maxDiffPixelRatio` (5% threshold) to allow for minor OS rendering variations while still catching significant UI bugs.
- Synchronized visual snapshots across Windows and Linux to ensure consistent test results regardless of the operating system.

## 🛠️ Commands

* **Setup**: `npm install`
* **Run All Tests**: `npx playwright test`
* **Run UI Tests**: `npx playwright test tests/login.spec.ts`
* **Run API Tests**: `npx playwright test tests/api-login.spec.ts`
* **UI Mode**: `npx playwright test --ui`
* **Reports**: `npx playwright show-report`