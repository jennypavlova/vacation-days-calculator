import fs from 'fs';
import stringify, { Stringifier } from 'csv-stringify';
import { EmployeeVacation } from './employee';

export const outputCsvData = (vacationList: EmployeeVacation[]): Stringifier =>
  stringify(
    vacationList,
    {
      header: true,
    },
    (error: Error, output: string) => {
      if (error) {
        throw new Error('Error while writhing the csv');
      }
      fs.writeFile(__dirname + '/vacationList.csv', output, () =>
        console.log('Generated vacationList.csv'),
      );
    },
  );
