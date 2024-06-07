<?php

namespace Core;

class Middleware extends Controller
{
    /**
     * Response status code
     * 
     * @var int
     */
    protected $statusCode;

    /**
     * Response message
     * 
     * @var string
     */
    protected $message;

    public function __construct()
    {
        parent::__construct();
        $this->statusCode = 400;
        $this->message = "Bad request!";
    }

    /**
     * Handle the middleware.
     * 
     * @return  mixed   True if successful, throw exception otherwise.
     */
    protected function handle()
    {
        return true;
    }

    /**
     * Get status code
     * 
     * @return  int status code
     */
    public function getStatus()
    {
        return $this->statusCode;
    }

    /**
     * Get response message
     * 
     * @return  string  response message
     */
    public function getMessage()
    {
        return $this->message;
    }
}
