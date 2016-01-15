<?php 

	$dbhost= "localhost";
	$dbuser="root";
	$dbpass="";
	$dbname="mydthiscountdb";


	$conn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
   
    $resultArray = array();
    
    switch($_GET['value']) //registerAccount
    {
		
				CASE 'retrieveSP':
				
                if(!$result = $conn->prepare("CALL proc_spName()"))
                {
                    echo $conn->error;
                }
               $result = $conn->prepare("CALL proc_spName()");
               
                if(!$result->execute())
                {
                    echo $conn->error;
                }
                
                $result->bind_result($spName, $spID, $spImage);  
                       
                while($result->fetch())
                {
	                array_push($resultArray, array(
	                	'$spName'=>$spName,
	                	'$spID'=>$spID,
                        '$spImage' => $spImage
					));
                }
				
                echo json_encode($resultArray);
               
                $result->close();
                break;



                CASE 'retrieveVerify':
                
                if(!$result = $conn->prepare("CALL proc_RetrieveV()"))
                {
                    echo $conn->error;
                }
               $result = $conn->prepare("CALL proc_RetrieveV()");
               
                if(!$result->execute())
                {
                    echo $conn->error;
                }
                
                $result->bind_result($bankName, $firstname, $surname);  
                       
                while($result->fetch())
                {
                    array_push($resultArray, array(
                        '$bankName'=>$bankName,
                        '$firstname'=>$firstname,
                        '$surname' => $surname
                    ));
                }
                
                echo json_encode($resultArray);
               
                $result->close();
                break;

    }

?>

