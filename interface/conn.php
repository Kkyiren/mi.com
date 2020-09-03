<?php

header('content-type:text/html;charset=utf-8');

$mysql_conf = array(
    'host'=>'localhost:3306',
    'db_user'=>'root',  
    'db_pass'=>'rootroot',
    'db'=>'backstage'
);

$mysqli = @new mysqli($mysql_conf['host'],$mysql_conf['db_user'],$mysql_conf['db_pass']);

if($mysqli->connect_errno){
    // die() 函数 终止代码执行
    die('链接错误'.$mysqli->connect_errno);
}

$mysqli->query('set names utf8');

$select_db = $mysqli->select_db($mysql_conf['db']);

if(!$select_db){
    die('数据库选择错误'.$mysqli->error);
}

?>