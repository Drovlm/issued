<?php

header("Access-Control-Allow-Origin:*");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

 $conn = mysqli_connect('localhost','root','','filter');

 $sql = "SELECT * FROM institutes ORDER BY ID DESC";
 $query = mysqli_query($conn,$sql);

 $output = [];  
  
    while($row=mysqli_fetch_assoc($query))
    {
        $output[] = array(  
              "id" => $row['id'],  
							"Institutes" => $row['institutes'], 
						); 
    }

    echo json_encode($output,JSON_PRETTY_PRINT);
    ?>


<?php
  /* header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
   header("Access-Control-Allow-Headers: Content-Type, Authorization, Token, X-Requested-With");
   //  header('Content-Type: image/jpeg'); // Replace 'image/jpeg' with the appropriate image format
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header("Access-Control-Allow-Origin: http://localhost:3003");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, Token, X-Requested-With");
        exit;
    }

    $connect = mysqli_connect("localhost", "root", "", "filter");
    $sql = "SELECT * FROM institutes ORDER BY ID ASC";
    $result = mysqli_query($connect, $sql);
    $json_array = array();
    while($row = mysqli_fetch_assoc($result)) {
        $json_array[] = $row;
    }

    echo json_encode($json_array);*/

?>