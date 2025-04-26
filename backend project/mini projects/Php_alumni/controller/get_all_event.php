<?php
require_once(BASE_PATH . '/models/event.php');
header(header: 'Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    session_start();

   
    $event = new Event(); // Assuming your class is named Event

    try {
        $eventData = $event->getAll(); // Call to get all event records

        echo json_encode(["status" => "200", "data" => $eventData]);
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => "An error occurred: " . $e->getMessage()]);
    }
}
?>
