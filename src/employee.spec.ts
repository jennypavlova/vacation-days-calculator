import moment from 'moment';

import './index';
import { Employee, specialContract } from './employee';

describe('Vacation Days Calculater', () => {
  let employee: Employee;
  let personSpecial: Employee;
  beforeEach(() => {
    employee = {
      name: 'Hans Müller',
      dateOfBirth: moment('29.11.1951', 'DD.MM.YYYY').utc().startOf('day').toDate(),
      startDate: moment('01.01.2002', 'DD.MM.YYYY').utc().startOf('day').toDate(),
    };
    personSpecial = {
      name: 'Hans Müller',
      dateOfBirth: moment('29.11.1951', 'DD.MM.YYYY').utc().startOf('day').toDate(),
      startDate: moment('01.01.2002', 'DD.MM.YYYY').utc().startOf('day').toDate(),
      specialVacationDays: 29,
    };
  });
  describe('When calculating the special contract condition', () => {
    it('Should return 0 special days', () => {
      const specialVacation = specialContract(employee);
      expect(specialVacation).toBe(0);
    });
    it('Should return 29 special days', () => {
      const specialVacation = specialContract(personSpecial);
      expect(specialVacation).toBe(29);
    });
  });
});
