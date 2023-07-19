const { faker } = require('@faker-js/faker');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let todos = [];
    Array.from({ length: 50 }).forEach(() => {
      todos.push({
        title: faker.hacker.phrase(),
        status: Boolean(Math.round(Math.random())),
      });
    });
    await queryInterface.bulkInsert('Todos', todos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Todos', null, {});
  },
};
