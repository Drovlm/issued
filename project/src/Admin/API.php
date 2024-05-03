<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Token, X-Requested-With");

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:3003");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, Token, X-Requested-With");
    exit;
}

$connect = mysqli_connect("localhost", "root", "", "register");

$sql = "SELECT * FROM login ORDER BY ID DESC";
$result = mysqli_query($connect, $sql);

$json_array = array();

while ($row = mysqli_fetch_assoc($result)) {
    if (!empty($row['img'])) {
        $image_data = base64_encode($row['img']);
        $row['img'] = $image_data;
    }
     if (!empty($row['story_image'])) {
        $image_data = base64_encode($row['story_image']);
        $row['story_image'] = $image_data;
    }
    $json_array[] = $row;
}

echo json_encode($json_array);

mysqli_close($connect);
?>