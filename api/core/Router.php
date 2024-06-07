<?php

namespace Core;

use Exception;

class Router
{
    /**
     * Route list.
     * 
     * @var array
     */
    private $routes = [];

    /**
     * Request uri.
     * 
     * @var string
     */
    private $uri;

    /**
     * Request http method.
     * 
     * @var string
     */
    private $method;

    /**
     * Param list for route pattern.
     * 
     * @var array
     */
    private $params = [];

    /**
     *  Response Class.
     */
    private $response;

    /**
     *  Router constructor.
     * 
     * @param   string  $uri
     * @param   string  $method
     */
    public function __construct(string $uri, string $method)
    {
        $request = $GLOBALS['request'];
        $subPath = str_replace($request->server('DOCUMENT_ROOT'), '', BASE_PATH);
        $subPath = rtrim($subPath, '/');
        $uri = explode('?', $uri)[0];
        $this->uri = rtrim(str_replace($subPath, '', $uri), '/');
        if (empty($this->uri)) {
            $this->uri = '/';
        }

        $this->method = $method;
        $this->response = $GLOBALS['response'];
    }

    /**
     * Set get request http method for route.
     * 
     * @param   string    $pattern
     * @param   callable  $callback
     * @return  object    route
     */
    public function get($pattern, $callback)
    {
        return $this->addRoute("GET", $pattern, $callback);
    }

    /**
     * Set post request http method for route.
     *
     * @param   string    $pattern
     * @param   callable  $callback
     * @return  object    route
     */
    public function post($pattern, $callback)
    {
        return $this->addRoute('POST', $pattern, $callback);
    }

    /**
     * Set put request http method for route.
     * 
     * @param   string    $pattern
     * @param   callable  $callback
     * @return  object    route
     */
    public function put($pattern, $callback)
    {
        return $this->addRoute('PUT', $pattern, $callback);
    }

    /**
     * Set patch request http method for route.
     * 
     * @param   string    $pattern
     * @param   callable  $callback
     * @return  object    route
     */
    public function patch($pattern, $callback)
    {
        return $this->addRoute('PATCH', $pattern, $callback);
    }

    /**
     * Set delete request http method for route.
     * 
     * @param   string    $pattern
     * @param   callable  $callback
     * @return  object    route
     */
    public function delete($pattern, $callback)
    {
        return $this->addRoute('DELETE', $pattern, $callback);
    }

    /**
     * Add route object into router var.
     * 
     * @param   string      $method
     * @param   string      $pattern
     * @param   callable    $callback
     * @return  Route       Route instance
     */
    public function addRoute($method, $pattern, $callback)
    {
        $route = new Route($method, $pattern, $callback);
        array_push($this->routes, $route);
        return $route;
    }

    /**
     * Dispatch the router.
     * 
     * @return  mixed
     */
    public function dispatch()
    {
        foreach ($this->routes as $route) {
            if ($this->method === $route->getMethod()) {
                $matches = $this->match($route->getPattern());
                if ($matches) {
                    $middleware = $route->getMiddlewares();
                    if (!$this->excuteMiddlewares($middleware)) {
                        return;
                    }

                    $controller = $route->getCallback();
                    if (!is_callable($controller)) {
                        throw new Exception('Call a NON-callable callback');
                    }

                    return call_user_func_array($controller, [$this->params]);
                }
            }
        }

        $this->sendNotFound();
    }

    /**
     * Match the pattern with the current uri.
     * 
     * @param   string  $pattern
     * @return  bool    true if match, false otherwise
     */
    private function match($pattern)
    {
        $pattern = preg_replace('#:([\w]+)#', '(?P<$1>[\w-]+)', $pattern);
        $pattern = "#^$pattern$#i";

        if (!preg_match($pattern, $this->uri, $matches)) {
            return false;
        }

        foreach ($matches as $key => $match) {
            if (is_string($key)) {
                $this->params[$key] = $match;
            }
        }

        return true;
    }

    /**
     * Send not found response.
     * 
     * @return  void
     */
    private function sendNotFound()
    {
        $jsonResponse = $this->response->status(404)->json(
            0,
            [],
            "Not Found!",
        );
        echo $jsonResponse;
    }

    /**
     * Excute middleware list.
     * 
     * @param   object[]
     * @return  bool    true if pass all middleware, false otherwise
     */
    private function excuteMiddlewares(array $middlewares)
    {
        if (empty($middlewares)) {
            return true;
        }

        foreach ($middlewares as $middleware) {
            if (!method_exists($middleware, 'handle')) {
                throw new Exception('Invalid middleware!');
            }

            if (!$middleware->handle()) {
                $status = $middleware->getStatus();
                $message = $middleware->getMessage();
                echo $jsonResponse = $this->response->status($status)->json(
                    0,
                    [],
                    $message
                );

                return false;
            }
        }

        return true;
    }
}
