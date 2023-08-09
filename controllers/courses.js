const Category = require("../models/category");
const Course = require("../models/course");
const User = require("../models/user");

const udemyAPI = require("../helper/udemy-api");

/* The `getCourses` function is an asynchronous function that handles the retrieval of all courses. */
exports.getCourses = async (req, res, next) => {
  try {
    const currentPage = parseInt(req.params.page) || 1;
    const perPage = 20;
    const offset = (currentPage - 1) * perPage;

    const countCourses = await Course.count();
    const totalPages = Math.ceil(countCourses / perPage);

    const courses = await Course.findAll({
      order: [["createdAt", "DESC"]],
      offset,
      limit: perPage,
    });

    const courseSummary = await Promise.all(
      courses.map((course) => course.toSummary())
    );

    res.status(200).json({
      courses: courseSummary,
      stats: {
        currentPage: currentPage,
        lastPage: totalPages,
        countCourses: countCourses,
      },
    });
  } catch (err) {
    next(err);
  }
};

/* The `getCourse` function is an asynchronous function that handles the retrieval of a specific course. */
exports.getCourse = async (req, res, next) => {
  try {
    const id = req.params.id;

    const course = await Course.findOne({ where: { id: id } });

    if (!course) {
      const error = new Error("Course not found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      course: await course.toDetail(),
    });
  } catch (err) {
    next(err);
  }
};

/* The `createCourse` function is an asynchronous function that handles the creation of a course. */
exports.createCourse = async (req, res, next) => {
  try {
    const { link, tags, categoryID } = req.body;

    const user = await User.findOne({ where: { id: req.userID } });

    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    const category = await Category.findOne({ where: { id: categoryID } });

    if (!category) {
      const error = new Error("Category not found.");
      error.statusCode = 404;
      throw error;
    }

    const courseData = await udemyAPI.getCourse(link);

    const course = await Course.create({
      title: courseData.title,
      description: courseData.description,
      image: courseData.image,
      price: courseData.price,
      url: courseData.url,
      coupon_code: courseData.coupon_code,
      language: courseData.language,
      tags: tags,
      categoryID,
      userID: user.id,
    });

    res.status(201).json({
      message: "Course successfully created.",
      course: await course.toDetail(),
    });
  } catch (err) {
    next(err);
  }
};

/* The `deleteCourse` function is an asynchronous function that handles the deletion of a course. */
exports.deleteCourse = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({ where: { id: req.userID } });

    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    const course = await Course.findOne({ where: { id: id } });

    if (!course) {
      const error = new Error("Course not found.");
      error.statusCode = 404;
      throw error;
    }

    if (course.userID !== user.id) {
      const error = new Error("Not authorized to perform this action.");
      error.statusCode = 403;
      throw error;
    }

    await course.destroy();

    res.status(200).json({
      message: "Course successfully deleted.",
    });
  } catch (err) {
    next(err);
  }
};
