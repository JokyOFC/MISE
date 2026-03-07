'use strict';

/** @type {import('@strapi/strapi').Core.RouterConfig} */
module.exports = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/projects',
      handler: 'api::project.project.find',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/projects/:documentId',
      handler: 'api::project.project.findOne',
      config: { auth: false },
    },
  ],
};
