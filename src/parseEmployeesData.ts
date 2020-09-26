import neatCsv from 'neat-csv';
import { Employee } from './employee';
import { promises } from 'fs';

export const parseEmployeesData = async (): Promise<Employee[]> => {
  const csv = await promises.readFile('./src/employees.csv', 'utf8');
  const results: Employee[] = await neatCsv(csv, {
    mapHeaders: ({ header }) => header.replace(/\s+/g, ''),
  });
  return results;
};
