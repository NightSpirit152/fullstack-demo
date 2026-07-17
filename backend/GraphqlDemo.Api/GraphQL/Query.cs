using GraphqlDemo.Api.Data;
using GraphqlDemo.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GraphqlDemo.Api.GraphQL;

public class Query
{
    [UseFiltering]
    [UseSorting]
    public IQueryable<Product> GetProducts([Service] AppDbContext context)
        => context.Products;

    public async Task<Product?> GetProduct(int id, [Service] AppDbContext context)
        => await context.Products.FindAsync(id);

    public async Task<IQueryable<CartItem>> GetCartItems([Service] AppDbContext context)
    {
        // Задержка для наглядности
        await Task.Delay(500);
        
        return context.CartItems.Include(c => c.Product);
    }

    public async Task<decimal> GetCartTotal([Service] AppDbContext context)
        => await context.CartItems
            .Include(c => c.Product)
            .SumAsync(c => c.Product!.Price * c.Quantity);
}
