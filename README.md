# Spinnaker Pipeline Mockup

This project is a React-based mockup of a Spinnaker pipeline interface. It provides a visual representation of deployment stages and their statuses, offering a user-friendly way to monitor and manage deployment pipelines.

## Features

- Visual representation of pipeline stages
- Detailed view of deploy stage information
- Status indicators for each stage and resource
- Responsive design for various screen sizes

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v12.0.0 or later)
- npm (v6.0.0 or later)

## Installation

To install the Spinnaker Pipeline Mockup, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/tomaszsikora/pipeline-mockup.git
   ```

2. Navigate to the project directory:
   ```
   cd pipeline-mockup
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To run the development server:

```
npm start
```

This will start the development server and open the application in your default web browser. The app will reload if you make edits to the source files.

To create a production build:

```
npm run build
```

This will generate a `dist` folder with the production-ready files. The `index.html` file in this folder will have all JavaScript and CSS inlined.

## Project Structure

```
/spinnaker-pipeline-mockup
    /src
        /components
            DeployStageDetails.js
            FilterBar.js
            PipelineView.js
            Sidebar.js
            TopNavBar.js
        App.js
        index.js
        index.html
        styles.css
    package.json
    webpack.config.js
    README.md
```
