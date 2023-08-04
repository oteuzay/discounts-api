const router = require("express").Router();

const coursesController = require("../controllers/courses");

router.get("/", coursesController.getCourses);

router.get("/:id", coursesController.getCourse);

router.post("/", coursesController.createCourse);

router.put("/:id", coursesController.updateCourse);

router.delete("/:id", coursesController.deleteCourse);

module.exports = router;
