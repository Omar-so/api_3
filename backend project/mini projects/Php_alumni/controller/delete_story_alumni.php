<?php
require_once(BASE_PATH . '/models/Alumni.php');

header(header: 'Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    session_start();

    $input = json_decode(file_get_contents('php://input'), true);

    // Ensure the alumni is logged in
    if (!isset($_SESSION['alumni_id'])) {
        echo json_encode(["status" => "401", "msg" => "Unauthorized"]);
        exit();
    }


    $alumniId = $_SESSION['alumni_id'];
    $storyId = $input['story_id'];

    $alumni = new Alumni();

    try {
        $deleted = $alumni->deleteStory($storyId, $alumniId);
        if ($deleted) {
            echo json_encode(["status" => "200", "msg" => "Story deleted successfully"]);
        } else {
            echo json_encode(["status" => "403", "msg" => "You are not authorized to delete this story or it does not exist"]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => "An error occurred: " . $e->getMessage()]);
    }
}
?>
