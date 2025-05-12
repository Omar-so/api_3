<!-- <?php
require_once(BASE_PATH . '/config/database.php');
require_once(BASE_PATH . '/config/cloud.php'); 
class Alumni {
    private $db;

    public function __construct() {
        $this->db = database::getInstance()->getConnection();  
    }



public function offerMentorship($alumniId, $field, $description) {
    try {
        $stmt = $this->db->prepare("
            INSERT INTO Mentorship (Id_Alumni, Topic_Mentorship, Description_Mentorship)
            VALUES (?, ?, ?)
        ");
        return $stmt->execute([$alumniId, $field, $description]);
    } catch (PDOException $e) {
        return false; 
    }
}


public function getAllMentorshipOffers() {
    try {
        $stmt = $this->db->prepare("
            SELECT m.*, a.Name_Alumni, a.Email_Alumni
            FROM Mentorship m
            JOIN Alumni a ON m.Id_Alumni = a.Id_Alumni
        ");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return []; 
    }
} 



}

