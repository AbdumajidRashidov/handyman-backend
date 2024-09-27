/**
 * @swagger
 * tags:
 *   - name: Payments
 *     description: Payment operations
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Process a payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingId:
 *                 type: string
 *                 example: "11111"
 *               amount:
 *                 type: number
 *                 example: 100000
 *               currency:
 *                 type: string
 *                 example: "UZS"
 *               paymentMethod:
 *                 type: string
 *                 example: "card"
 *     responses:
 *       200:
 *         description: Payment processed successfully
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
 *                   example: "Payment processed successfully"
 *                 transactionId:
 *                   type: string
 *                   example: "99999"
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get payment details by ID
 *     tags: [Payments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Payment ID
 *         schema:
 *           type: string
 *           example: "99999"
 *     responses:
 *       200:
 *         description: Payment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactionId:
 *                   type: string
 *                   example: "99999"
 *                 bookingId:
 *                   type: string
 *                   example: "11111"
 *                 amount:
 *                   type: number
 *                   example: 100000
 *                 currency:
 *                   type: string
 *                   example: "UZS"
 *                 paymentMethod:
 *                   type: string
 *                   example: "card"
 *       404:
 *         description: Payment not found
 */

/**
 * @swagger
 * /api/payments/{id}:
 *   delete:
 *     summary: Cancel a payment
 *     tags: [Payments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Payment ID
 *         schema:
 *           type: string
 *           example: "99999"
 *     responses:
 *       200:
 *         description: Payment canceled successfully
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
 *                   example: "Payment canceled successfully"
 *       404:
 *         description: Payment not found
 */
