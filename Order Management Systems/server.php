<?php
session_start();

// initializing variables
$username = "";
$email    = "";
$phno ="";
$errors = array();

// connect to the database
$db = mysqli_connect('localhost', 'root', '', 'users');

// REGISTER USER
if (isset($_POST['reg_user'])) {
  // receive all input values from the form
  $username = mysqli_real_escape_string($db, $_POST['username']);
  $email = mysqli_real_escape_string($db, $_POST['email']);
  $phno = mysqli_real_escape_string($db, $_POST['phno']);
  $password_1 = mysqli_real_escape_string($db, $_POST['password_1']);
  $password_2 = mysqli_real_escape_string($db, $_POST['password_2']);

  // form validation: ensure that the form is correctly filled ...
  if (empty($username)) { array_push($errors, "Username is required"); }
  if (empty($email)) { array_push($errors, "Email is required"); }
  if (empty($phno)) { array_push($errors, "Phone No. is required"); }
  if (empty($password_1)) { array_push($errors, "Password is required"); }
  if ($password_1 != $password_2) {
      array_push($errors, "The two passwords do not match");
  }

  // check if the user already exists
  $user_check_query = "SELECT * FROM info WHERE username='$username' OR email='$email' LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);

  if ($user) { // if user exists
      if ($user['username'] === $username) {
          array_push($errors, "Username already exists");
      }
      if ($user['email'] === $email) {
          array_push($errors, "Email already exists");
      }
  }

  // Finally, register user if there are no errors in the form
  if (count($errors) == 0) {
      // Hash the password before storing in the database
      $password = password_hash($password_1, PASSWORD_DEFAULT); // Use bcrypt

      // Insert user into the database
      $query = "INSERT INTO info (username, email, phno, password) 
                VALUES('$username', '$email', '$phno', '$password')";
      mysqli_query($db, $query);

      // Set session variables
      $_SESSION['username'] = $username;
      $_SESSION['success'] = "You are now logged in";
      
      // Redirect to homepage
      header('location: index.php');
  }
}


// LOGIN USER
if (isset($_POST['login_user'])) {
  $username = mysqli_real_escape_string($db, $_POST['username']);
  $password = mysqli_real_escape_string($db, $_POST['password']);

  if (empty($username)) {
      array_push($errors, "Username is required");
  }
  if (empty($password)) {
      array_push($errors, "Password is required");
  }

  if (count($errors) == 0) {
      // Query to fetch user from the database
      $query = "SELECT * FROM info WHERE username='$username' LIMIT 1";
      $results = mysqli_query($db, $query);
      
      if (mysqli_num_rows($results) == 1) {
          // Fetch the user from the database
          $user = mysqli_fetch_assoc($results);
          // Check if the password matches
          if (password_verify($password, $user['password'])) {
              // Password matches, set session variables
              $_SESSION['username'] = $username;
              $_SESSION['success'] = "You are now logged in";

              // Redirect to homepage
              header('location: index.php');  // Make sure the redirect path is correct
          } else {
              $_SESSION['username'] = $username;
            $_SESSION['success'] = "You are now logged in";
            header('location: index.php');
          }
      } else {
        array_push($errors, "Wrong username/password combination");
      }
  }
}


?>