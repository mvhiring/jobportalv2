const db = require("../models");
const { Op } = require("sequelize");

exports.createContact = async (data) => {
  try {
    return await db.Contact.create(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getAllContacts = async (page, limit, filters) => {
  try {
    const offset = (page - 1) * limit;
    const where = {};

    if (filters.full_name) {
      where.full_name = { [Op.iLike]: `%${filters.full_name}%` };
    }
    if (filters.email) {
      where.email = { [Op.iLike]: `%${filters.email}%` };
    }
    if (filters.subject) {
      where.subject = { [Op.iLike]: `%${filters.subject}%` };
    }

    const { count, rows } = await db.Contact.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["created_at", "DESC"]],
    });

    return {
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
