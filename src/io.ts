import neatCsv from 'neat-csv';
import stringify from 'csv-stringify/lib/sync';
import { Employee, EmployeeVacation } from './employee';
import { promises } from 'fs';

const { readFile, writeFile } = promises;

export const parseEmployeesCsv = async (): Promise<Employee[]> => {
  const csv = await readFile('./src/employees.csv', 'utf8');
  const employees: Employee[] = await neatCsv(csv, {
    mapHeaders: ({ header }) => header.replace(/\s+/g, ''),
  });

  return employees.map((employee) => ({
    ...employee,
    specialContract: Number(employee.specialContract),
  }));
};

export const writeEmployeesVacationCsv = async (
  employeesVacationList: EmployeeVacation[],
): Promise<void> => {
  const csv = stringify(employeesVacationList, {
    header: true,
  });
  await writeFile(__dirname + '/vacationList.csv', csv);
  console.log('Generated vacationList.csv');
};

