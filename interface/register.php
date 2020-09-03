<?php
    include('./conn.php');

    $phone = $_REQUEST['phone'];

    $sql = "select * from message where phone = $phone";

    $res = $mysqli->query($sql);

    $mysqli->close();

    if($res->num_rows){
        echo '{"has":true}';
    }else{
        echo '{"has":false}';
    }
?>