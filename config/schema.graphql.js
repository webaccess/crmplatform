module.exports = {
  query: `
  statesCount(where: JSON): Int!,
  districtsCount(where: JSON): Int!,
  countriesCount(where: JSON): Int!,
  villagesCount(where: JSON): Int!,
  activitytypesCount(where: JSON): Int!,
  activityassigneesCount(where: JSON): Int!,
  contacttagsCount(where: JSON): Int!
  `,
  resolver: {
    Query: {
      statesCount: {
        resolverOf: "plugins::crm-plugin.state.count",
        resolver: async (obj, options, ctx) => {
          console.log("val", options);
          ctx.query = {};
          if (options.where) ctx.query = options.where;
          return await strapi.plugins["crm-plugin"].controllers.state.count(
            ctx
          );
        },
      },
      districtsCount: {
        resolverOf: "plugins::crm-plugin.district.count",
        resolver: async (obj, options, ctx) => {
          ctx.query = {};
          if (options.where) ctx.query = options.where;
          return await strapi.plugins["crm-plugin"].controllers.district.count(
            ctx
          );
        },
      },
      countriesCount: {
        resolverOf: "plugins::crm-plugin.country.count",
        resolver: async (obj, options, ctx) => {
          ctx.query = {};
          if (options.where) ctx.query = options.where;
          return await strapi.plugins["crm-plugin"].controllers.country.count(
            ctx
          );
        },
      },
      villagesCount: {
        resolverOf: "plugins::crm-plugin.village.count",
        resolver: async (obj, options, ctx) => {
          ctx.query = {};
          if (options.where) ctx.query = options.where;
          return await strapi.plugins["crm-plugin"].controllers.village.count(
            ctx
          );
        },
      },
      activitytypesCount: {
        resolverOf: "plugins::crm-plugin.activitytype.count",
        resolver: async (obj, options, ctx) => {
          ctx.query = {};
          if (options.where) ctx.query = options.where;
          return await strapi.plugins[
            "crm-plugin"
          ].controllers.activitytype.count(ctx);
        },
      },
      activityassigneesCount: {
        resolverOf: "plugins::crm-plugin.activityassignee.count",
        resolver: async (obj, options, ctx) => {
          ctx.query = {};
          if (options.where) ctx.query = options.where;
          return await strapi.plugins[
            "crm-plugin"
          ].controllers.activityassignee.count(ctx);
        },
      },
      contacttagsCount: {
        resolverOf: "plugins::crm-plugin.contacttag.count",
        resolver: async (obj, options, ctx) => {
          ctx.query = {};
          if (options.where) ctx.query = options.where;
          return await strapi.plugins[
            "crm-plugin"
          ].controllers.contacttag.count(ctx);
        },
      },
    },
  },
};
