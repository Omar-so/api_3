<?php
require_once(BASE_PATH . '/models/Alumni.php');
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get data from POST request
    $name = $_POST['name'];
    $email = $_POST['email'];
    $pass = $_POST['password'];
    $job = $_POST['job'];
    $dep = $_POST['department'];
    $Img = isset($_FILES['img']) ? $_FILES['img'] : null;
     
    print_r($_POST); 
    print_r($_FILES);

    // Hash the password before storing it in the database
    $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);

    // Instantiate the Alumni class
    $alumni = new Alumni();
    
    try {
        // Check if the email already exists in the system
        if (!$alumni->getByEmail($email)) {       
            // Create a new alumni entry
            $response = $alumni->create($name, $email, $hashed_pass, $job, $Img, $dep);
            echo json_encode([
                "status" => "201", 
                "msg" => "You have registered successfully", 
                "data" => $response
            ]);
        } else {
            echo json_encode([
                "status" => "403", 
                "msg" => "This email is already in our system"
            ]);
        }
    } catch (Exception $e) {
        echo json_encode([
            "status" => "500", 
            "msg" => "An error happened: " . $e->getMessage()
        ]);
    }
  }
?>