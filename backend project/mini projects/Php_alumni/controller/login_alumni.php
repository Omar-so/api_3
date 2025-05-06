<?php
require_once(BASE_PATH . '/models/Alumni.php');
$allowed_origin = "http://localhost:5500"; // <-- your frontend origin
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight
}

header('Content-Type: application/json');

// Handle preflight requests for OPTIONS method
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;  // If it's an OPTIONS request, stop processing and return headers
}



if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'];
    $pass = $input['password'];
    
    $alumni = new Alumni();

    
    
    try {
        $data = $alumni->getByEmail($email); // Retrieve the alumni by email
         
        // print_r($data);         
        if ($data) {   
            // Verify the password
            if (password_verify($pass, $data['Passwd_Alumni'])) {
                // Start the session and store alumni data
                session_start();
                $_SESSION['alumni_id'] = $data['Id_Alumni'];
                $_SESSION['alumni_name'] = $data['Name_Alumni'];
                $_SESSION['alumni_email'] = $data['Email_Alumni'];
                $_SESSION['alumni_job'] = $data['Job_Alumni'];
                $_SESSION['alumni_department'] = $data['Department_Alumni'];

                echo json_encode(["status" => "200", "msg" => "Login successful" , "data" =>$_SESSION['alumni_id']]   );
            } else {
                echo json_encode(["status" => "403", "msg" => "Incorrect password"]);
            }
        } else {
            echo json_encode(["status" => "404", "msg" => "Alumni not found"]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => "An error occurred: " . $e->getMessage()]);
    }
  }
?>
