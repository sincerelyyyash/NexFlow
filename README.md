# NexFlow

NexFlow is a workflow management application built with Next.js and ReactFlow. It allows users to create, save, and execute custom workflows. This project leverages Next.js for server-side rendering and ReactFlow for visualizing and managing workflows.

##NOTE: Workflow execution might not work on deployed link, because vercel does not allow file operations on their servers.
## It will work fine locally or when deployed on AWS.

## Features

- **Workflow Builder**: Drag-and-drop interface for creating and configuring workflows.
- **Execution**: Upload files and execute workflows to process data.
- **User Management**: User authentication and authorization.

## Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** (Local or Atlas)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/sincerelyyyash/nexflow.git
cd nexflow
```
### Install Dependency
```bash
npm install
```

### Configure Environment Variables
- Create a .env.local file in the root of your project and add the following environment variables:
- NEXTAUTH_SECRET=''
- MONGODB_URI=

- Replace the placeholder with your actual credentials

### Run the Development Server:
```bash
npm run dev
```

- Visit http://localhost:3000 in your browser to see the application in action.


