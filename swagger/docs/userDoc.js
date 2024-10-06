/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users except the logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Add security for authenticated users
 *     responses:
 *       200:
 *         description: Users retrieved successfully, excluding the logged-in user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: "Fetched all users successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           username:
 *                             type: string
 *                             example: "john_doe"
 *                           email:
 *                             type: string
 *                             example: "john@example.com"
 *                           profilePic:
 *                             type: string
 *                             example: "http://example.com/profile.jpg"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-10-05T10:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-10-05T10:00:00Z"
 *       401:
 *         description: Access denied. No token provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "Access denied. No token provided."
 *       403:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "Invalid token."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "Error fetching users."
 */
