<?php

namespace App\Models;

use Core\Model;

class Order extends Model
{
    /**
     * Table name.
     *
     * @var string
     */
    protected $tableName = 'orders';

    /**
     * The selected fields.
     * 
     * @var array
     */
    protected $selectedFields = [
        'id', 'request_id', 'amount',
        'order_info', 'order_type', 'trans_id', 'result_code', 'message',
        'pay_type', 'response_time', 'extra_data', 'signature', 'payment_option', 'created_at', 'user_id'
    ];

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
