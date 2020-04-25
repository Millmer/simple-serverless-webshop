# Simple Serverless Webshop

Simple single page serverless webshop. The entire page is powered by configuration on the customer's [Stripe](https://stripe.com) account allowing for our side to be really lightweight and super cheap to host. Design and template inspired by [Jamstack CMS](https://github.com/jamstack-cms/jamstack-cms).

## Configuration
The user must be ok with using stripe's [One-time payments with Checkout client-only integration](https://stripe.com/docs/payments/checkout/client). Once configured in this way, the user will be able to make simple Products with single SKUs (if more SKUs are added per product, the extra SKUs will be ignored by the shop). This allows for the name of the procuct, price and an image. To add a categories, descriptions and control the items on the frontpage simply add metatags to the product like so:

```
categories: new, soy
description: This candle smells nice, you should buy it
tag: (showcase || trending)
```

The categories are a comma separated list and will be capitliased on the client side to be more presentable. The description is copied across as is.

### SEO
The [vue.config.js](./front/vue.config.js) file should be modified to set up appropriate metatags, titles, descriptions and images for SEO. It currently uses the showcase banner image for the SEO card image. This [image](./front/public/showcase/Banner.png) should be replaced.

## Deploy
Designed to be simple and easy, see the respecitve README's for the [front](./front/README.md) and [back](./back/README.md) folders.

## Wants & Issues
- Handle out of stock products. Rather than just removing them from the list display out of stock card.
- More control over showcase (i.e. show banner or product image, show custom text or product title etc).
- Better SEO, currently only done for home page. Use `vue-meta` perhaps to give specific meta information to each product/category page.
- Configure what categories show on home page (currently manual keyword search or select first and last).
- More control over order of Nav items (currently manual search and replace of categories in desired order).
- Fix refresh on product page not finding product anymore (currently can't link to specific product :/).
- Priced shipping. Currently only allowed to be Free based on current setup.
- Support for multiple SKUs per procuct (i.e. small, medium & large). Currently only 1 SKU per product.
- Only works with between 4 and 100 products. Any more or any less and it will break.
- Improve error handling for stripe (currently throws error as alert - not nice).