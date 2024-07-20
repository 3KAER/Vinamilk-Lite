<?php

namespace App\Controllers;

use Core\Controller;


class PaymentController extends Controller
{
    private $endpoint;
    private $partnerCode;
    private $accessKey;
    private $secretKey;
    private $redirectUrl;
    private $ipnUrl;
    private $orderModel;
    private $orderItemModel;


    public function __construct()
    {
        parent::__construct();
        $this->partnerCode = 'MOMOBKUN20180529';
        $this->accessKey = 'klm05TvNBzhg7h7j';
        $this->secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
        $this->endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
        $this->redirectUrl = "http://localhost:5173/account/payment?checkout=true";
        $this->ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
        $this->orderModel = $this->model('Order');
        $this->orderItemModel = $this->model('OrderItem');
    }

    public function execPostRequest($url, $data)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data)
            )
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    public function createPayment()
    {
        $input = $this->request->body();
        $partnerCode = $this->partnerCode;
        $accessKey = $this->accessKey;
        $secretKey = $this->secretKey;
        $redirectUrl = $this->redirectUrl;
        $ipnUrl = $this->ipnUrl;
        $orderId = uniqid();
        $orderInfo = "Payment with Momo";
        $amount = $input["amount"];
        $extraData = isset($input["extraData"]) ? $input["extraData"] : "";
        $requestId = time() . "";
        $requestType = $input["paymentMethod"];
        $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
        $signature = hash_hmac("sha256", $rawHash, $secretKey);
        $data = array(
            'partnerCode' => $partnerCode,
            'partnerName' => "Test",
            "storeId" => "MomoTestStore",
            'requestId' => $requestId,
            'amount' => $amount,
            'orderId' => $orderId,
            'orderInfo' => $orderInfo,
            'redirectUrl' => $redirectUrl,
            'ipnUrl' => $ipnUrl,
            'lang' => 'vi',
            'extraData' => $extraData,
            'requestType' => $requestType,
            'signature' => $signature
        );

        $result = $this->execPostRequest($this->endpoint, json_encode($data));

        return $this->response->status(200)->json(
            1,
            $result,
        );
    }
    public function updatePayment()
    {
        $userId = $GLOBALS['userId'];
        $input = $this->request->body();
        $cart = $_COOKIE['cart'];
        $cartData = json_decode($cart, true);
        $data = [
            'id' => $input['orderId'],
            'request_id' => $input['requestId'],
            'amount' => $input['amount'],
            'order_info' => $input['orderInfo'],
            'order_type' => $input['orderType'],
            'trans_id' => $input['transId'],
            'result_code' => $input['resultCode'],
            'message' => $input['message'],
            'pay_type' => $input['payType'],
            'response_time' => $input['responseTime'],
            'extra_data' => $input['extraData'],
            'signature' => $input['signature'],
            'payment_option' => $input['paymentOption'],
            'user_id' => $userId

        ];

        $orderData = [];

        foreach ($cartData as $item) {
            $product_id = $item['id'];
            $quantity = $item['quantity'];
            $price     = $item['sale_price'];
            $order_id = $data['id'];
            $orderData[] = [
                "product_id" => $product_id,
                "quantity" => $quantity,
                "price" => $price,
                "order_id" => $order_id,
                "user_id" => $userId
            ];
        }
        // Update vào cơ sở dữ liệu
        $result = $this->orderModel->create($data);

        if ($result === false) {
            return $this->response->status(500)->json(
                0,
                [],
                'Something was wrong!'
            );
        }

        foreach ($orderData as $item) {
            $result = $this->orderItemModel->create($item);
            if ($result === false) {
                return $this->response->status(500)->json(
                    0,
                    [],
                    'Something was wrong!'
                );
            }
        }

        return $this->response->status(201)->json(
            1,
            [],
            'Orders saved successfully.'
        );
    }
}
