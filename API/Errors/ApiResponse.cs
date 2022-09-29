using System;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int status, string message = null)
        {
            Status = status;
            Message = message ?? GetDefaultMessageForStatusCode(status);
        }

        private string GetDefaultMessageForStatusCode(int status)
        {
            return status switch
            {
                400 => "You made bad request. Try again.",
                401 => "You are not authorized!",
                404 => "Not found...",
                500 => "Error...",
                _ => null
            };
        }

        public int Status { get; set; }
        public string Message { get; set; }
    }
}