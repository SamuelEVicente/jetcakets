interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

let authToken: string | undefined;

const baseHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export function setAuthToken(token: string) {
  authToken = token;
}

export function clearAuthToken() {
  authToken = undefined;
}

function getAuthHeaders() {
  return authToken
    ? {
        ...baseHeaders,
        Authorization: "auth " + authToken
      }
    : baseHeaders;
}

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);

  try {
    // may error if there is no body
    response.parsedBody = await response.json();
  } catch (ex) {}

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

export async function get<T>(
  path: string,
  args: RequestInit = { method: "get", headers: getAuthHeaders() }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

export async function post<T>(
  path: string,
  body: any,
  args: RequestInit = { method: "post", body: JSON.stringify(body), headers: getAuthHeaders() }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

export async function put<T>(
  path: string,
  body: any,
  args: RequestInit = { method: "put", body: JSON.stringify(body), headers: getAuthHeaders() }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

export async function patch<T>(
  path: string,
  body: any,
  args: RequestInit = { method: "patch", body: JSON.stringify(body), headers: getAuthHeaders() }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args));
}
