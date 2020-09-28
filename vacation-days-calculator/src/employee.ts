import moment, { Moment } from 'moment';

export const MINIMUM_VACATION_DAYS = 26;

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

export const calculateSeniorExtraDays = (
  employmentYears: number,
  dateOfBirth: Moment,
  currentYear: Moment,
): number => {
  const age: number = currentYear.diff(dateOfBirth, 'years');
  if (age < 30) {
    return 0;
  }
  return Math.trunc(employmentYears / 5);
};

const calcYearlyNewJoinerDays = (startDate: Moment, daysPerYear: number, currentYear: Moment): number => {
  const employmentMonthsInYear: number = currentYear.diff(
    moment.utc(startDate).startOf('month'),
    'months',
  );
  if (employmentMonthsInYear <= 0) {
    return 0;
  }

  return Number(((daysPerYear / 12) * employmentMonthsInYear).toFixed(2));
};

export const calculateVacationDays = (employee: Employee, calculationYear: number): number => {
  const currentYear = moment.utc(calculationYear, 'YYYY').endOf('year');

  const employeeStartDate = moment.utc(employee.startDate, 'DD.MM.YYYY').startOf('day');
  const employeeDateOfBirth = moment.utc(employee.dateOfBirth, 'DD.MM.YYYY').startOf('day');

  if (currentYear.isBefore(employeeStartDate)) return 0;

  const employemntYears = currentYear.diff(employeeStartDate, 'years');

  if (employemntYears < 1) {
    return calcYearlyNewJoinerDays(
      employeeStartDate,
      employee.specialContract || MINIMUM_VACATION_DAYS,
      currentYear,
    );
  }

  if (employee.specialContract) {
    return employee.specialContract;
  }

  return (
    MINIMUM_VACATION_DAYS +
    calculateSeniorExtraDays(employemntYears, employeeDateOfBirth, currentYear)
  );
};
