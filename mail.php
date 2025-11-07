<?php

$to = "archilbigvava@gmail.com"; // куда отправлять

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$phone = trim($_POST["phone"]);
$message = trim($_POST["message"]);

$subject = "New message from investment form";

$body = "
Name: $name
Email: $email
Phone: $phone

Message:
$message
";

$domain = preg_replace('/^www\./', '', $_SERVER['SERVER_NAME']); // убираем www

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: SIG <no-reply@$domain>\r\n";
$headers .= "Reply-To: $email\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo "SUCCESS";
} else {
    echo "ERROR";
}
