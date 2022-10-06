using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("^(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{7,30}$",
        ErrorMessage = "Lozinka mora da sadrzi 1 veliko, 1 malo slovo, 1 broj i 1 specijalan karakter, i najmanje 8 karaktera")]
        public string Password { get; set; }
    }
}