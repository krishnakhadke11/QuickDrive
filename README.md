# Angular Application Setup

This document provides instructions for setting up and running the Angular application.

## Prerequisites

- **Node.js**: Version `>= v20.9.0`
- **Angular CLI**: Install globally using npm

```bash
npm install -g @angular/cli
```
# PowerShell Script Execution Policy

On Windows client computers, the execution of PowerShell scripts is disabled by default. If you encounter errors when running a PowerShell script, you may need to change the execution policy.

## Steps to Change the Execution Policy

1. **Open PowerShell as Administrator**:
   - Right-click on the Start menu and select "Windows PowerShell (Admin)" or "Windows Terminal (Admin)".
   
2. **Run the following command** to allow the execution of PowerShell scripts:

   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
   ```

# Environment Configuration

To configure environment variables for your application, you need to add the necessary settings to the `environment.ts` file.

## Steps to Configure Environment Variables

1. **Create a folder**:
  Create a folder at `./src/` naming `environments` and create a file inside that folder naming `environment.ts` file.

2. **Add the Following Configuration**:
   Include the necessary environment variables in the file. For example:

   ```bash
         export const environment = {
          production: false,
          mapbox: {
            accessToken: '',
            directionService: '',
            style: ''
          },
          BASE_URL: '',
          secretKey: ''
          };
    ```
# Running the Application
To run the Angular application, use the following command:

```bash
ng serve -o
```



