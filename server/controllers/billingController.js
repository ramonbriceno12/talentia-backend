const Payment = require('../models/paymentModel');
const PaymentMethod = require('../models/paymentMethodsModel');
const Subscription = require('../models/subscriptionModel');
const Plan = require('../models/planModel');
const User = require('../models/userModel');

exports.getUserPayments = async (req, res) => {
    try {
        const user_id = req.params.id;

        const payments = await Payment.findAll({
            where: { user_id },
            include: [
                {
                    model: PaymentMethod, as: "payment_method"
                },
                {
                    model: User, as: "user"
                }
            ]
        })

        res.status(200).json(payments);

    } catch (error) {
        res.status(500).json({ message: "Error updating calendly clicked" });
    }
}

exports.getPaymentById = async (req, res) => {
    try {
        const { user_id, payment_id } = req.params;

        const payment = await Payment.findOne({
            where: { transaction_id: payment_id, user_id },
            include: [
                {
                    model: PaymentMethod,
                    as: "payment_method",
                },
                {
                    model: User,
                    as: "user",
                },
            ],
        });

        if (!payment) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }

        res.status(200).json(payment);
    } catch (error) {
        console.error("Error fetching payment:", error);
        res.status(500).json({ message: "Error al obtener el pago" });
    }
};