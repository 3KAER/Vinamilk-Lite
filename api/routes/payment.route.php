<?php

use App\Controllers\PaymentController;
use App\Middlewares\AuthMiddleware;

$paymentController = new PaymentController();

$router->post('/payment', function () use ($paymentController) {
    echo $paymentController->createPayment();
})->addMiddleware(new AuthMiddleware());

$router->post('/payment/result', function () use ($paymentController) {
    echo $paymentController->updatePayment();
})->addMiddleware(new AuthMiddleware());
