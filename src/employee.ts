import moment from 'moment';

export type Employee = {
  name: string;
  dateOfBirth: string;
  startDate: string;
  specialContract?: number;
  vacantionDays?: number;
};

export type EmployeeVacation = {
  name: string;
  vacationDays: number;
};

const dateOfBirthAsDate = (dateOfBirthString: string) =>
  moment(dateOfBirthString, 'DD.MM.YYYY').utc().startOf('day');

const startDateAsDate = (startDateString: string) =>
  moment(startDateString, 'DD.MM.YYYY').utc().startOf('day');

export const specialContract = (employee: Employee): number =>
  employee.specialContract ? employee.specialContract : 0;

export const calculateExtraDays = (startDate: string, dateOfBirth: string): number => {
  const today = moment().utc().startOf('day');
  const age: number = today.diff(dateOfBirthAsDate(dateOfBirth), 'years');
  const employmentYears: number = today.diff(startDateAsDate(startDate), 'years');
  if (age < 30) {
    return 0;
  }
  return Math.trunc(employmentYears / 5);
};

export const startedThisYear = (startDate: string, daysPerYear: number): number => {
  const today = moment().utc().startOf('day');
  const employmentYears: number = today.diff(
    moment(startDateAsDate(startDate), 'DD.MM.YYYY').utc().startOf('day'),
    'years',
  );
  const employmentMonths: number = today.diff(
    moment(startDateAsDate(startDate), 'DD.MM.YYYY').utc().startOf('day'),
    'months',
  );
  if (employmentMonths < 1) {
    return 0;
  }
  if (employmentYears < 1) {
    return Number(((daysPerYear / 12) * (employmentMonths-1)).toFixed(2));
  }
  return 0;
};
