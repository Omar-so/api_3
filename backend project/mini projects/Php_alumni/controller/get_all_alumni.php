<?php
require_once(BASE_PATH . '/models/Alumni.php');
header(header: 'Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    
    $input = json_decode(file_get_contents('php://input'), true);

    $name = $input['name']; 
    $Alumni = new Alumni(); // Assuming your class is named Event

    try {
        $AlumniData = $Alumni->getAllByname($name); // Call to get all event records

        echo json_encode(["status" => "200", "data" => $eventData]);
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => "An error occurred: " . $e->getMessage()]);
    }
}
?>
