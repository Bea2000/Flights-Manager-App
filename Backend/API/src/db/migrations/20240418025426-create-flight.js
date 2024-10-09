'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      departureAirportId: {
        type: Sequelize.STRING,
      },
      departureDate: {
        type: Sequelize.DATE,
      },
      arrivalAirportId: {
        type: Sequelize.STRING,
      },
      arrivalDate: {
        type: Sequelize.DATE,
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      airplane: {
        type: Sequelize.STRING,
      },
      airline: {
        type: Sequelize.STRING,
      },
      airlineLogo: {
        type: Sequelize.STRING,
      },
      carbonEmission: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      currency: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  },
};
