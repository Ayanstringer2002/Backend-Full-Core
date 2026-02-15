// Custom error class for API responses
class ApiError extends Error {
    constructor(
        statusCode,                          // HTTP status code (400, 404, 500...)
        message = "Something went wrong",    // default error message
        errors = [],                         // extra errors like validation errors
        stack = ""                           // optional stack trace
    ) {
        super(message); // Call parent Error class constructor

        this.statusCode = statusCode; // store status code
        this.data = null;             // usually data is null in error response
        this.message = message;       // store message
        this.success = false;         // success is always false for errors
        this.errors = errors;         // store error details array

        // if custom stack is passed then use it
        if (stack) {
            this.stack = stack;
        } 
        // otherwise generate stack trace automatically
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// Exporting the class so we can use it in other files
export { ApiError };
