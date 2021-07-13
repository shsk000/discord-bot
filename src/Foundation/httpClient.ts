import fetch from "node-fetch";
import { logger } from "./logger";

type HttpClientRequestParams = {
  method: "GET" | "POST";
  url: string;
  body?: Record<string, any>;
  headers?: Record<string, any>;
};

export const httpClient = async <T extends Record<string, any>>(
  params: HttpClientRequestParams
): Promise<T> => {
  const body = params.body ? JSON.stringify(params.body) : undefined;

  logger.debug("HttpClient params | ", params);

  const response = await fetch(params.url, {
    method: params.method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...params.headers,
    },
    body: body,
  });

  if (!response.ok) {
    const errorTextResponse = await response.json();
    logger.error(
      "HttpClient error response | ",
      response.status,
      errorTextResponse,
      response.headers
    );

    if (errorTextResponse.conflictingRequest) {
      throw new Error(errorTextResponse.conflictingRequest.message);
    }

    throw errorTextResponse;
  }

  logger.debug("HttpClient success response", response);

  try {
    const parsedJsonResponse = (await response.json()) as T;
    logger.debug("HttpClient success json response | ", parsedJsonResponse);
    return parsedJsonResponse;
  } catch (e) {
    logger.debug("HttpClient success status response | ", response.status);
    return {
      status: response.status,
    } as unknown as T;
  }
};
