<?php
    include("./conn.php");

    $sql = "select * from products";

    $res = $mysqli->query($sql);

    $mysqli->close();

    $arr = array();

    while($row = $res->fetch_assoc()){
        // echo $row;
        // die;
        array_push($arr,$row);
    }

    $json = json_encode($arr);

    echo $json;
?>