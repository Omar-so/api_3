<?php
require_once(BASE_PATH . '/config/database.php');
require_once(BASE_PATH . '/config/cloud.php'); 
class Alumni {
    private $db;

    public function __construct() {
        $this->db = database::getInstance()->getConnection();  
    }

    // Get all alumni


    public function createStory($alumniId, $title, $content) {
        $stmt = $this->db->prepare("INSERT INTO Story (Id_Alumni, Title_Story, Content_Story,Created_At_Story) VALUES (?, ?, ?,NOW())");
        
        if ($stmt->execute([$alumniId, $title, $content])) {
            $id = $this->db->lastInsertId();
            return [
                "id" => $id,
                "alumni_id" => $alumniId,
                "title" => $title,
                "content" => $content
            ];
        } else {
            return false;
        }
    }
    
    // Delete a story for an alumni
    public function deleteStory($storyId, $alumniId) {
        $stmt = $this->db->prepare("SELECT * FROM Story WHERE Id_Story = ? AND Id_Alumni = ?");
        $stmt->execute([$storyId, $alumniId]);
        
        if ($stmt->rowCount() == 0) {
            return false; 
        }

        $stmt = $this->db->prepare("DELETE FROM Story WHERE Id_Story = ?");
        return $stmt->execute([$storyId]);
    }


    // In Alumni.php
public function getAllStories($alumniId) {
    $stmt = $this->db->prepare("SELECT * FROM Story WHERE Id_Alumni = ? ORDER BY Created_At_Story DESC");
    $stmt->execute([$alumniId]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC); 
}

 



}
