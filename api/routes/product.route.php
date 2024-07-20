<?php

use App\Controllers\ProductController;
use App\Middlewares\AuthMiddleware;

$productController = new ProductController();

$router->get('/products/export', function () use ($productController) {
    echo $productController->csvExport();
});

$router->post('/products', function () use ($productController) {
    echo $productController->create();
})->addMiddleware(new AuthMiddleware(true));

$router->patch('/products/:id', function ($params) use ($productController) {
    echo $productController->update($params['id']);
})->addMiddleware(new AuthMiddleware(true));

$router->get('/products', function () use ($productController) {
    echo $productController->getProducts();
});
$router->get('/products/:id', function ($params) use ($productController) {
    echo $productController->getById($params['id']);
});



$router->delete('/products/:id', function ($params) use ($productController) {
    echo $productController->delete($params['id']);
})->addMiddleware(new AuthMiddleware(true));
