export function generateRandomPassword(): string {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const password = Array.from(
    { length: getRandomNumber(6, 10) },
    () => charset[Math.floor(Math.random() * charset.length)],
  ).join('');
  return password;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }