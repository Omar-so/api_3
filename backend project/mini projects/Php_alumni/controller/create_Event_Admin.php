<?php
require_once(BASE_PATH . '/models/event.php');
header(header: 'Content-Type: application/json');

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    session_start();
    $input = json_decode(file_get_contents('php://input'), true);


    if (!isset($_SESSION['admin_id'])) {
      echo json_encode(["status" => "401", "msg" => "Unauthorized"]);
      exit();
  }
    $name = $input['event_name'];
    $location = $input['event_location'];
    $eventDate = $input['event_date'];  // Ensure this is in a valid date format (YYYY-MM-DD)
    $adminId = $_SESSION['admin_id'];  // Get the logged-in admin's ID from the session
    
    $event = new event();



    try {
        // Create the event using the method in the Admin class
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
