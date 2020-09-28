import { Employee, EmployeeVacation, calculateExtraDays, startedThisYear } from './employee';
import { parseEmployeesData } from './parseEmployeesData';
import { outputCsvData } from './output';
const MINIMUM_VACATION_DAYS = 26;

const calculateVacationDays = (employee: Employee): number => {
  if (employee.specialContract) {
    return employee.specialContract;
  }
  return (
    startedThisYear(employee.startDate, MINIMUM_VACATION_DAYS) ||
    MINIMUM_VACATION_DAYS + calculateExtraDays(employee.startDate, employee.dateOfBirth)
  );
};

const generateVacationList = async (): Promise<EmployeeVacation[]> => {
  const employeesFromCsv = await parseEmployeesData();
  const employees: Employee[] = employeesFromCsv.map((employee) => ({
    ...employee,
    specialContract: Number(employee.specialContract),
  }));

  return employees.map((employee) => ({
    name: employee.name,
    vacationDays: calculateVacationDays(employee),
  }));
};

(async () => {
  try {
    const vacationList = await generateVacationList();
    await outputCsvData(vacationList);
    process.exit(0);
  } catch (error) {
    console.error('Failed to execute calculation', error);
    process.exit(1);
  }
})();
