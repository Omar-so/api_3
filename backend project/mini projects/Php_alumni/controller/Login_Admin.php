<?php
require_once(BASE_PATH . '/models/admin.php');
header(header: 'Content-Type: application/json');


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

                echo json_encode(["status" => "201", "msg" => "Login successful"]);
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
