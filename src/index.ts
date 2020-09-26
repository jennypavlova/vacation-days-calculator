import { parseEmployeesData } from './parseEmployeesData';

const getEmployees = async () => {
  const employees = await parseEmployeesData();
};

console.log(getEmployees());