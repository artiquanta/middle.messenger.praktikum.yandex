// Конвертация времени
export function convertTime(time: EpochTimeStamp | string): string {
  return new Date(time).toLocaleTimeString('ru-RU', { timeStyle: 'short' });
}

// Конвертация даты
export function convertDay(time: EpochTimeStamp | string): string {
  return new Date(time).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
}

// Проверка, если день в сообщении сегодняшний
export function checkIfToday(time: EpochTimeStamp | string): boolean {
  const today = new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
  if (convertDay(time) === today) {
    return true;
  }
  return false;
}
