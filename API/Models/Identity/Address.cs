using System.ComponentModel.DataAnnotations;

namespace API.Models.Identity
{
    public class Address
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }

        public User User { get; set; }//1:1 relationship like this
        [Required]
        public string UserId { get; set; }
    }
}