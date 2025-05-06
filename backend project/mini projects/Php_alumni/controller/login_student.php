<?php
require_once(BASE_PATH . '/models/student.php');

$allowed_origin = "http://localhost:5500"; // <-- your frontend origin
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;  // If it's an OPTIONS request, stop processing and return headers
}



try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Invalid request method.");
    }
    $input = json_decode(file_get_contents('php://input'), true);


    $email = $input['email'] ?? null;
    $password = $input['password'] ?? null;

    if (!$email || !$password) {
        throw new Exception("Email and password are required.");
    }

    $student = new Student();
    $data = $student->getByEmail($email);

    if (!$data || !password_verify($password, $data['Passwd_Student'])) {
        throw new Exception("Invalid email or password.");
    }

    $_SESSION['student_id'] = $data['Id_Student'];
    $_SESSION['student_name'] = $data['Name_Student'];

    echo json_encode([
        'status' => 200,
        'message' => 'Login successful.',
        'student' => [
            'id' => $data['Id_Student'],
            'name' => $data['Name_Student'],
            'email' => $data['Email_Student'],
            'image' => $data['Img_Student']
        ]
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
