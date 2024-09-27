/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: Task operations
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   taskId:
 *                     type: string
 *                     example: "67890"
 *                   title:
 *                     type: string
 *                     example: "Fix leaky faucet"
 *                   status:
 *                     type: string
 *                     example: "pending"
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Fix leaky faucet"
 *               description:
 *                 type: string
 *                 example: "Kitchen sink faucet is leaking, need a plumber to fix it"
 *               category:
 *                 type: string
 *                 example: "Plumbing"
 *               location:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     example: 41.311081
 *                   longitude:
 *                     type: number
 *                     example: 69.240562
 *               budget:
 *                 type: number
 *                 example: 100000
 *               currency:
 *                 type: string
 *                 example: "UZS"
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-10T14:00:00Z"
 *     responses:
 *       200:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Task created successfully"
 *                 taskId:
 *                   type: string
 *                   example: "67890"
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *           example: "67890"
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 taskId:
 *                   type: string
 *                   example: "67890"
 *                 title:
 *                   type: string
 *                   example: "Fix leaky faucet"
 *                 description:
 *                   type: string
 *                   example: "Kitchen sink faucet is leaking, need a plumber to fix it"
 *                 status:
 *                   type: string
 *                   example: "pending"
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *           example: "67890"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Fix leaky faucet"
 *               description:
 *                 type: string
 *                 example: "Kitchen sink faucet is leaking, need a plumber to fix it"
 *               status:
 *                 type: string
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Task updated successfully"
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *           example: "67890"
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Task deleted successfully"
 *       404:
 *         description: Task not found
 */
