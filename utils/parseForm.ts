
import { IncomingForm, File } from 'formidable';
import { IncomingMessage } from 'http';

export const parseForm = (req: IncomingMessage): Promise<{ fields: any; files: any }> => {
  const form = new IncomingForm({
    uploadDir: 'uploads',
    keepExtensions: true,
  });

  return new Promise<{ fields: any; files: any }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};

