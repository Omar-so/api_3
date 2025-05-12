<?php
require_once(BASE_PATH . '/models/event.php');
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
    session_start();
    $input = json_decode(file_get_contents('php://input'), true);


    if (!isset($_SESSION['admin_id'])) {
      echo json_encode(["status" => "401", "msg" => "Unauthorized"]);
      exit();
  }
    $name = $input['event_name'];
    $location = $input['event_location'];
    $eventDate = $input['event_date']; 
    $adminId = $_SESSION['admin_id'];  
    
    $event = new event();



    try {
        $eventCreated = $event->create($adminId, $name, $location, $eventDate);
        
        if ($eventCreated) {
            echo json_encode(["status" => "201", "msg" => "Event created successfully", "data"=> $eventCreated]);
        } else {
            echo json_encode(["status" => "500", "msg" => "Failed to create event"]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => "An error occurred: " . $e->getMessage()]);
    }
  }
?>
