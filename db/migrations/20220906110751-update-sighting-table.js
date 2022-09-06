"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("sightings", "city", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("sightings", "country", {
      type: Sequelize.STRING,
    });

    await queryInterface.renameColumn(
      "sightings",
      "location",
      "locationdescription"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};

// Update our Sighting model in the backend to include location properties such as city and country, and rename the location property to locationDescription for clarity
// Create a new migration using Sequelize CLI's migration:generate function to add city and country columns to the Sightings table and update the location column name to locationDescription. Remember to add a down function in the migration to undo the migration. Use the existing migration as a reference; you may find the Sequelize queryInterface API docs helpful.
// Update new sighting form and edit sighting form in the frontend to accept city and country data and send location description data correctly, updating field names where relevant

// await queryInterface.createTable('sightings', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//       },
//       date: {
//         type: Sequelize.DATE,
//       },
//       location: {
//         type: Sequelize.STRING,
//       },
//       notes: {
//         type: Sequelize.TEXT,
//       },
//       created_at: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//       updated_at: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//     });
