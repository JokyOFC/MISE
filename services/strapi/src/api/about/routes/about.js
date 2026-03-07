'use strict';

/** @type {import('@strapi/strapi').Core.RouterConfig} */
module.exports = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/abouts',
      handler: 'api::about.about.find',
      config: { auth: false },
    },
  ],
};
