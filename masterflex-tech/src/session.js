const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const sessionId = async function() {
    const product = await stripe.products.create({
        name: "Motherboard",
        description: "Asus Prime Z390"
    });

    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: 20000,
        currency: "usd"
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items:[
            {
                price: price.id,
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: "https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://example.com/cancel"
    });
console.log(session.id)
};

sessionId();