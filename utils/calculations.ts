export interface EarningsData {
  gross: number;
  fees: number;
  net: number;
  hours: number;
  trips: number;
}

export interface ExpenseData {
  amount: number;
  category: string;
  date: string;
}

export const calculateHourlyRate = (earnings: number, hours: number): number => {
  if (hours === 0) return 0;
  return earnings / hours;
};

export const calculateTripAverage = (earnings: number, trips: number): number => {
  if (trips === 0) return 0;
  return earnings / trips;
};

export const calculateProfitMargin = (net: number, gross: number): number => {
  if (gross === 0) return 0;
  return (net / gross) * 100;
};

export const calculateFeePercentage = (fees: number, gross: number): number => {
  if (gross === 0) return 0;
  return (fees / gross) * 100;
};

export const calculateWeeklyProgress = (current: number, target: number): number => {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
};

export const calculateExpensesByCategory = (expenses: ExpenseData[]): Record<string, number> => {
  return expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);
};

export const calculateMonthlyTrend = (data: EarningsData[]): number => {
  if (data.length < 2) return 0;
  
  const latest = data[data.length - 1];
  const previous = data[data.length - 2];
  
  if (previous.net === 0) return 0;
  
  return ((latest.net - previous.net) / previous.net) * 100;
};

export const calculateEfficiencyScore = (earnings: EarningsData): number => {
  const hourlyRate = calculateHourlyRate(earnings.net, earnings.hours);
  const tripAverage = calculateTripAverage(earnings.net, earnings.trips);
  
  // Scoring based on UK driver averages
  const hourlyScore = Math.min((hourlyRate / 15) * 50, 50); // £15/hr = 50 points
  const tripScore = Math.min((tripAverage / 8) * 50, 50); // £8/trip = 50 points
  
  return Math.round(hourlyScore + tripScore);
};

export const calculateTaxDeductions = (expenses: ExpenseData[], mileage: number, mileageRate: number = 0.45): number => {
  const expenseTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const mileageDeduction = mileage * mileageRate;
  
  return expenseTotal + mileageDeduction;
};

export const calculateBreakEvenHours = (weeklyExpenses: number, hourlyRate: number): number => {
  if (hourlyRate === 0) return 0;
  return weeklyExpenses / hourlyRate;
};

export const predictWeeklyEarnings = (currentEarnings: number, daysPassed: number): number => {
  if (daysPassed === 0) return 0;
  const dailyAverage = currentEarnings / daysPassed;
  return dailyAverage * 7;
};

export const calculateOptimalWorkingHours = (targetEarnings: number, averageHourlyRate: number): number => {
  if (averageHourlyRate === 0) return 0;
  return Math.ceil(targetEarnings / averageHourlyRate);
};