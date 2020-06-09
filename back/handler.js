const axios = require("axios");
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripeBaseURL = "https://api.stripe.com/v1";
const axiosBaseParams = {
    method: 'get',
    params: {
        limit: 100,
        active: true
    },
    headers: { 'Authorization': `Bearer ${stripeKey}` }
};

module.exports.get = async () => {
    const productsRequest = axios.request({ url: `${stripeBaseURL}/products`, ...axiosBaseParams });
    const pricesRequest = axios.request({ url: `${stripeBaseURL}/prices`, ...axiosBaseParams });

    try {
        const [productsResponse, pricesResponse] = await Promise.all([productsRequest, pricesRequest]);
        const products = productsResponse.data.data.reduce((result, product) => {
            result[product.id] = product;
            return result;
        }, {});

        const prices = pricesResponse.data.data;
        const inventory = [];
        prices.forEach(price => {
            const product = products[price.product];

            // If product is not "archived" (i.e. it's not out of stock)
            // then add it to the list
            if (product) {
                const categories = (product.metadata.categories) ? [...product.metadata.categories.split(",").map(str => str.trim()), 'all'] : ['all'];
                const description = (product.description) ? product.description : (product.metadata.description) ? product.metadata.description : '';
                const tag = (product.metadata.tag) ? product.metadata.tag.toLowerCase() : '';
                const item = {
                    id: price.id.replace("price_", ""),
                    name: product.name,
                    categories,
                    price: Math.round(((price.unit_amount / 100) + Number.EPSILON) * 100) / 100,
                    image: product.images[0],
                    description,
                    tag
                };

                inventory.push(item);
            }
        });
        return successResponse(200, inventory);
    } catch (error) {
        console.error(error);
        return errorResponse(error, "Something went wrong!");
    }
}

const errorResponse = function (error, defaultResponse, headers = {}) {
    return {
        statusCode: error.statusCode || 500,
        headers: {
            ...headers
        },
        body: JSON.stringify({ message: error.message || error.statusMessage || defaultResponse })
    }
};

const successResponse = function (status, body = {}, headers = {}) {
    return {
        statusCode: status || 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            ...headers
        },
        isBase64Encoded: false,
        body: JSON.stringify(body)
    }
};