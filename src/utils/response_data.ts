export function generateResponse(
  status: true | false,
  status_code: number,
  message: string,
  data?: object
) {
  return {
    status,
    status_code,
    message,
    data,
  };
}
