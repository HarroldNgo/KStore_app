export default function generateRandomAlphanumeric(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    return Array.from({ length }, () => characters[Math.floor(Math.random() * charactersLength)]).join('');
  }