<?php
require_once(BASE_PATH . '/models/Alumni.php');
header(header: 'Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $alumni = new Alumni(); 

    try {
        $groups = $alumni->getAllgroups(); 

        echo json_encode(["status" => "200", "data" => $groups]);
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => "An error occurred: " . $e->getMessage()]);
    }
}
?>
