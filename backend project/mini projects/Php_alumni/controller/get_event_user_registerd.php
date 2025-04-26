<?php
require_once(BASE_PATH . '/models/event.php');

header('Content-Type: application/json');

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
