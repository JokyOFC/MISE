'use strict';

/** @type {import('@strapi/strapi').Core.RouterConfig} */
module.exports = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/experiences',
      handler: 'api::experience.experience.find',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/experiences/:documentId',
      handler: 'api::experience.experience.findOne',
      config: { auth: false },
    },
  ],
};
