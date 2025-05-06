<?php
require_once(BASE_PATH . '/models/cert.php');
$allowed_origin = "http://localhost:5500"; // <-- your frontend origin
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight
}

header('Content-Type: application/json');  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    session_start();

    if (!isset($_SESSION['admin_id'])) {
        echo json_encode(["status" => "401", "msg" => "Unauthorized"]);
        exit();
    }

    $name = $_POST['Name_Certificate'];
    $issuedDate = $_POST['Issued_Date'];
    $Img = $_FILES['img'];
    $adminId = $_SESSION['admin_id'];  // Get the logged-in admin's ID from the session
    
    $cert = new $cert();



    try {
        $certCreated = $cert->create($adminId, $name, $issuedDate, $Img);
        
        if ($eventCreated) {
            echo json_encode(["status" => "201", "msg" => "certficate created successfully", "data" => $certCreated ]);
        } else {
            echo json_encode(["status" => "500", "msg" => "Failed to create certficate"]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => "An error occurred: " . $e->getMessage()]);
    }
  }
?>
