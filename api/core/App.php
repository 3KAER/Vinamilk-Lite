<?php

namespace Core;

use Throwable;
use ErrorException;


class App
{
	/**
	 * The base path of the app.
	 *
	 * @var string
	 */
	protected $basePath;

	/**
	 * App constructor.
	 *
	 * @param  string|null  $basePath
	 */
	public function __construct($basePath = null)
	{
		$this->basePath = $basePath;
		$this->registerErrorHandling();
	}

	/**
	 * Set the error handling for the app.
	 *
	 * @return void
	 */
	protected function registerErrorHandling()
	{
		error_reporting(-1);

		set_error_handler(function ($level, $message, $file = '', $line = 0) {
			if (error_reporting() & $level) {
				throw new ErrorException($message, 0, $level, $file, $line);
			}
		});

		set_exception_handler(function ($error) {
			$this->handleException($error);
		});
	}

	/**
	 * Handle an uncaught exception instance.
	 *
	 * @param  Throwable  $error
	 * @return void
	 */
	protected function handleException(Throwable $error)
	{
		$file = $error->getFile();
		$line = $error->getLine();
		$trace = $error->getTrace();
		$message = $error->getMessage();

		http_response_code(500);
		echo json_encode([
			'success' => 0,
			'message' => $message,
			'data' => ['file' => $file, 'line' => $line, 'trace' => $trace]
		]);
	}

	/**
	 * Get the base path for the app.
	 *
	 * @return string
	 */
	public function basePath()
	{
		$this->basePath = realpath(getcwd() . '/../');
		return $this->basePath;
	}
}
