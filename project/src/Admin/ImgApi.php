<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Token, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "register";

$connect = mysqli_connect($servername, $username, $password, $dbname);
if ($connect->connect_error) {
    die("Connection failed: " . $connect->connect_error);
}

$sql = "SELECT story_image FROM login ORDER BY ID DESC";
$result = $connect->query($sql);

$imageData = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        if (!empty($row['img'])) {
            $img = $row["img"];
            $imageData[] = base64_encode($img);
        }
    }
}
echo json_encode($imageData);
?>

<?php
/*if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        if (!empty($row['img'])) {
        $img = $row["img"];
        echo '<img src="data:image/jpeg;base64,' .base64_encode($img) . '">';
    }}
}



if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        if (!empty($row['img'])) {
            $img = $row["img"];
            header('Content-Type: image/jpeg');
            echo $img;
        }
    }
}

mysqli_close($connect);






$images = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        if (!empty($row['img'])) {
            $img = $row["img"];
            $images[] = [
                'img' => base64_encode($img)
            ];
        }
    }
}
echo json_encode($images);*/
?>


<?php
/*header("Access-Control-Allow-Origin: *");
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
?>*/
