'use strict';

/** @type {import('@strapi/strapi').Core.RouterConfig} */
module.exports = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/how-can-i-helps',
      handler: 'api::how-can-i-help.how-can-i-help.find',
      config: { auth: false },
    },
  ],
};
