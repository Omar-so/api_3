<?php
session_start();

// Explicitly set allowed origins
$allowedOrigins = [
    'http://127.0.0.1:5500',
    'http://localhost:5500'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Set CORS headers only for allowed origins
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Default to one allowed origin if no match
    header("Access-Control-Allow-Origin: http://localhost:5500");
}

// Essential CORS headers
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Proper session destruction
$_SESSION = []; // Clear session data

// Delete session cookie
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

session_destroy();

// Success response
echo json_encode([
    'status' => 200,
    'message' => 'Logout successful'
]);
?>