//try , catch function
module.exports = (strapi) => {
  const emptyParm = (ctx, model) => {
    console.log("-----Inside tests emptyParams----", ctx, model);
    async function findData(ctx, model) {
      try {
        await strapi.query(model, "crm-plugin").find(ctx.query);
      } catch (error) {
        throw error;
      }
    }
  };
};
