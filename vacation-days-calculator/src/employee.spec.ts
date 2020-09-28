import { Employee, calculateVacationDays, MINIMUM_VACATION_DAYS } from './employee';

describe('Vacation Days Calculater', () => {
  const currentYear = new Date().getUTCFullYear();
  let regularEmployee: Employee;
  let newEmployee: Employee;
  let seniorEmployee: Employee;
  let specialNewEmployee: Employee;
  let specialSeniorEmployee: Employee;
  beforeEach(() => {
    newEmployee = {
      name: 'Peter Becker',
      dateOfBirth: `22.12.${currentYear - 20}`,
      startDate: `15.01.${currentYear}`,
    };
    regularEmployee = {
      name: 'Peter Becker',
      dateOfBirth: `22.12.${currentYear - 27}`,
      startDate: `15.01.${currentYear - 3}`,
    };
    seniorEmployee = {
      name: 'Hans Müller',
      dateOfBirth: `22.12.${currentYear - 50}`,
      startDate: `15.01.${currentYear - 20}`,
    };

    specialNewEmployee = {
      name: 'Peter Becker',
      dateOfBirth: `22.12.${currentYear - 20}`,
      startDate: `15.01.${currentYear}`,
      specialContract: 120,
    };
    specialSeniorEmployee = {
      name: 'Hans Müller',
      dateOfBirth: `22.12.${currentYear - 50}`,
      startDate: `15.01.${currentYear - 20}`,
      specialContract: 120,
    };
  });

  describe('Calculate full vacation days for current year', () => {
    it('New employee has remaining base vacation days until EOY', () => {
      expect(calculateVacationDays(newEmployee, currentYear)).toBe(23.83); // MINIMUM_VACATION_DAYS / 12 * 11
    });

    it('Regular employee has the base vacation days for the year', () => {
      expect(calculateVacationDays(regularEmployee, currentYear)).toBe(MINIMUM_VACATION_DAYS);
    });

    it('Senior employee has the base vacation days for the year + extra days', () => {
      expect(calculateVacationDays(seniorEmployee, currentYear)).toBe(MINIMUM_VACATION_DAYS + 4);
    });

    it('Special new employee has remaining special days until EOY', () => {
      expect(calculateVacationDays(specialNewEmployee, currentYear)).toBe(110); // specialContract / 12 * 11
    });

    it('Special senior employee has the special days despite seniority', () => {
      expect(calculateVacationDays(specialSeniorEmployee, currentYear)).toBe(
        specialNewEmployee.specialContract,
      );
    });
  });

  describe('Calculate full vacation days for future year', () => {
    const futureYear = currentYear + 3;

    it('New employee (current year) is now regular', () => {
      expect(calculateVacationDays(newEmployee, futureYear)).toBe(26); // 3 empoyment years
    });

    it('Regular employee is now senior', () => {
      expect(calculateVacationDays(regularEmployee, futureYear)).toBe(27); // 3+3=6 employment years
    });
  });

  describe('Edge cases', () => {
    it('New employee starting around EOY', () => {
      const baseEmployee = { name: 'Peter Becker', dateOfBirth: '11.08.1992' };
      expect(
        calculateVacationDays(
          {
            ...baseEmployee,
            startDate: `01.11.${currentYear}`,
          },
          currentYear,
        ),
      ).toBe(2.17); // MINIMUM_VACATION_DAYS / 12

      expect(
        calculateVacationDays(
          {
            ...baseEmployee,
            startDate: `01.12.${currentYear}`,
          },
          currentYear,
        ),
      ).toBe(0);
    });

    it('Employee below 30 years working for > 5 years', () => {
      expect(
        calculateVacationDays(
          {
            name: 'Peter Becker',
            dateOfBirth: `01.01.${currentYear - 20}`,
            startDate: `01.01.${currentYear - 6}`,
          },
          currentYear,
        ),
      ).toBe(MINIMUM_VACATION_DAYS);
    });
  });
});
