<?php
require_once("user.php");

$loginFailed = false;
if(isset($_POST["username"]) && isset($_POST["password"]) && $_POST["username"] && $_POST["password"])
{
  $user = new User();
  if($user->login($_POST["username"], $_POST["password"]))
  {
    header("Location: index.php");
  }
  else $loginFailed = true;
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Homegear UG">

    <title>Bitte anmelden</title>

    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/signin.css" rel="stylesheet">
  </head>

  <body>
    <div class="container">
      <form role="form" class="form-signin" action="<?PHP print $_SERVER["PHP_SELF"]; ?>" method="post">
        <?php if($loginFailed) print "<div class=\"alert alert-danger\" role=\"alert\">Wrong username or password.</div>"; ?>
        <h2 class="form-signin-heading">Bitte anmelden</h2>
        <input type="hidden" name="url" value="<?php if(isset($_GET['url'])) print $_GET['url']; ?>" />
        <div class="form-group">
          <label for="inputUser" class="sr-only">Username</label>
          <input type="user" id="inputUser" name="username" class="form-control" placeholder="Username" required autofocus>
        </div>
        <div class="form-group">
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">login</button>
      </form>

    </div>
    <script src="js/jquery.2.1.4.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
  </body>
</html>
