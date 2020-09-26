import moment from 'moment';

export type Employee = {
  name: string;
  dateOfBirth: Date;
  startDate: Date;
  specialVacationDays?: number;
};

export const specialContract = (employee: Employee): number =>
  employee.specialVacationDays ? employee.specialVacationDays : 0;

export const calculateExtraDays = (startDate: string, dateOfBirth: string): number => {
  const today = moment().utc().startOf('day');
  const age: number = today.diff(moment(dateOfBirth, 'DD.MM.YYYY').utc().startOf('day'), 'years');
  const employmentYears: number = today.diff(
    moment(startDate, 'DD.MM.YYYY').utc().startOf('day'),
    'years',
  );
  if (age < 30) {
    return 0;
  }
  return Math.trunc(employmentYears / 5);
};