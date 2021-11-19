<?php
   // echo 1;
   
    $py_function = $_GET['func'];

    if(!isset($_GET['passVar']))
    {
        $passVar = " ";

    }
    else
    {
        $passVar = $_GET['passVar'];

    }


    if(!isset($_GET['cipher']))
    {
        $passDict = " " ;

    }
    else
    {
        $passDict = " {dict} " . $_GET['cipher'] . " {dict}";
    }

    $route = "python " . $py_function ." ";
    $pass_route = $route . $passVar. $passDict;
    //echo $pass_route;
    $command = escapeshellcmd($pass_route);
    $output = shell_exec($command);
    echo $output;
?>