class ApiResponse{
    constructor(statusCode, message = "Success", data = null, errors = []){
        this.statusCode = statusCode; // HTTP status code (e.g., 200, 404)
        this.message = message; // A message describing the response
        this.data = data; // The main content of the response (e.g., user data, product details)
        this.success = statusCode< 400;
    }
}