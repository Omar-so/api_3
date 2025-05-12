<?php
require BASE_PATH . '/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class MailSender {
    private $from;

    public function __construct($fromEmail) {
        $this->from = $fromEmail;
    }

    public function send($to, $subject, $message) {
        $mail = new PHPMailer(true);
        
        try {
            // Server settings
            $mail->SMTPDebug = 2; // Debug output (set to 0 in production)
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'omargood.game55@gmail.com'; // Your Gmail
            $mail->Password   = 'qiow ozuo rcyy awvj';    // App Password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;

            // Recipients
            $mail->setFrom($this->from);
            $mail->addAddress($to);

            // Content
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = $message;

            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("Mailer Error: " . $e->getMessage());
            return false;
        }
    }
}