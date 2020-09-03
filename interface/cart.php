<?php
    include('./conn.php');

    $idlist = $_REQUEST['idlist'];

    $sql = "select * from products where id in ($idlist)";

    $res = $mysqli->query($sql);

    $mysqli->close();

    $arr = array();

    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    $json = json_encode($arr);

    echo $json;
?>