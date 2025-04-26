<?php
require_once(BASE_PATH . '/config/database.php');

class News {
    private $db;

    public function __construct() {
        $this->db = database::getInstance()->getConnection();  
    }

    // Get all news
    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM News");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Get one news by ID
    public function getById($id) {
        $stmt = $this->db->prepare("SELECT * FROM News WHERE Id_News = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Insert new news
    public function create($Id_admin, $Title_news, $Content_News) {
        $stmt = $this->db->prepare("INSERT INTO News (Id_admin, Title_news, Content_News) VALUES (?, ?, ?)");
        
        if ($stmt->execute([$Id_admin, $Title_news, $Content_News])) {
            $id = $this->db->lastInsertId(); 
            
            return [
                "id" => $id,
                "Id_admin" => $Id_admin,
                "Title_news" => $Title_news,
                "Content_News" => $Content_News
            ];
        } else {
            return false;
        }
    }
    

    // Update news
    public function update($id, $Title_news, $Content_News) {
        $stmt = $this->db->prepare("UPDATE News SET Title_news = ?, Content_News = ? WHERE Id_News = ?");
        return $stmt->execute([$Title_news, $Content_News, $id]);
    }

    // Delete news
    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM News WHERE Id_News = ?");
        return $stmt->execute([$id]);
    }
}
?>
