namespace API.Models.OrderAggregate
{
    public class Delivery
    {
        public int Id { get; set; }
        public string ShortName { get; set; }
        public string DeliveryTime { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
    }
}