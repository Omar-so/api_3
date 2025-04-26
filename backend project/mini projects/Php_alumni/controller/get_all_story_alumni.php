<?php
require_once(BASE_PATH . '/models/Alumni.php');

header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    session_start();


        $input = json_decode(file_get_contents('php://input'), true);
    

    $alumniId = $input['alumni_id'];
    $alumni = new Alumni();

    try {
        $stories = $alumni->getAllStories($alumniId);

        if ($stories) {
            echo json_encode(["status" => "200", "data" => $stories]);
        } else {
            echo json_encode(["status" => "404", "msg" => "No stories found"]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => "An error occurred: " . $e->getMessage()]);
    }
}
?>
