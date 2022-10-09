using System.Collections.Generic;

namespace API.Models
{
    public class Cart
    {
        public Cart()
        {
        }

        public Cart(string id)
        {
            Id = id;
        }

        public string Id { get; set; }

        public List<CartItem> Items { get; set; } = new List<CartItem>();

        public int? DeliveryId { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentId { get; set; }
    }
}