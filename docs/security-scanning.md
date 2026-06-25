# DevSecOps Security Scanning

This repository uses a GitHub Actions security pipeline in `.github/workflows/security.yml`.

## What Runs

- Gitleaks scans the current tree and Git history for leaked secrets.
- Semgrep runs SAST rules for common security bugs and project-specific Next.js API route risks.
- Trivy scans npm dependencies and repository configuration for high and critical vulnerabilities.
- Trivy generates a CycloneDX SBOM artifact for dependency inventory.
- OWASP ZAP can run a baseline DAST scan against a staging URL.

## Required GitHub Settings

Set this repository variable before enabling DAST:

```text
STAGING_URL=https://your-staging-url.example
```

If this repository belongs to a GitHub organization, Gitleaks Action may also require a free `GITLEAKS_LICENSE` repository secret.

Recommended branch protection for `main`:

- Require status checks before merge.
- Require branches to be up to date before merge.
- Require `Secrets Detection (Gitleaks)`.
- Require `SAST (Semgrep)`.
- Require `SCA and IaC (Trivy)`.
- Require `Security Gate`.

`DAST (OWASP ZAP)` is intentionally not required by default because it depends on a live staging deployment. It runs on the weekly schedule when `STAGING_URL` exists, or manually through `workflow_dispatch` with `run_dast=true`.

## Local Developer Loop

Install pre-commit if you want the same early feedback locally:

```bash
pip install pre-commit
pre-commit install
pre-commit run --all-files
```

## Triage Guidance

- Treat any Gitleaks finding as urgent until the secret is rotated or proven inert.
- Fix Semgrep findings in application code or add a narrow rule suppression with a short justification.
- For Trivy dependency findings, prefer a normal package upgrade. Avoid forced downgrades or major migrations without a separate test pass.
- For ZAP findings, confirm whether the issue exists on the production deployment path before changing thresholds in `.zap/rules.tsv`.
