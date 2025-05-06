<?php
require_once(BASE_PATH . '/models/Alumni.php');
$allowed_origin = "http://localhost:5500"; // <-- your frontend origin
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    
    if (!isset($_SESSION['alumni_id'])) {
        echo json_encode(["status" => "401", "msg" => "Unauthorized"]);
        exit();
    }

    $alumniId = $_SESSION['alumni_id'];
    $groupId = $_POST['group_id'];
    $content = $_POST['content'];
    $img = $_FILES['img'] ?? null;

    $alumni = new Alumni();
    // print_r($groupId . " " .$content. " ".$img);
    try {
        $result = $alumni->createPost($alumniId, $groupId, $content, $img);
        if ($result) {
            echo json_encode(["status" => "201", "msg" => "Post created successfully"]);
        } else {
            echo json_encode(["status" => "403", "msg" => "You must participate in the group to post"]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => "An error occurred: " . $e->getMessage()]);
    }
}
?>
