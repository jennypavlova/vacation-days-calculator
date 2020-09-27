import moment from 'moment';

import './index';
import { Employee, specialContract, calculateExtraDays, startedThisYear } from './employee';

describe('Vacation Days Calculater', () => {
  let employee: Employee;
  let employeeSpecial: Employee;
  let newEmployee: Employee;
  beforeEach(() => {
    employee = {
      name: 'Hans Müller',
      dateOfBirth: '29.11.1951',
      startDate: '01.01.2002',
    };
    employeeSpecial = {
      name: 'Peter Becker',
      dateOfBirth: '11.08.1992',
      startDate: '15.05.2017',
      specialContract: 29,
    };
    newEmployee = {
      name: 'Peter Becker',
      dateOfBirth: '11.08.1992',
      startDate: '15.01.2020',
    };
  });
  describe('When calculating the special contract condition', () => {
    it('Should return minimum vacation days', () => {
      const specialVacation = specialContract(employee);
      expect(specialVacation).toBe(0);
    });
    it('Should return special vacation days', () => {
      const specialVacation = specialContract(employeeSpecial);
      expect(specialVacation).toBe(29);
    });
  });

  describe('When calculating the extra days per 5 years of employment', () => {
    it('Should return extra vacation days', () => {
      const extraVacationDays = calculateExtraDays(employee.startDate, employee.dateOfBirth);
      expect(extraVacationDays).toBe(3);
    });
    it('Should return 0 days for new employeee', () => {
      const extraVacationDays = calculateExtraDays(
        newEmployee.startDate,
        newEmployee.dateOfBirth,
      );
      expect(extraVacationDays).toBe(0);
    });
  });

  describe('When calculating the days for new employees (sarted this year)', () => {
    it('Should return all vacation days', () => {
      const vacationDays = startedThisYear(employee.startDate, 26);
      expect(vacationDays).toBe(0);
    });
    it('Should return 0 days for new employeee', () => {
      const vacationDays = startedThisYear(
        newEmployee.startDate,
        26,
      );
      expect(vacationDays).toBe(15.17);
    });
  });
});
