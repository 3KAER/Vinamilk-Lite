<?php

use App\Controllers\OrderController;
use App\Middlewares\AuthMiddleware;

$orderController = new OrderController();

$router->get('/account/orders', function () use ($orderController) {
    echo $orderController->getOrders();
});
