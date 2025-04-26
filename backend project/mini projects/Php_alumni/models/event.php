<?php
require_once(BASE_PATH . '/config/database.php');
require_once(BASE_PATH . '/config/cloud.php'); 

class Event {
    private $db;

    public function __construct() {
        $this->db = database::getInstance()->getConnection();  
    }

    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM Event");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->db->prepare("SELECT * FROM Event WHERE Id_Event = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($Id_admin, $Name, $location, $date) {
        $stmt = $this->db->prepare(
            "INSERT INTO Event (Id_admin, Name_Event, Location_Event, Event_Date) VALUES (?, ?, ?, ?)"
        );
    
        if ($stmt->execute([$Id_admin, $Name, $location, $date])) {
            // Combine insert + select in one return
            $id = $this->db->lastInsertId();
            return $this->getById($id); // fetch event data using a helper
        }
    
        return false;
    }
    
    
    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM Event WHERE Id_Event = ?");
        return $stmt->execute([$id]);
    }
    public function getEventsByAlumniId($alumniId) {
        $stmt = $this->db->prepare("
            SELECT e.* 
            FROM Event e
            INNER JOIN Event_Registration r ON e.Id_Event = r.Id_Event
            WHERE r.Id_Alumni = ?
        ");
        $stmt->execute([$alumniId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
