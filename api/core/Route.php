<?php

namespace Core;

use Exception;

final class Route
{
    /**
     *  Http method.
     * 
     * @var string 
     */
    private $method;

    /**
     *  The path for this route.
     * 
     *  @var string 
     */
    private $pattern;

    /**
     * The action, controller, callable. this route points to.
     * 
     * @var callable  
     */
    private $callback;

    /**
     * Middleware list.
     * 
     * @var object[] 
     */
    private $middlewares;

    /**
     *  Allows these HTTP methods.
     * 
     *  @var array
     */
    private $methodList = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

    /**
     * Route constructor
     * 
     * @param   string      $method
     * @param   string      $pattern
     * @param   callable    $callback
     */
    public function __construct(string $method, string $pattern, $callback)
    {
        $this->method = $this->validateMethod(strtoupper($method));
        $this->pattern = cleanUrl($pattern);
        $this->callback = $callback;
        $this->middlewares = [];
    }

    /**
     * Check valid method.
     * 
     * @param   string  $method
     * @return  mixed   true if method is valid, throws exception otherwise
     */
    private function validateMethod(string $method)
    {
        if (in_array(strtoupper($method), $this->methodList)) {
            return $method;
        }

        throw new Exception('Invalid Method Name');
    }

    /**
     * Get method.
     * 
     * @return  string  method name
     */
    public function getMethod()
    {
        return $this->method;
    }

    /**
     * Get pattern.
     * 
     * @return  string  pattern
     */
    public function getPattern()
    {
        return $this->pattern;
    }

    /**
     *  get callback
     * 
     * @return  callable    callback
     */
    public function getCallback()
    {
        return $this->callback;
    }

    /**
     * Add a middleware to middleware list.
     * 
     * @param   object[]    $middleware
     * @return  Route      this route instance
     */
    public function addMiddleware($middleware)
    {
        $this->middlewares[] = $middleware;
        return $this;
    }

    /**
     * Get middleware list.
     * 
     * @return  object[]    middleware list
     */
    public function getMiddlewares()
    {
        return $this->middlewares;
    }
}
