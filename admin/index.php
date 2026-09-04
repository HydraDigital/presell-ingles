<?php
// admin/index.php
session_start();
require_once __DIR__ . '/../data/db.php';

if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: login.php');
    exit;
}

$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        foreach ($_POST['links'] as $page_id => $url) {
            $stmt = $pdo->prepare("UPDATE links SET url = ? WHERE page_id = ?");
            $stmt->execute([$url, $page_id]);
        }
        $success = 'Links atualizados com sucesso!';
    } catch (Exception $e) {
        $error = 'Erro ao atualizar links: ' . $e->getMessage();
    }
}

$stmt = $pdo->query("SELECT * FROM links");
$links = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Admin</title>
    <style>
        body { font-family: sans-serif; background: #f0f2f5; margin: 0; padding: 2rem; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        h1 { margin-top: 0; display: flex; justify-content: space-between; align-items: center; }
        .logout { font-size: 0.8rem; background: #f02849; color: white; padding: 0.5rem 1rem; text-decoration: none; border-radius: 4px; }
        .form-group { margin-bottom: 1.5rem; border-bottom: 1px solid #eee; padding-bottom: 1.5rem; }
        .form-group:last-child { border-bottom: none; }
        label { display: block; margin-bottom: 0.5rem; font-weight: bold; color: #1c1e21; text-transform: uppercase; font-size: 0.8rem; }
        input { width: 100%; padding: 0.75rem; border: 1px solid #dddfe2; border-radius: 4px; box-sizing: border-box; font-family: monospace; }
        button { background: #42b72a; border: none; color: white; padding: 1rem 2rem; font-weight: bold; border-radius: 4px; cursor: pointer; font-size: 1rem; display: block; width: 100%; }
        button:hover { background: #36a420; }
        .success { background: #d4edda; color: #155724; padding: 1rem; border-radius: 4px; margin-bottom: 1.5rem; border: 1px solid #c3e6cb; }
        .error { background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 4px; margin-bottom: 1.5rem; border: 1px solid #f5c6cb; }
    </style>
</head>
<body>
    <div class="container">
        <h1>
            Gerenciar Links
            <a href="logout.php" class="logout">Sair</a>
        </h1>

        <?php if ($success): ?>
            <div class="success"><?php echo $success; ?></div>
        <?php endif; ?>

        <?php if (isset($error) && $error): ?>
            <div class="error"><?php echo $error; ?></div>
        <?php endif; ?>

        <form method="POST">
            <?php foreach ($links as $link): ?>
                <div class="form-group">
                    <label>Página: <?php echo strtoupper($link['page_id']); ?></label>
                    <input type="url" name="links[<?php echo $link['page_id']; ?>]" value="<?php echo htmlspecialchars($link['url']); ?>" required>
                </div>
            <?php endforeach; ?>
            <button type="submit">Salvar Alterações</button>
        </form>
    </div>
</body>
</html>
