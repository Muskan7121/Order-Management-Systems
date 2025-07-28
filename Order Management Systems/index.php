<!DOCTYPE html>
<html>
<head>
	<title>Restaurant Billing System</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="style.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">

</head>
<body>
	<header>
		<h1> Restaurant Billing System</h1>
		<a href="login.php?logout='1'" class="btn">Logout</a>
	</header>

	<div class="container">
		<div class="left-column">
			<h2 class ="table" >Tables</h2>
            <div>
                <input type="text" placeholder="Search" class="search-input" id ="search-bar-table"  onkeyup="searchFunTable()">
            </div>
            <div class="block-container" id="content-table">
            <!-- table content -->
              
            </div>
		</div>
		<div class="right-column">
			<h2 class = "menu">Menu</h2>
            <div>
                <input type="text" placeholder="Search" class="search-input" id="search-bar-menu" onkeyup="searchFunMenu()">
            </div >
            <div class="block-container" id="content-menu">
              <!-- Menu content  -->
              
            </div>
          
		</div>
		</div>
	<script src="script.js"></script>
</body>
</html>
