<?php

class Database {
    private static $instance = null;
    private $connection;

    // Prevent direct creation
    private function __construct() {
        $host = 'localhost';
        $dbname = 'alumni';
        $user = 'phpmyadmin';
        $pass = '12345';

        try {
            $this->connection = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("DB Connection failed: " . $e->getMessage());
        }
    }

    // Singleton access
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    // Access the PDO connection
    public function getConnection() {
        return $this->connection;
    }
}
