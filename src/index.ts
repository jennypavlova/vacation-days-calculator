import { Employee, EmployeeVacation, specialContract, calculateExtraDays, startedThisYear } from './employee';
import { parseEmployeesData } from './parseEmployeesData';
import { outputCsvData } from './output';
const MINIMUM_VACATION_DAYS = 26;

const setVacationDaysSpecial = (employees: Employee[]) =>
  employees.map((employee) => {
    employee.vacantionDays = specialContract(employee);
    if (!employee.vacantionDays) {
      employee.vacantionDays =
        startedThisYear(employee.startDate, MINIMUM_VACATION_DAYS) ||
        MINIMUM_VACATION_DAYS + calculateExtraDays(employee.startDate, employee.dateOfBirth);
    }
    return employee;
  });

const getVacationList = (employees: Employee[]): EmployeeVacation[] =>
  employees.map((employee) => ({ name: employee.name, vacationDays: employee.vacantionDays }));

const getEmployees = async () => {
  const employeesFromCsv = await parseEmployeesData();
  const employees: Employee[] = employeesFromCsv.map((employee) => ({
    name: employee.name,
    dateOfBirth: employee.dateOfBirth,
    startDate: employee.startDate,
    specialContract: Number(employee.specialContract),
  }));

  outputCsvData(getVacationList(setVacationDaysSpecial(employees)));

  return getVacationList(setVacationDaysSpecial(employees));
};

console.log(getEmployees());
