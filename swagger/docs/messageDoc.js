// swagger/docs/messageDoc.js

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Provide your JWT token in the format **Bearer {token}**
 * 
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         senderId:
 *           type: integer
 *           example: 1
 *         senderName:
 *           type: string
 *           example: "Alice"
 *         receiverId:
 *           type: integer
 *           example: 2
 *         receiverName:
 *           type: string
 *           example: "Bob"
 *         text:
 *           type: string
 *           example: "Hello, how are you?"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-10-05T10:00:00Z"
 * 
 * /api/message:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []  # Add security for authenticated users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderId:
 *                 type: integer
 *                 description: The ID of the sender
 *                 example: 1
 *               receiverId:
 *                 type: integer
 *                 description: The ID of the receiver
 *                 example: 2
 *               text:
 *                 type: string
 *                 description: The message content
 *                 example: "Hello, how are you?"
 *     responses:
 *       201:
 *         description: Message created successfully
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
 *                   example: "Message created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     newMessage:
 *                       $ref: '#/components/schemas/Message'
 *       400:
 *         description: Invalid input
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
 *                   example: "All fields are required"
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
 *                   example: "Error creating message."
 * 
 * /api/message/{userId}:
 *   get:
 *     summary: Get messages for a user
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []  # Add security for authenticated users
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve messages for
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
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
 *                   example: "Fetched all messages of this user 1 successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     messages:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           text:
 *                             type: string
 *                             example: "Hello!"
 *                           senderId:
 *                             type: integer
 *                             example: 1
 *                           senderName:
 *                             type: string
 *                             example: "Alice"
 *                           receiverId:
 *                             type: integer
 *                             example: 2
 *                           receiverName:
 *                             type: string
 *                             example: "Bob"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-10-05T10:00:00Z"
 *       400:
 *         description: Invalid input
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
 *                   example: "UserID is required"
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
 *                   example: "Error fetching messages."
 */
