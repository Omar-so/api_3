<?php
require_once(BASE_PATH . '/config/database.php');
require_once(BASE_PATH . '/config/cloud.php'); 
class Alumni {
    private $db;

    public function __construct() {
        $this->db = database::getInstance()->getConnection();  
    }

    // Alumni deletes a comment
    public function deleteComment($alumniId, $commentId) {
        $stmt = $this->db->prepare("SELECT Id_Alumni FROM Comment WHERE Id_Comment = ?");
        $stmt->execute([$commentId]);
        $comment = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($comment && $comment['Id_Alumni'] == $alumniId) {
            $deleteStmt = $this->db->prepare("DELETE FROM Comment WHERE Id_Comment = ?");
            return $deleteStmt->execute([$commentId]);
        }

        return false;  
    }
public function getComments($postId) {
    try {
        $stmt = $this->db->prepare("
            SELECT 
                c.Id_Comment,
                c.Content_Comment,
                c.Created_At_Comment,
                a.Name_Alumni AS Alumni_Name,
                a.Id_Alumni
            FROM Comment c
            JOIN Alumni a ON c.Id_Alumni = a.Id_Alumni
            WHERE c.Id_Post = ?
            ORDER BY c.Created_At_Comment ASC
        ");
        $stmt->execute([$postId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return []; 
    }
    
}




}
?>
