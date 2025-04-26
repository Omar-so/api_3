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
    

    $alumniId = $_SESSION['alumni_id'];
    $title = $input['title'];
    $content = $input['content'];

    $alumni = new Alumni();

    try {
        $story = $alumni->createStory($alumniId, $title, $content);
        if ($story) {
            echo json_encode(["status" => "201", "msg" => "Story created successfully", "data" => $story]);
        } else {
            echo json_encode(["status" => "400", "msg" => "Failed to create story"]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => "An error occurred: " . $e->getMessage()]);
    }
}
?>
