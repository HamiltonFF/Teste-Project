
const monthMap: Record<string, number> = {
  jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5,
  jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11
};

export const parseCustomDate = (dateStr: string): Date => {
  const parts = dateStr.trim().split(' ');
  if (parts.length !== 3) return new Date(); // Fallback
  
  const day = parseInt(parts[0], 10);
  const monthStr = parts[1].toLowerCase().replace('.', '');
  const year = parseInt(parts[2], 10);
  
  const month = monthMap[monthStr] !== undefined ? monthMap[monthStr] : 0;
  
  return new Date(year, month, day);
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getMonthName = (monthIndex: number): string => {
  const names = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return names[monthIndex];
};
