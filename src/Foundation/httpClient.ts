import fetch from "node-fetch";
import { logger } from "./logger";

type HttpClientRequestParams = {
  method: "GET" | "POST";
  url: string;
  body?: Record<string, any>;
};

export const httpClient = async <T extends Record<string, any>>(
  params: HttpClientRequestParams
): Promise<T> => {
  const body = params.body ? JSON.stringify(params.body) : "";

  logger.debug("HttpClient settings | ", params);

  const response = await fetch(params.url, {
    method: params.method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!response.ok) {
    const errorResponseText = await response.text();
    logger.error(
      "HttpClient error response | ",
      response.status,
      errorResponseText,
      response.headers
    );
    throw errorResponseText;
  }

  const parsedData = await response.json();

  logger.debug("HttpClient success response | ", parsedData);

  return parsedData as T;
};
