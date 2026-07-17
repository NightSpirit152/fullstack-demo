using GraphqlDemo.Api.Models;

namespace GraphqlDemo.Api.Data;

public static class SeedData
{
    public static void Seed(AppDbContext context)
    {
        if (context.Products.Any())
        {
            return;
        }

        context.Products.AddRange(
            new Product
            {
                Id = 1,
                Name = "Парацетамол 500мг №20",
                Description = "Жаропонижающее и обезболивающее средство",
                Price = 45.50m,
                Category = "Жаропонижающие",
                ImageUrl = "/images/paracetamol.jpg",
                StockQuantity = 120
            },
            new Product
            {
                Id = 2,
                Name = "Ибупрофен 400мг №30",
                Description = "Противовоспалительное, обезболивающее",
                Price = 89.90m,
                Category = "Жаропонижающие",
                ImageUrl = "/images/ibuprofen.jpg",
                StockQuantity = 75
            },
            new Product
            {
                Id = 3,
                Name = "Аскорбиновая кислота с глюкозой №10",
                Description = "Витамин C, укрепление иммунитета",
                Price = 32.00m,
                Category = "Витамины",
                ImageUrl = "/images/ascorbic.jpg",
                StockQuantity = 200
            },
            new Product
            {
                Id = 4,
                Name = "Пластырь бактерицидный №20",
                Description = "Для мелких ран и порезов",
                Price = 65.00m,
                Category = "Перевязочные материалы",
                ImageUrl = "/images/plaster.jpg",
                StockQuantity = 0
            }
        );

        context.SaveChanges();
    }
}
