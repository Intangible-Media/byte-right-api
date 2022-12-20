"use strict";

/**
 * ingredient controller
 */

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::ingredient.ingredient",
  ({ strapi }) => ({
    async customAction(ctx) {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "show me the ingredients in chicken alfredo in list format",
        temperature: 0.6,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
      });

      try {
        ctx.body = response.data.choices[0].text;
      } catch (error) {
        ctx.body = error;
      }
    },
    async customActionTwo(ctx) {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `what ingredients are in ${ctx.request.body.dish}, create a frame like this:
        List ingredients numbered, just the name of the ingredient no explanation`,
        temperature: 0.6,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
      });

      try {
        const rawData = response.data.choices[0].text;

        const dishIngredients = str.split(/\d+/).filter((s) => {
          if (s === "") return;
          return s.trim();
        });

        const dishIngredientsSanitized = dishIngredients.map((ingredient) => {
          return ingredient.slice(2).trim();
        });

        ctx.body = {
          data: dishIngredientsSanitized,
          body: ctx.request.body.dish,
          tokensUsed: response.data.usage.total_tokens,
        };
      } catch (error) {
        ctx.body = error;
      }
    },
  })
);
