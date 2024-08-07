<?php

namespace App\Models;

use Core\Model;

class Address extends Model
{
    /**
     * Table name.
     *
     * @var string
     */
    protected $tableName = 'addresses';

    /**
     * The selected fields.
     * 
     * @var array
     * 
     */
    protected $selectedFields = ['id', 'user_id', 'ward', 'district', 'province', 'recipient', 'created_at', 'updated_at'];

    /**
     * Get a user by email from the table.
     *
     * @param   string  $email The email of the user to select
     * @return  mixed   Array of results if successful, false otherwise
     */
    public function getByUserId($id)
    {
        $result = $this->db->table($this->tableName)
            ->select($this->selectedFields)
            ->where(['user_id' => $id])
            ->execute();

        if ($result) {
            return $result;
        } else {
            return null;
        }
    }
}
