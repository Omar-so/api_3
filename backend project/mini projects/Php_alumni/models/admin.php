<?php
require_once(BASE_PATH . '/config/database.php');
require_once(BASE_PATH . '/config/cloud.php'); 

class Admin {
    private $db;

    public function __construct() {
        $this->db = database::getInstance()->getConnection();  
    }

    // Get all admins
    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM Admin");  // Table name 'Admin'
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Get one admin by ID
    public function getById($id) {
        $stmt = $this->db->prepare("SELECT * FROM Admin WHERE Id_Admin = ?");  // Table name 'Admin'
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
     
    public function getByEmail($email) {
        $stmt = $this->db->prepare("SELECT * FROM Admin WHERE Email_Admin = ?");  // Table name 'Admin'
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($name, $email, $pass, $Img = null) {
        $hashedPassword = password_hash($pass, PASSWORD_DEFAULT);

        if ($Img && $Img['error'] === 0) {  
            $img_url = uploadImage($Img);  
        } else {
            $img_url = null;  
        }

        $stmt = $this->db->prepare("INSERT INTO Admin (Name_Admin, Email_Admin, Passwd_Admin, Img_Admin) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$name, $email, $hashedPassword, $img_url]);
    }

    // Update admin
    public function update($id, $name, $email, $pass) {
        $hashedPassword = password_hash($pass, PASSWORD_DEFAULT);

        $stmt = $this->db->prepare("UPDATE Admin SET Name_Admin = ?, Email_Admin = ?, Password_Admin = ? WHERE Id_Admin = ?");
        return $stmt->execute([$name, $email, $hashedPassword, $id]);
    }

    
// Admin responds to feedback
public function respondToFeedback($adminId, $feedbackId , $response) {
    $stmt = $this->db->prepare("SELECT Id_Admin FROM Feedback WHERE Id_Feedback = ?");
    $stmt->execute([$feedbackId]);
    $feedback = $stmt->fetch(PDO::FETCH_ASSOC);

        $responseStmt = $this->db->prepare("UPDATE Feedback SET Response_Admin = ? , Id_Admin = ?    WHERE Id_Feedback = ?");
        return $responseStmt->execute([$response, $adminId,$feedbackId]);
    

}

// Admin deletes an alumni
public function deleteAlumni($adminId, $alumniId, $reason) {
    $alumni = $this->getById($alumniId);  

    $stmt = $this->db->prepare("INSERT INTO Deleted_Alumni (Id_Admin, Id_Alumni, Reason_Deleted_Alumni, Deleted_At_Deleted_Alumni) 
                                VALUES (?, ?, ?, NOW())");
    $stmt->execute([$adminId, $alumniId, $reason]);

    $stmtDelete = $this->db->prepare("DELETE FROM Alumni WHERE Id_Alumni = ?");
    return $stmtDelete->execute([$alumniId]);
}

}
?>
