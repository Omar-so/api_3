<?php
require_once(BASE_PATH . '/config/database.php');
require_once(BASE_PATH . '/config/cloud.php'); 
class Alumni {
    private $db;

    public function __construct() {
        $this->db = database::getInstance()->getConnection();  
    }

    // Get all alumni
    public function getAll() {
        $stmt = $this->db->query("SELECT COUNT(*) FROM Alumni");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getAllByname($name)
{
    try {
        $pattern = '%' . $name . '%'; 

        $stmt = $this->db->prepare("SELECT * FROM alumni WHERE name LIKE :name");
        $stmt->bindParam(':name', $pattern);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    } catch (PDOException $e) {
        throw new Exception("Error fetching alumni: " . $e->getMessage());
    }
}


    // Get one alumni by ID
    public function getById($id) {
        $stmt = $this->db->prepare("SELECT * FROM Alumni WHERE Id_Alumni = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getByEmail($email) {
        $stmt = $this->db->prepare("SELECT * FROM Alumni WHERE Email_Alumni = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Insert new alumni
    public function create($name, $email, $pass, $job, $Img = null, $dep) {
        if ($Img && $Img['error'] === 0) {  
            $img_url = uploadImage($Img);  
        } else {
            $img_url = null;  
        }
    
        $stmt = $this->db->prepare("INSERT INTO Alumni (Name_Alumni, Email_Alumni, Passwd_Alumni, Job_Alumni, Img_Alumni, Department_Alumni) VALUES (?, ?, ?, ?, ?, ?)");
        
        if ($stmt->execute([$name, $email, $pass, $job, $img_url, $dep])) {
            $id = $this->db->lastInsertId();
    
            return [
                "id" => $id,
                "name" => $name,
                "email" => $email,
                "job" => $job,
                "img_url" => $img_url,
                "department" => $dep
            ];
        } else {
            return false;
        }
    }
    
    // Update alumni
    public function update($id, $name, $email ,$pass, $job) {
        $stmt = $this->db->prepare("UPDATE Alumni SET Name_Alumni = ?, Email_Alumni = ?, Passwd_Alumni = ?, Job_Alumni = ? WHERE Id_Alumni = ?");
        return $stmt->execute([$name, $email, $pass ,$job, $id]);
    }

    // Delete alumni
    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM Alumni WHERE Id_Alumni = ?");
        return $stmt->execute([$id]);
    }

    // Assign a certificate to an alumni
    public function assignCertificateToAlumni($alumniId, $certificateId) {
        $stmt = $this->db->prepare("SELECT * FROM Alumni_Certificate WHERE Id_Alumni = ? AND Id_Certificate = ?");
        $stmt->execute([$alumniId, $certificateId]);
        
        if ($stmt->rowCount() > 0) {
            return false;  
        }

        $stmt = $this->db->prepare("INSERT INTO Alumni_Certificate (Id_Alumni, Id_Certificate) VALUES (?, ?)");
        return $stmt->execute([$alumniId, $certificateId]);  
    }

    // Register alumni for an event
    public function registerForEvent($alumniId, $eventId) {
        $stmt = $this->db->prepare("SELECT * FROM Alumni_Event WHERE Id_Alumni = ? AND Id_Event = ?");
        $stmt->execute([$alumniId, $eventId]);
        
        if ($stmt->rowCount() > 0) {
            return false; 
        }

        $stmt = $this->db->prepare("INSERT INTO Alumni_Event (Id_Alumni, Id_Event) VALUES (?, ?)");
        return $stmt->execute([$alumniId, $eventId]); 
    }

    // Get all events the alumni has participated in
    public function getAllEvents($alumniId) {
        $stmt = $this->db->prepare("SELECT e.* 
                                    FROM Event e
                                    JOIN Alumni_Event ae ON e.Id_Event = ae.Id_Event
                                    WHERE ae.Id_Alumni = ?");
        $stmt->execute([$alumniId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Get all certificates the alumni has collected
    public function getAllCertificates($alumniId) {
        $stmt = $this->db->prepare("SELECT c.* 
                                    FROM Certificate c
                                    JOIN Alumni_Certificate ac ON c.Id_Certificate = ac.Id_Certificate
                                    WHERE ac.Id_Alumni = ?");
        $stmt->execute([$alumniId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


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

    // Alumni creates a comment on a post
    public function createComment($alumniId, $postId, $content) {
        $stmt = $this->db->prepare("INSERT INTO Comment (Id_Alumni, Id_Post, Content_Comment, Created_At_Comment) VALUES (?, ?, ?, NOW())");
        return $stmt->execute([$alumniId, $postId, $content]);
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
