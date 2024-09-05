
import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to parse form data' });
      }

      const file = files.file?.[0]; // Get the file from the files object
      const workflowId = fields.workflowId?.[0]; // Get workflowId from fields

      if (!file || !workflowId) {
        return res.status(400).json({ error: 'Missing file or workflowId' });
      }

      try {
        const csvData = fs.readFileSync(file.filepath, 'utf8');
        const records = parse(csvData, { columns: true });


        const workflows: any[] = []; 

        const workflow = workflows.find(w => w.id === workflowId);
        if (!workflow) return res.status(404).json({ error: 'Workflow not found' });

        await axios.post('https://requestcatcher.com/', records);

        res.status(200).json({ message: 'Workflow executed successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to execute workflow' });
      }
    });
  } else {
    res.status(405).end();
  }
}

