<?php
require_once(BASE_PATH . '/models/event.php');

header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight
}

try {
    session_start();

    if (!isset($_SESSION['alumni_id'])) {
        throw new Exception('You must be logged in.');
    }

    $alumniId = $_SESSION['alumni_id'];
    $event = new Event();
    $registeredEvents = $event->getEventsByAlumniId($alumniId);

    echo json_encode([
        "status" => 200,
        "msg" => "Events retrieved successfully.",
        "data" => $registeredEvents
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "status" => 500,
        "msg" => "An error occurred.",
        "error" => $e->getMessage()
    ]);
}
