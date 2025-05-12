<?php
require_once(BASE_PATH . '/config/database.php');
require_once(BASE_PATH . '/config/cloud.php'); 
class Alumni {
    private $db;

    public function __construct() {
        $this->db = database::getInstance()->getConnection();  
    }

    // Get all alumni

   
    // Alumni creates a post
    public function createPost($alumniId, $groupId, $content, $img = null) {
        $stmt = $this->db->prepare("SELECT * FROM Participate WHERE Id_Alumni = ? AND Id_Group = ?");
        $stmt->execute([$alumniId, $groupId]);
        $isParticipant = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if (!$isParticipant) {
            error_log("Not a participant or fetch failed");
            return false; 
        }
    
        if ($img && $img['error'] === 0) {
            $img_url = uploadImage($img);
        } else {
            $img_url = null;
        }
    
        $stmt = $this->db->prepare("INSERT INTO Post (Id_Alumni, Id_Group, Content_Post, Img_Post, Created_At_Post) VALUES (?, ?, ?, ?, NOW())");
        
        return $stmt->execute([$alumniId, $groupId, $content, $img_url]);
         
    }
    

    // Alumni deletes a post
    public function deletePost($alumniId, $postId) {
        $stmt = $this->db->prepare("SELECT Id_Alumni FROM Post WHERE Id_Post = ?");
        $stmt->execute([$postId]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($post && $post['Id_Alumni'] == $alumniId) {
            $deleteStmt = $this->db->prepare("DELETE FROM Post WHERE Id_Post = ?");
            return $deleteStmt->execute([$postId]);
        }

        return false;  
    }
  

    // Alumni creates a new group
public function getGroupPosts($groupId) {
    try {
        $stmt = $this->db->prepare("
            SELECT 
                p.Id_Post,
                p.Content_Post,
                p.Img_Post,
                p.Created_At_Post,
                a.Id_Alumni,
                a.Name_Alumni AS Name_Alumni,
                a.Img_Alumni
            FROM Post p
            JOIN Alumni a ON p.Id_Alumni = a.Id_Alumni
            WHERE p.Id_Group = ?
            ORDER BY p.Created_At_Post DESC
        ");
        
        // Execute with the actual $groupId
        $stmt->execute([$groupId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return [];
    }
}
}