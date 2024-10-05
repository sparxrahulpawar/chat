// /models/Message.js
import { DataTypes } from "sequelize";
import sequelize from "../connections/db.js";

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // Reference to the User table
      key: "id", // Primary key in the User table
    },
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // Reference to the User table
      key: "id", // Primary key in the User table
    },
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Sync the model with the database
// Uncomment this to create/update the table schema as needed
// Message.sync({ alter: true });

export default Message;
