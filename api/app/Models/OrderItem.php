<?php

namespace App\Models;

use Core\Model;

class OrderItem extends Model
{
    /**
     * Table name.
     *
     * @var string
     */
    protected $tableName = 'order_items';

    /**
     * The selected fields.
     * 
     * @var array
     */
    protected $selectedFields = [
        'id', 'order_id', 'product_id', 'quantity', 'price', 'user_id'

    ];

    public function getByUserId($id)
    {
        $result =  $this->db->table($this->tableName)
            ->select($this->selectedFields)
            ->where(['user_id' => $id])->execute();

        if (!empty($result)) {
            return $result;
        } else {
            return [];
        }
    }

    /**
     * Create a new order.
     *
     * @param   array  $data The data of the order to insert
     * @return  bool   True if successful, false otherwise
     */
    public function create($data)
    {
        return $this->db->table($this->tableName)
            ->insert($data)
            ->execute();
    }

    /**
     * Get an order by order_id from the table.
     *
     * @param   string  $orderId The order_id of the order to select
     * @return  mixed   Array of results if successful, false otherwise
     */
    public function getByOrderId($orderId)
    {
        $result =  $this->db->table($this->tableName)
            ->select($this->selectedFields)
            ->where(['order_id' => $orderId])->execute();

        if (!empty($result)) {
            return $result[0];
        } else {
            return [];
        }
    }

    /**
     * Get all orders.
     *
     * @return  mixed   Array of all orders if successful, false otherwise
     */
    public function getAll()
    {
        return $this->db->table($this->tableName)
            ->select($this->selectedFields)
            ->execute();
    }
}
