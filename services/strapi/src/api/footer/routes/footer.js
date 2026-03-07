'use strict';

/** @type {import('@strapi/strapi').Core.RouterConfig} */
module.exports = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/footers',
      handler: 'api::footer.footer.find',
      config: { auth: false },
    },
  ],
};
