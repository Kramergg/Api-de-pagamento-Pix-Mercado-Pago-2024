require("dotenv").config();
const prisma = require("../libs/db");
const { MercadoPagoConfig, Payment } = require("mercadopago");
const { v4: uuidv4 } = require("uuid");

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN,
  options: {
    timeout: 5000,
    idempotencyKey: "abc"
  }
});

const payment = new Payment(client);

function customJsonStringify(obj) {
  return JSON.stringify(obj, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
}

exports.createPix = async (req, res, next) => {
  const notificationUrl = process.env.WEBHOOK_URL; // SUA-URL-PARA-RECEBER-AS-WEBHOOKS-AQUI

  const body = {
    transaction_amount: req.body.transaction_amount,
    description: req.body.description,
    payment_method_id: "pix",
    payer: {
      email: req.body.email,
      identification: {
        type: "cpf",
        number: req.body.number_cpf
      }
    },
    notification_url: notificationUrl
  };

  const requestOptions = { idempotencyKey: uuidv4() };

  try {
    const result = await payment.create({ body, requestOptions });
    console.log(result.point_of_interaction.transaction_data.ticket_url);

    // Salvando o pagamento no banco de dados usando Prisma
    const savedPayment = await prisma.payment.create({
      data: {
        transaction_amount: req.body.transaction_amount,
        description: req.body.description,
        payment_method_id: "pix",
        email: req.body.email,
        identificationType: "cpf",
        number: req.body.number_cpf,
        status: "pending",
        payment_id: BigInt(result.id)
      }
    });

    console.log("Pagamento salvo no banco de dados:", savedPayment);

    const responseJson = customJsonStringify({
      status: "ok",
      payment: savedPayment
    });
    const responseObject = JSON.parse(responseJson);

    res.json(responseObject);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// WEBHOOKS MERCADO PAGO

// WEBHOOK POST
exports.createWebHook = async (req, res) => {
  console.log("Recebendo evento webhook:", req.body);

  const { action, data } = req.body;

  // Verifique se o corpo da requisição está no formato esperado
  if (!action || !data?.id) {
    return res.status(400).send("Invalid webhook event format");
  }

  if (action === "payment.created" || action === "payment.updated") {
    try {
      const paymentId = data.id;

      // Obter o status do pagamento do Mercado Pago
      const paymentResponse = await payment.get({id: paymentId})

      const paymentStatus = paymentResponse.status;


      // Atualizar o status do pagamento no banco de dados
      const updatedPayment = await prisma.payment.update({
        where: { payment_id: BigInt(paymentId) },
        data: { status: paymentStatus }
      });

      console.log("Payment updated in database:", updatedPayment);

      // Verifique o status do pagamento e execute ações específicas
      if (paymentStatus === "approved") {
        console.log("O PAGAMENTO FOI APROVADO E RECEBA SEU PREMIO!");
      }

      res.status(200).send("Webhook processed successfully");
    } catch (error) {
      res
        .status(500)
        .json({ statusCode: 500, data: "Error processing the webhook" });
    }
  } else {
    res.status(400).send("Unsupported event");
  }
};

// WEBHOOK GET STATUS

exports.getPaymentStatus = async (req, res) => {
  const paymentId = req.params.id;
  try {
    const payment = await prisma.payment.findUnique({
      where: { payment_id: paymentId }
    });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.json({ status: payment.status });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    res.status(500).json({ error: "Error fetching payment status" });
  }
};
