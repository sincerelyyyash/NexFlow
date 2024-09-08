# NexFlow

NexFlow is a workflow management application built with Next.js, ReactFlow and Next-Auth for Authentication. It allows users to create, save, and execute custom workflows. This project leverages Next.js for server-side rendering and ReactFlow for visualizing and managing workflows.

## NOTE: 
- Workflow execution might not work on deployed link, because vercel does not allow file operations on their servers.
- It will work fine locally or when deployed on AWS.

### Homepage
<img width="1419" alt="Screenshot 2024-09-08 at 5 47 25 AM" src="https://github.com/user-attachments/assets/a2b7b920-3f21-4c5c-b01a-ddf9dcf2d1e0">

### Sign In Page
<img width="1419" alt="Screenshot 2024-09-08 at 5 47 32 AM" src="https://github.com/user-attachments/assets/9d1bb3d3-d6a2-4e7a-bbb0-3f39bc78dae8">

### Workflow Creation Page
<img width="1419" alt="Screenshot 2024-09-08 at 5 48 13 AM" src="https://github.com/user-attachments/assets/3c8db161-f5da-4472-875f-30b7ea3b61a5">

### Workflow Execution Page
<img width="1419" alt="Screenshot 2024-09-08 at 5 48 25 AM" src="https://github.com/user-attachments/assets/1778f389-5ba5-4332-acfe-cf1991cd7267">


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


