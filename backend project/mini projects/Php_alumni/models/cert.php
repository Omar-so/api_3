<?php
require_once(BASE_PATH . '/config/database.php');
require_once(BASE_PATH . '/config/cloud.php'); 

class Certificate {
    private $db;

    public function __construct() {
        $this->db = database::getInstance()->getConnection();  
    }

    // Get all certificates
    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM Certificate");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Get one certificate by ID
    public function getById($id) {
        $stmt = $this->db->prepare("SELECT * FROM Certificate WHERE Id_Certificate = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Insert new certificate
    public function create($Id_admin, $Name_Certificate, $Issued_Date, $Img_Certificate = null) {
        if ($Img_Certificate && $Img_Certificate['error'] === 0) {  
            $img_url = uploadImage($Img_Certificate);  
        } else {
            $img_url = null;  
        }
    
        $stmt = $this->db->prepare("INSERT INTO Certificate (Id_admin, Name_Certificate, Issued_Date, Img_Certificate) VALUES (?, ?, ?, ?)");
        
        if ($stmt->execute([$Id_admin, $Name_Certificate, $Issued_Date, $img_url])) {
            $id = $this->db->lastInsertId(); 
            
            return [
                "id" => $id,
                "Id_admin" => $Id_admin,
                "Name_Certificate" => $Name_Certificate,
                "Issued_Date" => $Issued_Date,
                "Img_Certificate" => $img_url
            ];
        } else {
            return false;  
        }
    }
    
    // Update certificate
    public function update($id, $Name_Certificate, $Issued_Date) {
        $stmt = $this->db->prepare("UPDATE Certificate SET Name_Certificate = ?, Issued_Date = ? WHERE Id_Certificate = ?");
        return $stmt->execute([$Name_Certificate, $Issued_Date, $id]);
    }

    // Delete certificate
    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM Certificate WHERE Id_Certificate = ?");
        return $stmt->execute([$id]);
    }
}
?>
