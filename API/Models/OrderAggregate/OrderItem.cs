namespace API.Models.OrderAggregate
{
    public class OrderItem
    {
        public OrderItem()
        {
        }

        public OrderItem(int id, ProductItemOrdered itemOrdered, int price, int quantity)
        {
            Id = id;
            ItemOrdered = itemOrdered;
            Price = price;
            Quantity = quantity;
        }

        public int Id { get; set; }
        public ProductItemOrdered ItemOrdered { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
    }
}