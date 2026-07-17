using GraphqlDemo.Api.Data;
using GraphqlDemo.Api.GraphQL;
using GraphqlDemo.Api.Models;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace GraphqlDemo.Tests;

public class CartMutationTests
{
    private static AppDbContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        var context = new AppDbContext(options);
        context.Products.Add(new Product
        {
            Id = 1,
            Name = "Парацетамол",
            Price = 45.5m,
            StockQuantity = 100
        });
        context.SaveChanges();
        return context;
    }

    [Fact]
    public async Task AddToCart_NewProduct_CreatesCartItem()
    {
        var context = CreateContext();
        var mutation = new Mutation();

        var result = await mutation.AddToCart(1, 2, context);

        Assert.Equal(1, result.ProductId);
        Assert.Equal(2, result.Quantity);
        Assert.Single(context.CartItems);
    }

    [Fact]
    public async Task AddToCart_ExistingProduct_IncreasesQuantity()
    {
        var context = CreateContext();
        var mutation = new Mutation();

        await mutation.AddToCart(1, 2, context);
        var result = await mutation.AddToCart(1, 3, context);

        Assert.Equal(5, result.Quantity);
        Assert.Single(context.CartItems);
    }

    [Fact]
    public async Task UpdateCartItemQuantity_ZeroOrLess_RemovesItem()
    {
        var context = CreateContext();
        var mutation = new Mutation();
        var item = await mutation.AddToCart(1, 2, context);

        var result = await mutation.UpdateCartItemQuantity(item.Id, 0, context);

        Assert.Null(result);
        Assert.Empty(context.CartItems);
    }

    [Fact]
    public async Task RemoveFromCart_ExistingItem_ReturnsTrue()
    {
        var context = CreateContext();
        var mutation = new Mutation();
        var item = await mutation.AddToCart(1, 1, context);

        var removed = await mutation.RemoveFromCart(item.Id, context);

        Assert.True(removed);
        Assert.Empty(context.CartItems);
    }

    [Fact]
    public async Task AddToCart_OutOfStock_ThrowsException()
    {
        var context = CreateContext();
        var outOfStock = new Product { Id = 2, Name = "Пластырь", Price = 10m, StockQuantity = 0 };
        context.Products.Add(outOfStock);
        context.SaveChanges();

        var mutation = new Mutation();

        await Assert.ThrowsAsync<HotChocolate.GraphQLException>(
            () => mutation.AddToCart(2, 1, context));
    }
}
