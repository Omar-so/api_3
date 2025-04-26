<?php
require_once(BASE_PATH . '/models/Alumni.php');

header(header: 'Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    session_start();
    $input = json_decode(file_get_contents('php://input'), true);


    if (!isset($_SESSION['alumni_id'])) {
      echo json_encode(["status" => "401", "msg" => "Unauthorized"]);
      exit();
  }

    $eventId = $input['event_id'];    // Event ID to register for
    $alumniId = $_SESSION['alumni_id'];  // Alumni ID (should be from the session)
    
    $alumni = new Alumni();

    try {
        // Register alumni for event
        if ($alumni->registerForEvent($alumniId, $eventId)) {
            echo json_encode(["status" => "201", "msg" => "Successfully registered for the event"]);
        } else {
            echo json_encode(["status" => "400", "msg" => "Registration failed"]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => "An error occurred: " . $e->getMessage()]);
    }
}
?>
