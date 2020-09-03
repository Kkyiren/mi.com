<?php
    include("./conn.php");

    $username=$_REQUEST['username'];
    $password=$_REQUEST['password'];
    $phone=$_REQUEST['phone'];
    $country=$_REQUEST['country'];

    $sql = "select * from message where username = '$username'";

    $result = $mysqli->query($sql);

    if($result->num_rows>0){
        echo '{"has":true,"status":false}';
        $mysqli->close();
        die();
    }else{
        $insert = "insert into message (`username`,`password`,`phone`,`country`) values ('$username','$password','$phone','$country')";
        
        $mysqli->query($insert);
        
        $mysqli->close();
        
        echo '{"has":false,"status":true}';
    }
?>