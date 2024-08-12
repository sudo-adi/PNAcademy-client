export class ApiError extends Error {
  public status: number;
  public details?: any;

  constructor(status: number, message: string, details?: any) {
    super(message);
    this.status = status;
    this.details = details;
    this.name = 'ApiError';
  }
}

export const logError = (message: string, error: Error, details?: any) => {
  console.error(`[${new Date().toISOString()}] ${message}`, {
    error: error.message,
    ...(details && { details }),
  });
};
