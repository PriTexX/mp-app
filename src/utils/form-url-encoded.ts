export function formUrlEncoded(
  data: Record<string, string | number | boolean>,
) {
  const formBody = [];

  for (const [key, value] of Object.entries(data)) {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(value);
    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&');
}
