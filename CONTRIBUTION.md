# Contribution Guide

We welcome contributions to Building-u-feedback! Please follow these guidelines to ensure a smooth contribution process.

**NOTE: BEFORE OPENING UP A PR, MAKE SURE TO CLAIM THE ISSUE YOU WOULD LIKE TO WORK ON.**

## Getting Started

1. **Fork the Repository**
   - Navigate to the [Building-u-feedback repository](https://github.com/buildingu/Building-u-feedback.git) on GitHub.
   - Click the "Fork" button in the upper right corner of the page. This will create a copy of the repository in your GitHub account.

2. **Clone Your Fork**
   - Open your terminal and clone your forked repository:
     ```sh
     git clone https://github.com/your-username/Building-u-feedback.git
     ```
   - Navigate into the cloned directory:
     ```sh
     cd Building-u-feedback
     ```

3. **Set Upstream Remote**
   - To keep your fork in sync with the original repository, add an upstream remote:
     ```sh
     git remote add upstream https://github.com/buildingu/Building-u-feedback.git
     ```

## Branch Naming Convention

Create your branch using the following convention:
- **Allowed commit terms:** `fix`, `feature`, `hotfix`, `chore`

Examples:
- For Front-End: `FE-feature-add-footer`, `FE-chore-update-package-a`
- For Back-End: `BE-feature-add-rate-limiter`, `BE-fix-auth-bug`

## Contribution Rules

1. **Create a Branch**
   - Create a new branch for your feature or fix:
     ```sh
     git checkout -b FE-feature-add-footer
     ```
   - Make your changes in this branch.

2. **Commit Your Changes**
   - Follow the branch naming convention for your commit messages:
     ```sh
     git commit -m "FE-feature-add-footer"
     ```

3. **Push to Your Fork**
   - Push your branch to your forked repository:
     ```sh
     git push origin FE-feature-add-footer
     ```

4. **Create a Pull Request**
   - Navigate to your forked repository on GitHub.
   - Click the "New pull request" button.
   - Select your branch and the original repository's `main` branch as the base.
   - Provide a clear and detailed description of your changes.
   - Submit the pull request.

5. **Request Code Review**
   - Request a code review by tagging the relevant reviewers.

6. **Merge Code**
   - Once your pull request has been reviewed and approved, it will be merged by the repository maintainers.

## Thank you for contributing to Building-u-feedback! Your support is greatly appreciated.
