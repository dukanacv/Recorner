using API.Models.OrderAggregate;

namespace API.DTOs
{
    public class OrderDto
    {
        public string CartId { get; set; }
        public int DeliveryId { get; set; }
        public Address ShippingAddress { get; set; }
    }
}