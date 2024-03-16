<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Token, X-Requested-With");
header('Content-Type: image/jpeg');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:3003");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, Token, X-Requested-With");
    exit;
}

$connect = mysqli_connect("localhost", "root", "", "register");

$sql = "SELECT * FROM login ORDER BY ID DESC";
$result = mysqli_query($connect, $sql);

if (!$result) {
    die('Error: ' . mysqli_error($connect));
}

$imageData = '';

while ($row = mysqli_fetch_assoc($result)) {
    if (!empty($row['img'])) {
        $imageData .= $row['img'];
    } 
}

echo $imageData;

mysqli_close($connect);
?>
