<?php

namespace Core;

class Response
{
    /**
     * Set status code if it is valid.
     * 
     * @param   int             $statusCode
     * @param   bool            $hasMessage default: true
     * @return  object|void     Response instance if hasMessage is true, void ortherwise.
     */
    public function status($statusCode = 200, $hasMessage = true)
    {
        if (!$this->isValid($statusCode)) {
            exit('Invalid status code!');
        }

        http_response_code($statusCode);
        if ($hasMessage) {
            return $this;
        }
    }

    /**
     * Check if status code is valid.
     * 
     * @param   int     $statusCode
     * @return  bool    true if status code is valid, false otherwise
     */
    public function isValid($statusCode)
    {
        return $statusCode >= 100 && $statusCode < 600;
    }

    /**
     * Create JSON format for response content.
     * 
     * @param   int     $success 1 if successful, 0 otherwise
     * @param   mixed   $data
     * @param   string  $message
     * @return  string  response JSON
     */
    public function json($success = 1, $data = [], $message = '')
    {
        return json_encode([
            'success' => $success,
            'message' => $message,
            'data' => $data,
        ]);
    }

    /**
     * Set Cookie.
     *
     * @param   string  $key
     * @param   string  $value
     * @param   int     $expires
     * @return  bool    true if overwritten, otherwise false.
     */
    public function setCookie(string $key, string $value, int $expires)
    {
        if ($key === '') {
            return false;
        }

        if (isset($_COOKIE[$key])) {
            setcookie($key, $value, [
                'expires' => $expires,
                'path' => '/',
                'domain' => '',
                'secure' => false,
                'httponly' => true,
                'samesite' => 'Lax'
            ]);

            return true;
        }

        setcookie($key, $value, [
            'expires' => $expires,
            'path' => '/',
            'domain' => '',
            'secure' => false,
            'httponly' => true,
            'samesite' => 'Lax'
        ]);

        return false;
    }
}
