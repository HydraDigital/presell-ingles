<?php
// admin/login.php
session_start();

if (isset($_SESSION['admin_logged_in'])) {
    header('Location: index.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = $_POST['user'] ?? '';
    $pass = $_POST['pass'] ?? '';

    if ($user === 'admin' && $pass === 'admin123') {
        $_SESSION['admin_logged_in'] = true;
        header('Location: index.php');
        exit;
    } else {
        $error = 'Usuário ou senha inválidos.';
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Admin</title>
    <style>
        body { font-family: sans-serif; background: #f0f2f5; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .login-card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
        h1 { text-align: center; margin-bottom: 1.5rem; color: #1c1e21; }
        .form-group { margin-bottom: 1rem; }
        label { display: block; margin-bottom: 0.5rem; color: #4b4f56; }
        input { width: 100%; padding: 0.75rem; border: 1px solid #dddfe2; border-radius: 4px; box-sizing: border-box; }
        button { width: 100%; padding: 0.75rem; background: #1877f2; border: none; color: white; font-weight: bold; border-radius: 4px; cursor: pointer; font-size: 1rem; }
        button:hover { background: #166fe5; }
        .error { color: #fa3e3e; text-align: center; margin-bottom: 1rem; }
    </style>
</head>
<body>
    <div class="login-card">
        <h1>Painel Admin</h1>
        <?php if ($error): ?>
            <div class="error"><?php echo $error; ?></div>
        <?php endif; ?>
        <form method="POST">
            <div class="form-group">
                <label>Usuário</label>
                <input type="text" name="user" required>
            </div>
            <div class="form-group">
                <label>Senha</label>
                <input type="password" name="pass" required>
            </div>
            <button type="submit">Entrar</button>
        </form>
    </div>
</body>
</html>
