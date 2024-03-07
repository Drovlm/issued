<?php
   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
   header("Access-Control-Allow-Headers: Content-Type, Authorization, Token, X-Requested-With");
   //  header('Content-Type: image/jpeg'); // Replace 'image/jpeg' with the appropriate image format
    
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
    while($row = mysqli_fetch_assoc($result)) {
        $json_array[] = $row;
 
    }
    echo json_encode($json_array);

?>