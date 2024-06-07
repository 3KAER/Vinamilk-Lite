<?php

namespace Core;

use Exception;

class Controller
{
    public $request;
    public $response;

    /**
     * Controller constructor.
     * 
     * @return void
     */
    public function __construct()
    {
        $this->request = $GLOBALS['request'];
        $this->response = $GLOBALS['response'];
    }

    /**
     * Create a model.
     * 
     * @return  object  model instance    
     */
    public function model($modelName)
    {
        $file = MODELS_PATH . ucfirst($modelName) . '.php';

        if (file_exists($file)) {
            $model = 'App\Models\\' . ucfirst($modelName);
            if (class_exists($model)) {
                return new $model;
            } else {
                throw new Exception($model . ' this model class not found!');
            }
        } else {
            throw new Exception($file . ' this model file not found!');
        }
    }
}
