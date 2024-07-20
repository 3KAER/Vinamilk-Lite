<?php

namespace App\Controllers;

use Core\Controller;

class ProductController extends Controller
{
    private $productModel;

    /**
     * ProductController constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->productModel = $this->model('product');
    }

    /**
     * Get products.
     *
     * @return  string  The JSON response
     */
    public function getProducts()
    {
        $queryParams = $this->request->params();
        $products = $this->productModel->getMultiple($queryParams);

        if ($products === false) {
            return $this->response->status(500)->json(
                0,
                [],
                'Something was wrong!'
            );
        }

        return $this->response->status(200)->json(
            1,
            $products,
        );
    }

    /**
     * Get a product by ID.
     *
     * @param    int         $id The ID of the product to retrieve
     * @return   string      The JSON response
     */
    public function getById($id)
    {
        $product = $this->productModel->getById($id);

        if ($product === false) {
            return $this->response->status(500)->json(
                0,
                [],
                'Something was wrong!'
            );
        }

        return $this->response->status(200)->json(
            1,
            $product
        );
    }


    /**
     * Create a new product.
     *
     * @return  string  The JSON response
     */
    public function create()
    {
        $productData = $this->request->body();
        $validationResult = $this->request->validate($productData, [
            'name' => 'required|max:255',
            'slug' => 'required|max:255',
            'thumbnail' => 'min:1|max:255',
            'hidden' => 'int',
            'description' => '',
            'price' => 'int|gte:0',
            'sale_price' => 'int|gte:0',
            'collection_id' => 'int'
        ]);
        if ($validationResult !== true) {
            return $this->response->status(400)->json(
                0,
                [],
                $validationResult
            );
        }

        $result = $this->productModel->getBySlug($productData['slug']);
        if (!empty($result)) {
            return $this->response->status(400)->json(
                0,
                [],
                "Product slug existed!"
            );
        }

        $productData['id'] = uniqid('product');

        $datetime = date('Y-m-d H:i:s');
        $productData['created_at'] = $datetime;
        $productData['updated_at'] = $datetime;

        $result = $this->productModel->create($productData);
        if ($result === false) {
            return $this->response->status(500)->json(
                0,
                [],
                'Something was wrong!'
            );
        }

        return $this->response->status(201)->json(
            1,
            [],
            'Product created successfully.'
        );
    }

    /**
     * Update a product with some attributes.
     *
     * @param    int        $id The ID of the product to update
     * @return   string     The JSON response
     */
    public function update($id)
    {
        $productData = $this->request->body();
        if (empty($productData)) {
            return $this->response->status(400)->json(
                0,
                [],
                'No data to update!'
            );
        }
        $validationResult = $this->request->validate($productData, [
            'name' => 'min:1|max:255',
            'slug' => 'min:1|max:255',
            'thumbnail' => 'min:1|max:255',
            'hidden' => 'int',
            'description' => '',
            'price' => 'int|gte:0',
            'sale_price' => 'int|gte:0',
            'collection_id' => 'int'
        ]);
        if ($validationResult !== true) {
            return $this->response->status(400)->json(
                0,
                [],
                $validationResult
            );
        }

        $datetime = date('Y-m-d H:i:s');
        $productData['updated_at'] = $datetime;

        $result = $this->productModel->update($productData, $id);
        if ($result === false) {
            return $this->response->status(500)->json(
                0,
                [],
                'Something was wrong!'
            );
        }

        return $this->response->status(200)->json(
            1,
            [],
            'Product updated successfully.'
        );
    }

    /**
     * Delete a product.
     *
     * @param    int        $id The ID of the product to delete
     * @return   string     The JSON response
     */
    public function delete($id)
    {
        $result = $this->productModel->delete($id);

        if ($result === false) {
            return $this->response->status(500)->json(
                0,
                [],
                'Something was wrong!'
            );
        }

        return $this->response->status(200)->json(
            1,
            [],
            'Product deleted successfully.'
        );
    }

    public function csvExport()
    {

        $result = $this->productModel->getMultiple();
        $result = $result['rows'];

        foreach ($result as &$item) {
            unset($item['thumbnail']);
            unset($item['hidden']);
            unset($item['description']);
        }
        unset($item);

        if (empty($result)) {
            return $this->response->status(500)->json(
                0,
                [],
                'No data available!'
            );
        }

        $columns = array_keys($result[0]);
        header('Content-Type: text/csv; charset=UTF-8');
        header('Content-Disposition: attachment');
        header('Pragma: no-cache');
        header('Expires: 0');
        $output = fopen('php://output', 'w');
        if ($output === false) {
            return $this->response->status(500)->json(
                0,
                [],
                'Failed to open file for writing!'
            );
        }

        fwrite($output, "\xEF\xBB\xBF");
        fputcsv($output, $columns);
        foreach ($result as $item) {

            if (isset($item['created_at'])) {
                $item['created_at'] = date('Y-m-d H:i:s', strtotime($item['created_at']));
            }


            $item = array_map(function ($value) {
                return mb_convert_encoding($value, 'UTF-8', 'auto');
            }, $item);

            fputcsv($output, $item);
        }
        fclose($output);
    }
}
