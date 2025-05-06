<?php
require_once(BASE_PATH . '/models/Alumni.php');

// Set proper CORS headers
$allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5500'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
