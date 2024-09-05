// utils/multipart.ts
import { NextRequest } from 'next/server';

export async function parseMultipartFormData(request: NextRequest): Promise<FormData> {
  const contentType = request.headers.get('content-type');
  if (!contentType || !contentType.includes('multipart/form-data')) {
    throw new Error('Content type must be multipart/form-data');
  }

  const formData = await request.formData();
  return formData;
}
