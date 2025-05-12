<?php
require_once(BASE_PATH . '/config/database.php');
require_once(BASE_PATH . '/config/cloud.php'); 
class Alumni {
    private $db;

    public function __construct() {
        $this->db = database::getInstance()->getConnection();  
    }

    

public function createGroup($alumniId, $name, $type) {
    $stmt = $this->db->prepare("INSERT INTO `Group` (Id_Alumni, Name_Group, Type_Group) VALUES (?, ?, ?)");
    return $stmt->execute([$alumniId, $name, $type]);
}

// Alumni deletes a group
public function deleteGroup($alumniId, $groupId) {
    $stmt = $this->db->prepare("SELECT Id_Alumni FROM `Group` WHERE Id_Group = ?");
    $stmt->execute([$groupId]);
    $group = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($group && $group['Id_Alumni'] == $alumniId) {
        $deleteStmt = $this->db->prepare("DELETE FROM `Group` WHERE Id_Group = ?");
        $deleteStmt->execute([$groupId]);

        $deleteParticipateStmt = $this->db->prepare("DELETE FROM Participate WHERE Id_Group = ?");
        $deleteParticipateStmt->execute([$groupId]);

        return true;
    }

    return false;
}

// Alumni participates in a group
public function participateInGroup($alumniId, $groupId) {
    $stmt = $this->db->prepare("SELECT * FROM Participate WHERE Id_Alumni = ? AND Id_Group = ?");
    $stmt->execute([$alumniId, $groupId]);
    $existingParticipation = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$existingParticipation) {
        $stmt = $this->db->prepare("INSERT INTO Participate (Id_Alumni, Id_Group) VALUES (?, ?)");
        return $stmt->execute([$alumniId, $groupId]);
    }

    return false; 
}

public function exitGroup($alumniId, $groupId) {
    $stmt = $this->db->prepare("SELECT * FROM Participate WHERE Id_Alumni = ? AND Id_Group = ?");
    $stmt->execute([$alumniId, $groupId]);
    $existingParticipation = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingParticipation) {
        $deleteStmt = $this->db->prepare("DELETE FROM Participate WHERE Id_Alumni = ? AND Id_Group = ?");
        return $deleteStmt->execute([$alumniId, $groupId]);
    }

    return false;
}

public function showGroupMembers($groupId) {
    $stmt = $this->db->prepare("SELECT a.Id_Alumni, a.Name_Alumni, a.Email_Alumni 
                                FROM Alumni a
                                JOIN Participate p ON a.Id_Alumni = p.Id_Alumni
                                WHERE p.Id_Group = ?");
    $stmt->execute([$groupId]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC); 
}
public function submitFeedback($idalumni , $content) {
    $stmt = $this->db->prepare("INSERT INTO Feedback (Id_Alumni, Content_Feedback, Submitted_At_Feedback) 
                                VALUES (?, ?, NOW())");
    return $stmt->execute([ $idalumni , $content]);
}

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

function getAllGroups() {
    try {
        $stmt = $this->db->prepare("SELECT * FROM `Group`"); 
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


