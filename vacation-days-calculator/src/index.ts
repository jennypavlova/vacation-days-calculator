import { calculateVacationDays, Employee, EmployeeVacation } from './employee';
import { parseEmployeesCsv, writeEmployeesVacationCsv } from './io';

const generateVacationList = async (employees: Employee[]): Promise<EmployeeVacation[]> =>
  employees.map((employee) => ({
    name: employee.name,
    vacationDays: calculateVacationDays(employee, new Date().getUTCFullYear()),
  }));

(async () => {
  try {
    const employees = await parseEmployeesCsv();
    const employeesVacationList = await generateVacationList(employees);
    console.log(
      'Generated employees vacation list\n',
      JSON.stringify(employeesVacationList, null, 2),
    );
    await writeEmployeesVacationCsv(employeesVacationList);
    process.exit(0);
  } catch (error) {
    console.error('Failed to execute calculation', error);
    process.exit(1);
  }
})();
