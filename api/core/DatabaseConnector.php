<?php

namespace Core;

use mysqli;
use Exception;

class DatabaseConnector
{
    private $dbConnection = null;
    private $host = null;
    private $port = null;
    private $dbName = null;
    private $username = null;
    private $password = null;

    /**
     * DatabaseConnector constructor
     */
    public function __construct()
    {
        $this->host = $_ENV['DB_HOST'];
        $this->port = $_ENV['DB_PORT'];
        $this->dbName = $_ENV['DB_DATABASE'];
        $this->username = $_ENV['DB_USERNAME'];
        $this->password = $_ENV['DB_PASSWORD'];
    }

    /**
     * Get database connection
     * 
     * @return  mixed   database connection
     */
    public function getConnection()
    {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $this->dbConnection = new mysqli(
            $this->host,
            $this->username,
            $this->password,
            $this->dbName,
            $this->port
        );
        $this->dbConnection->set_charset('utf8mb4');

        if ($this->dbConnection->connect_errno) {
            throw new Exception('Failed to connect to MySQL: ' . $this->dbConnection->connect_error . '.');
        }

        return $this->dbConnection;
    }
}
