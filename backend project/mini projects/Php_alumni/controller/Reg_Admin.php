<?php
require_once(BASE_PATH . '/models//admin.php');
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
    $Img  = $_FILES['img'];
    
    // Instantiate the Admin class
    $admin = new Admin();
    
    try {
      if (!$admin->getByEmail($email)) {       
        $admin->create($name, $email, $pass, $Img);
        echo json_encode(["status" => "201", "msg" => "You have registered successfully"]);
      } else {
        echo json_encode(["status" => "403", "msg" => "This data is already in our system"]);
      }
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => "An error occurred: " . $e->getMessage()]);
    }
  }
?>
