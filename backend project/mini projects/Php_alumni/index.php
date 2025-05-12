<?php
session_set_cookie_params(lifetime_or_options: [
    'lifetime' => 0,
    'path' => '/',
    'domain' => 'localhost', 
    'secure' => false,        
    'httponly' => true,
    'samesite' => 'None'    
]);

session_start();
define('BASE_PATH', __DIR__);

// CORS Configuration
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}


// Action handling
$action = isset($_GET['action']) ? $_GET['action'] : 'home';

$controllers = [
    'alumni_register' => 'controller/reg_alumni.php',
    'submit_feedback_alumni' => 'controller/submit_feedback_alumni.php',
    'response_feedback_admin' => 'controller/response_feedback_admin.php',
    'reg_student' => 'controller/reg_student.php',
    'reg_admin' => 'controller/Reg_Admin.php',
    'offer_mentorship_alumni' => 'controller/offer_mentorship_alumni.php',
    'login_student' => 'controller/login_student.php',
    'login_alumni' => 'controller/login_alumni.php',
    'login_admin' => 'controller/Login_Admin.php',
    'join_group_alumni' => 'controller/join_group_alumni.php',
    'get_comment_post' => 'controller/get_comment_post.php',
    'get_all_story_alumni' => 'controller/get_all_story_alumni.php',
    'get_all_post_goups' => 'controller/get_all_post_goups.php',
    'get_all_news' => 'controller/get_all_news.php',
    'get_all_mentorship' => 'controller/get_all_mentorship.php',
    'get_all_event' => 'controller/get_all_event.php',
    'exit_group_alumni' => 'controller/exit_group_alumni.php',
    'delete_story_alumni' => 'controller/delete_story_alumni.php',
    'delete_news_admin' => 'controller/delete_news_admin.php',
    'delete_comment_alumni' => 'controller/delete_comment_alumni.php',
    'create_story_alumni' => 'controller/create_story_alumni.php',
    'create_post_alumni' => 'controller/create_post_alumni.php',
    'create_news_admin' => 'controller/create_news_admin.php',
    'create_group_alumni' => 'controller/create_group_alumni.php',
    'create_event_admin' => 'controller/create_Event_Admin.php',
    'create_comment_alumni' => 'controller/create_comment_alumni.php',
    'create_cer_admin' => 'controller/create_cer_Admin.php',
    'apply_mentorship_student' => 'controller/apply_mentorship_student.php',
    'alumni_register_event' => 'controller/alumni_register_event.php',
    'get_all_groups'=> 'controller/get_all_groups.php',
    'get_student_id'=> 'controller/get_student_by_id.php',
    'get_alumni_id'=>'controller/get_alumni_by_id.php',
    'update_alumni' =>'controller/update_data_alumni.php',
    'get_all_alumni_name' => 'controller/get_all_alumni.php',
    'get_all_feedback' => 'controller/get_all_feedback.php',
    'logout' => 'controller/logout.php',
    'get_event_alumni' => 'controller/get_event_user_registerd.php'
];

if (array_key_exists($action, $controllers)) {
    require_once BASE_PATH . '/' . $controllers[$action];
} else {
    echo "Page not found";
}
