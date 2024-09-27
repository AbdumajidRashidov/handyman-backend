/**
 * @swagger
 * tags:
 *   - name: Taskers
 *     description: Tasker profile operations
 */

/**
 * @swagger
 * /api/taskers:
 *   get:
 *     summary: Get all taskers
 *     tags: [Taskers]
 *     responses:
 *       200:
 *         description: List of taskers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "54321"
 *                   firstName:
 *                     type: string
 *                     example: "Alice"
 *                   lastName:
 *                     type: string
 *                     example: "Smith"
 *                   skills:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Plumbing", "Electrical", "Carpentry"]
 *                   rating:
 *                     type: number
 *                     format: float
 *                     example: 4.8
 *                   completedTasks:
 *                     type: integer
 *                     example: 47
 *                   hourlyRate:
 *                     type: number
 *                     example: 50000
 *                   currency:
 *                     type: string
 *                     example: "UZS"
 */

/**
 * @swagger
 * /api/taskers/{id}:
 *   get:
 *     summary: Get a tasker profile by ID
 *     tags: [Taskers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Tasker ID
 *         schema:
 *           type: string
 *           example: "54321"
 *     responses:
 *       200:
 *         description: Tasker profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "54321"
 *                 firstName:
 *                   type: string
 *                   example: "Alice"
 *                 lastName:
 *                   type: string
 *                   example: "Smith"
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Plumbing", "Electrical", "Carpentry"]
 *                 rating:
 *                   type: number
 *                   format: float
 *                   example: 4.8
 *                 completedTasks:
 *                   type: integer
 *                   example: 47
 *                 hourlyRate:
 *                   type: number
 *                   example: 50000
 *                 currency:
 *                   type: string
 *                   example: "UZS"
 *       404:
 *         description: Tasker not found
 */

/**
 * @swagger
 * /api/taskers/{id}:
 *   put:
 *     summary: Update a tasker profile
 *     tags: [Taskers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Tasker ID
 *         schema:
 *           type: string
 *           example: "54321"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Alice"
 *               lastName:
 *                 type: string
 *                 example: "Smith"
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               hourlyRate:
 *                 type: number
 *                 example: 50000
 *               currency:
 *                 type: string
 *                 example: "UZS"
 *     responses:
 *       200:
 *         description: Tasker profile updated successfully
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
 *                   example: "Tasker profile updated successfully"
 *       404:
 *         description: Tasker not found
 */
