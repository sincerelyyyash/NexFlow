import axios from 'axios';

export interface Workflow {
  id: string;
  name: string;
}

export const getWorkflows = async (): Promise<Workflow[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '87aGywgfD', name: 'Filter and Convert Workflow' },
        { id: 'b3nM9xkL2', name: 'Data Analysis Workflow' },
        { id: 'p7Rq2zX5Y', name: 'ETL Process Workflow' },
      ]);
    }, 500);
  });
};

export const runWorkflow = async (file: File, workflowId: string): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    await axios.post(`/api/runWorkflow?workflowId=${workflowId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error running workflow:', error);
    throw error;
  }
};

export const executeWorkflow = async (file: File, workflowId: string): Promise<void> => {
  console.log(`Executing workflow ${workflowId} with file:`, file.name);

  await filterData(file);
  await wait(60000);
  const jsonData = await convertFormat(file);
  await sendPostRequest(jsonData);

  console.log('Workflow execution completed');
};

async function filterData(file: File): Promise<void> {
  console.log('Filtering data...');
}

async function wait(ms: number): Promise<void> {
  console.log(`Waiting for ${ms}ms...`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function convertFormat(file: File): Promise<object> {
  console.log('Converting format from CSV to JSON...');
  return { key: 'value' };
}

async function sendPostRequest(data: object): Promise<void> {
  console.log('Sending POST request...');
  try {
    await axios.post('https://requestcatcher.com/test', data);
    console.log('POST request sent successfully');
  } catch (error) {
    console.error('Error sending POST request:', error);
    throw error;
  }
}
