<?php
require_once(BASE_PATH . '/models/student.php');
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight
}
try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Invalid request method.");
    }

    $name = $_POST['name'] ?? null;
    $email = $_POST['email'] ?? null;
    $password = $_POST['password'] ?? null;
    $img = $_FILES['img'] ?? null;

    if (!$name || !$email || !$password) {
        throw new Exception("All fields are required.");
    }

    $student = new Student();

    if ($student->getByEmail($email)) {
        throw new Exception("Email already in use.");
    }

    $success = $student->createAccount($name, $email, $password, $img);

    echo json_encode([
        'status' => $success ? 201 : 403 ,
        'message' => $success ? 'Account created successfully.' : 'Failed to create account.'
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
