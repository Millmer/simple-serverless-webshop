const baseUrl = process.env.VUE_APP_STRIPE_REDIRECT_URL;

module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      title: "Simple Serverless Webshop",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias adipisci ipsum facilis laudantium necessitatibus a reprehenderit laboriosam nihil asperiores ipsa corrupti, ducimus illum provident officia, temporibus, tempora error eaque autem.",
      keywords: "simple, serverless, webshop, stripe, e-commerce",
      template: "public/index.html",
      googleAnalyticsId: "UA-123ABC-1",
      baseUrl,
      filename: "index.html"
    }
  },
  chainWebpack: config => {
    config.plugin("copy").tap(([options]) => {
      options[0].ignore.push("products/**");
      return [options];
    });
  }
};
