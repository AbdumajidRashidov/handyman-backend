/**
 * @swagger
 * tags:
 *   - name: Bookings
 *     description: Booking operations
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *                 example: "67890"
 *               taskerId:
 *                 type: string
 *                 example: "54321"
 *               scheduledTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-10T15:00:00Z"
 *               estimatedDuration:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Booking created successfully
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
 *                   example: "Booking created successfully"
 *                 bookingId:
 *                   type: string
 *                   example: "11111"
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: string
 *           example: "11111"
 *     responses:
 *       200:
 *         description: Booking retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookingId:
 *                   type: string
 *                   example: "11111"
 *                 taskId:
 *                   type: string
 *                   example: "67890"
 *                 taskerId:
 *                   type: string
 *                   example: "54321"
 *                 scheduledTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-09-10T15:00:00Z"
 *                 estimatedDuration:
 *                   type: number
 *                   example: 2
 *       404:
 *         description: Booking not found
 */

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     summary: Update a booking
 *     tags: [Bookings]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: string
 *           example: "11111"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduledTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-09-10T15:00:00Z"
 *               estimatedDuration:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Booking updated successfully
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
 *                   example: "Booking updated successfully"
 *       404:
 *         description: Booking not found
 */

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: string
 *           example: "11111"
 *     responses:
 *       200:
 *         description: Booking deleted successfully
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
 *                   example: "Booking deleted successfully"
 *       404:
 *         description: Booking not found
 */
