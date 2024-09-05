
import { parse } from 'csv-parse/sync';

export function csvToJson(csvData: string): any[] {
  return parse(csvData, { columns: true });
}
