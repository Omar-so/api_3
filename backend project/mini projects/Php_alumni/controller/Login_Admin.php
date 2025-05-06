<?php
require_once(BASE_PATH . '/models/admin.php');


$allowed_origin = "http://localhost:5500"; // <-- your frontend origin
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight
}

header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'];
    $pass = $input['password'];
    
    $admin = new Admin();
    
    try {
        $data = $admin->getByEmail($email);
        if ($data) {   
            // Verify the password
            if (password_verify($pass, $data['Passwd_Admin'])) {
                // Start the session and store user data
                session_start();
                $_SESSION['admin_id'] = $data['Id_Admin'];
                $_SESSION['admin_name'] = $data['Name_Admin'];
                  
                echo json_encode(["status" => "200", "msg" => "Login successful" , "data"=> $_SESSION ]);
            } else {
                echo json_encode(["status" => "403", "msg" => "Incorrect password"]);
            }
        } else {
            echo json_encode(["status" => "404", "msg" => "Admin not found"]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => "An error occurred: " . $e->getMessage()]);
    }
  }
?>
