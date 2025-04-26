<?php
require_once(BASE_PATH . '/models/student.php');

header(header: 'Content-Type: application/json');
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
        'status' => 'success',
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
