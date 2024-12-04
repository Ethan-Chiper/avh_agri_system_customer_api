/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: "John Doe"
 *               contactNumber:
 *                 type: string
 *                 example: "1234567890"
 *               address:
 *                 type: object
 *                 properties:
 *                   line1:
 *                     type: string
 *                     example: "123 Main Street"
 *                   city:
 *                     type: string
 *                     example: "Metropolis"
 *                   state:
 *                     type: string
 *                     example: "New York"
 *                   postalCode:
 *                     type: string
 *                     example: "10001"
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "P001"
 *                     productName:
 *                       type: string
 *                       example: "Laptop"
 *                     quantity:
 *                       type: number
 *                       example: 2
 *                     price:
 *                       type: number
 *                       example: 1500.00
 *               transaction:
 *                 type: object
 *                 properties:
 *                   totalAmount:
 *                     type: number
 *                     example: 3000.00
 *                   paymentStatus:
 *                     type: string
 *                     enum: ["Pending", "Completed", "Failure"]
 *                     example: "Pending"
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Bad request
 */