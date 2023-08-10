/**
 * @swagger
 * tags:
 *   name: Courses
 */
const router = require("express").Router();

const isAuth = require("../middleware/is-auth");

const coursesValidator = require("../validators/courses");

const coursesController = require("../controllers/courses");

/**
 * @swagger
 * /api/courses:
 *   get:
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: int
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get("/", coursesValidator.getCourses, coursesController.getCourses);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", coursesValidator.getCourse, coursesController.getCourse);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               link:
 *                 type: string
 *               categoryID:
 *                  type: Int
 *               tags:
 *                  type: Array
 *             example:
 *               link: https://www.udemy.com/course/learn-ethical-hacking-from-scratch/?couponCode=MOCKCOUPONCODE
 *               categoryID: 1
 *               tags: ["Optional Tag A", "Optional Tag B"]
 *     responses:
 *       201:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/",
  isAuth,
  coursesValidator.createCourse,
  coursesController.createCourse
);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/:id",
  isAuth,
  coursesValidator.deleteCourse,
  coursesController.deleteCourse
);

module.exports = router;
