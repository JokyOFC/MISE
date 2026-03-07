'use strict';

/** @type {import('@strapi/strapi').Core.RouterConfig} */
module.exports = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/headers',
      handler: 'api::header.header.find',
      config: { auth: false },
    },
  ],
};
