using GraphqlDemo.Api.Data;
using GraphqlDemo.Api.Models;
using HotChocolate;
using Microsoft.EntityFrameworkCore;

namespace GraphqlDemo.Api.GraphQL;

public class Mutation
{
    public async Task<CartItem> AddToCart(int productId, int quantity, [Service] AppDbContext context)
    {
        var product = await context.Products.FindAsync(productId)
            ?? throw new GraphQLException("Товар не найден");

        if (product.StockQuantity <= 0)
        {
            throw new GraphQLException("Товара нет в наличии");
        }

        var existing = await context.CartItems
            .FirstOrDefaultAsync(c => c.ProductId == productId);

        if (existing is not null)
        {
            existing.Quantity += quantity;
        }
        else
        {
            existing = new CartItem { ProductId = productId, Quantity = quantity };
            context.CartItems.Add(existing);
        }

        await context.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> RemoveFromCart(int cartItemId, [Service] AppDbContext context)
    {
        var item = await context.CartItems.FindAsync(cartItemId);
        if (item is null)
        {
            return false;
        }

        context.CartItems.Remove(item);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<CartItem?> UpdateCartItemQuantity(int cartItemId, int quantity, [Service] AppDbContext context)
    {
        var item = await context.CartItems.FindAsync(cartItemId);
        if (item is null)
        {
            return null;
        }

        if (quantity <= 0)
        {
            context.CartItems.Remove(item);
            await context.SaveChangesAsync();
            return null;
        }

        item.Quantity = quantity;
        await context.SaveChangesAsync();
        return item;
    }
}
