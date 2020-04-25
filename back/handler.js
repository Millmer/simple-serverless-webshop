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
    const skusRequest = axios.request({ url: `${stripeBaseURL}/skus`, ...axiosBaseParams });

    try {
        const [productsResponse, skusResponse] = await Promise.all([productsRequest, skusRequest]);
        const products = productsResponse.data.data.reduce((result, product) => {
            result[product.id] = product;
            return result;
        }, {});

        const skus = skusResponse.data.data;
        const inventory = [];
        skus.forEach(sku => {
            const product = products[sku.product];

            // If product is not "archived" (i.e. it's not out of stock)
            // then add it to the list
            if (product) {
                const categories = (product.metadata.categories) ? [...product.metadata.categories.split(",").map(str => str.trim()), 'all'] : ['all'];
                const description = (product.metadata.description) ? product.metadata.description : '';
                const tag = (product.metadata.tag) ? product.metadata.tag.toLowerCase() : '';
                const item = {
                    id: sku.id.replace("sku_", ''),
                    name: product.name,
                    categories,
                    price: Math.round(((sku.price / 100) + Number.EPSILON) * 100) / 100,
                    image: sku.image,
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