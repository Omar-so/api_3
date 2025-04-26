<?php
require_once(BASE_PATH . '/models/student.php');

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Invalid request method.");
    }

    $name = $_POST['name'] ?? null;
    $email = $_POST['email'] ?? null;
    $password = $_POST['password'] ?? null;
    $img = $_FILES['image'] ?? null;

    if (!$name || !$email || !$password) {
        throw new Exception("All fields are required.");
    }

    $student = new Student();

    // Check if email is already registered
    if ($student->getByEmail($email)) {
        throw new Exception("Email already in use.");
    }

    $success = $student->createAccount($name, $email, $password, $img);

    echo json_encode([
        'status' => $success ? 'success' : 'error',
        'message' => $success ? 'Account created successfully.' : 'Failed to create account.'
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
