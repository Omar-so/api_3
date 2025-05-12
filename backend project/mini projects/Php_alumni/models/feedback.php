<?php
require_once(BASE_PATH . '/config/database.php');
require_once(BASE_PATH . '/config/cloud.php'); 
class Alumni {
    private $db;

    public function __construct() {
        $this->db = database::getInstance()->getConnection();  
    }


public function submitFeedback($idalumni , $content) {
    $stmt = $this->db->prepare("INSERT INTO Feedback (Id_Alumni, Content_Feedback, Submitted_At_Feedback) 
                                VALUES (?, ?, NOW())");
    return $stmt->execute([ $idalumni , $content]);
}


function getAllFeedback() {
    try {
        $stmt = $this->db->prepare("SELECT * FROM `Feedback`"); 
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if (empty($result)) {
            echo "No records found in the 'Group' table.";
        }

        return $result;  
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
        return []; 
    }
}



}
?>
