export default function decodeToken(token) {
  const payload = token.split(".")[1];
  const decodedValue = JSON.parse(window.atob(payload));

  return decodedValue;
}