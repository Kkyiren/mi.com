<?php
    include("./conn.php");

    $username=$_REQUEST['username'];
    $password=$_REQUEST['password'];

    $sql = "select * from message where username = '$username'and password = '$password'";

    $result = $mysqli->query($sql);
    
    $mysqli->close();
    
    if($result->num_rows>0){

        echo '{"has":true,"status":true}';

    }else{

        echo '{"has":false,"status":false}';
    }
?>