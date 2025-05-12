<?php
require_once(BASE_PATH . '/models/Alumni.php');
require_once(BASE_PATH . '/config/emailsender.php');

header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight
}
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $pass = $_POST['password'];
    $job = $_POST['job'];
    $dep = $_POST['department'];
    $Img = isset($_FILES['img']) ? $_FILES['img'] : null;
 
    $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);

    $alumni = new Alumni();
    
    try {
        if (!$alumni->getByEmail($email)) {       
            $response = $alumni->create($name, $email, $hashed_pass, $job, $Img, $dep);
            $sendemail = new MailSender("omargood.game55@gmail.com");
            $check = $sendemail->send($email , "register", "You have registered successfully");
            
            echo json_encode([
                "status" => "201", 
                "msg" => "You have registered successfully", 
                "data" => $response
            ]);
        } else {
            echo json_encode([
                "status" => "403", 
                "msg" => "This email is already in our system"
            ]);
        }
    } catch (Exception $e) {
        echo json_encode([
            "status" => "500", 
            "msg" => "An error happened: " . $e->getMessage()
        ]);
    }
  }
?>