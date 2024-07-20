<?php

namespace App\Controllers;

use Core\Controller;

class OrderController extends Controller
{
    private $orderModel;

    /**
     * ProductController constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->orderModel = $this->model('OrderItem');
    }

    public function getOrders()
    {
        $queryParams = $this->request->body();
        $orders = $this->orderModel->getMultiple($queryParams);

        if ($orders === false) {
            return $this->response->status(500)->json([
                'rows' => [], // Chỉ trả về 'rows' khi lỗi
                'message' => 'Something went wrong!'
            ]);
        }
        return $this->response->status(200)->json([

            $orders, // Chỉ trả về 'rows'

        ]);
    }
}
