import { writeFile } from 'fs';
import { promisify } from 'util';
const promisifiedWriteFile = promisify(writeFile);

import stringify from 'csv-stringify/lib/sync';
import { EmployeeVacation } from './employee';

export const outputCsvData = async (vacationList: EmployeeVacation[]): Promise<void> => {
  const csv = stringify(vacationList, {
    header: true,
  });
  await promisifiedWriteFile(__dirname + '/vacationList.csv', csv);
  console.log('Generated vacationList.csv');
};
