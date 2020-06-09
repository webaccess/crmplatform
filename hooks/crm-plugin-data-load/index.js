const bookshelf = require("../../config/bookshelf");
const utils = require("../../services/utils");
const jsonCountryData = require("../../assets/files/countries.json");
const jsonStateData = require("../../assets/files/states.json");
const jsonDistrictData = require("../../assets/files/districts.json");

module.exports = (strapi) => {
  const hook = {
    /**
     * Default options
     */

    defaults: {
      // config object
    },

    /**
     * Initialize the hook
     */

    async initialize() {
      console.log("Inserting country, state & district data ...");

      (async () => {
        await addCountries();
        console.log("\n");
        await addStates();
        console.log("\n");
        await addDistricts();
        console.log("\n");
      })();

      async function addCountries() {
        await utils.asyncForEach(jsonCountryData.countries, async (country) => {
          const countryPresent = await bookshelf
            .model("country")
            .where({ name: country.name })
            .fetch();

          // save countries
          try {
            if (countryPresent) {
              console.log(`Skipping Country ${country.name}...`);
            } else {
              await bookshelf
                .model("country")
                .forge({
                  name: country.name,
                  abbreviation: country.abbreviation,
                  identifier: country.identifier,
                  is_active: country.isActive,
                })
                .save()
                .then(() => {
                  console.log(`Added Country ${country.name}`);
                });
            }
          } catch (error) {
            console.log(error);
          }
        });
      }

      async function addStates() {
        await utils.asyncForEach(jsonCountryData.countries, async (country) => {
          const { states } = country;
          const countryPresent = await bookshelf
            .model("country")
            .where({ name: country.name })
            .fetch();

          // save states
          try {
            if (countryPresent) {
              await utils.asyncForEach(states, async (state, index) => {
                const statePresent = await bookshelf
                  .model("state")
                  .where({ name: state })
                  .fetch();

                if (statePresent) {
                  console.log(`Skipping State ${state}...`);
                } else {
                  const country = countryPresent.toJSON
                    ? countryPresent.toJSON()
                    : countryPresent;

                  // state name matching
                  await jsonStateData.states
                    .filter((item) => item.name === state)
                    .map((filteredStates) => {
                      bookshelf
                        .model("state")
                        .forge({
                          name: filteredStates.name,
                          abbreviation: filteredStates.abbreviation,
                          identifier: filteredStates.identifier,
                          is_active: filteredStates.isActive,
                          country: country.id,
                        })
                        .save()
                        .then(() => {
                          console.log(
                            `Added State ${filteredStates.name} to ${country.name}`
                          );
                        });
                    });
                }
              });
            }
          } catch (error) {
            console.log(error);
          }
        });
      }

      async function addDistricts() {
        await utils.asyncForEach(jsonCountryData.countries, async (country) => {
          const { states } = country;
          const countryPresent = await bookshelf
            .model("country")
            .where({ name: country.name })
            .fetch();

          if (countryPresent) {
            await utils.asyncForEach(jsonStateData.states, async (state) => {
              const { districts } = state;
              const statePresent = await bookshelf
                .model("state")
                .where({ name: state.name })
                .fetch();

              if (statePresent) {
                const state = statePresent.toJSON
                  ? statePresent.toJSON()
                  : statePresent;

                // save districts
                try {
                  await utils.asyncForEach(districts, async (district) => {
                    const districtPresent = await bookshelf
                      .model("district")
                      .where({ name: district, state: state.id })
                      .fetch();

                    if (districtPresent) {
                      console.log(`Skipping District ${district}...`);
                    } else {
                      // district name matching
                      await jsonDistrictData.districts
                        .filter((item) => item.name === district)
                        .map((filteredDistricts) => {
                          bookshelf
                            .model("district")
                            .forge({
                              name: filteredDistricts.name,
                              abbreviation: filteredDistricts.abbreviation,
                              identifier: filteredDistricts.identifier,
                              is_active: filteredDistricts.isActive,
                              state: state.id,
                            })
                            .save()
                            .then(() => {
                              console.log(
                                `Added District ${filteredDistricts.name} to ${state.name}`
                              );
                            });
                        });
                    }
                  });
                } catch (error) {
                  console.log(error);
                }
              }
            });
          }
        });
      }
    },
  };

  return hook;
};
