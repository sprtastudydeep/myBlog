const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const { User } = require("../models");
const { Comment } = require("../models");
const { Post } = require("../models");
const { Like } = require("../models");
module.exports = router;