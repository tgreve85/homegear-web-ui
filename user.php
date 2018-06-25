<?php
class User
{
    public function __construct()
    {
        ini_set('session.gc_maxlifetime', 5);
        session_start();
    }

    public function checkAuth($redirectToLogin)
    {
        $authorized = (isset($_SESSION["authorized"]) && $_SESSION["authorized"] === true);
        if(!$authorized && $redirectToLogin)
        {
            header("Location: signin.php?url=".$_SERVER["REQUEST_URI"]);
            die("unauthorized");
        }
        return $authorized;
    }

    public function login($username, $password)
    {
        if(hg_auth($username, $password) === true)
        {
            $_SESSION["authorized"] = true;
            $_SESSION["user"] = $username;
            return true;
        }
        return false;
    }

    public function logout()
    {
        if(ini_get("session.use_cookies"))
        {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        session_destroy();
    }
}
?>
