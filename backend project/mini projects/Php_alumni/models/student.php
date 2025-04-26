<?php

require_once(BASE_PATH . '/config/database.php');
require_once(BASE_PATH . '/config/cloud.php'); 

class Student {
    private $db;

    public function __construct() {
        $this->db = database::getInstance()->getConnection();
    }

    public function getByEmail($email) {
        $stmt = $this->db->prepare("SELECT * FROM Student WHERE Email_student = ?");  // Table name 'Admin'
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->db->prepare("SELECT * FROM Student WHERE Id_student = ?");  // Table name 'Admin'
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Create a new student account
    public function createAccount($name, $email, $password, $img = null) {
        if ($img && $img['error'] === 0) {
            $img_url = uploadImage($img); 
        } else {
            $img_url = null;
        }

        $stmt = $this->db->prepare("INSERT INTO Student (Name_Student, Email_Student, Passwd_Student, Img_Student) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT), $img_url]);
    }

    // Update student account
    public function updateAccount($id, $name, $email, $password = null, $img = null) {
        $passwordQuery = '';
        $params = [$name, $email, $id];
        
        if ($password) {
            $passwordQuery = "Password_Student = ?, ";
            $params = [$name, $email, password_hash($password, PASSWORD_DEFAULT), $id];
        }
        
        if ($img && $img['error'] === 0) {
            $img_url = uploadImage($img); 
            $params[] = $img_url;
        }

        $stmt = $this->db->prepare("UPDATE Student SET Name_Student = ?, Email_Student = ?, $passwordQuery Img_Student = ? WHERE Id_Student = ?");
        return $stmt->execute($params);
    }

    // Apply for mentorship
    public function applyForMentorship($studentId, $mentorshipId) {
        $stmt = $this->db->prepare("INSERT INTO Student_Mentorship (Id_Student, Id_Mentorship) VALUES (?, ?)");
        return $stmt->execute([$studentId, $mentorshipId]);
    }
}
?>