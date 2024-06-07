<?php
// App config
define('SHOW_ERRORS', true);

// Path config
define('BASE_PATH', str_replace('\\', '/', rtrim(__DIR__, '/')) . '/');
define('CONTROLLERS_PATH', BASE_PATH . 'app/Controllers/');
define('MODELS_PATH', BASE_PATH . 'app/Models/');
define('CORE_PATH', BASE_PATH . 'core/');
define('ROUTES_PATH', BASE_PATH . 'routes/');
define('VENDOR_PATH', BASE_PATH . 'vendor/');
