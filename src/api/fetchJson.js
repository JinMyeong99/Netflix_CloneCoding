export async function fetchJson(url, fallbackMessage = "요청 실패") {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const message = response.statusText || fallbackMessage;
      throw new Error(message);
    }

    return await response.json();
  } catch (error) {
    const message =
      (error instanceof Error && error.message) || fallbackMessage;
    throw new Error(message);
  }
}
