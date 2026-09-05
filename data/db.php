<?php
// data/db.php - Conexão com SQLite e inicialização do banco

$db_file = __DIR__ . '/upsell.db';

try {
    $pdo = new PDO("sqlite:$db_file");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Criar tabela se não existir
    $pdo->exec("CREATE TABLE IF NOT EXISTS links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        page_id TEXT UNIQUE,
        url TEXT
    )");

    // Inserir links padrões se a tabela estiver vazia
    $stmt = $pdo->query("SELECT COUNT(*) FROM links");
    if ($stmt->fetchColumn() == 0) {
        $default_links = [
            ['inicie', 'https://pay.adheraapp.com/checkout/checkout-1788547593282'],
            ['up1', 'https://buy.stripe.com/14A14p76Nf3H85LdMb3cc07'],
            ['up2', 'https://buy.stripe.com/14A14p76Nf3H85LdMb3cc07'],
            ['up3', 'https://buy.stripe.com/14A14p76Nf3H85LdMb3cc07']
        ];

        $insert_stmt = $pdo->prepare("INSERT INTO links (page_id, url) VALUES (?, ?)");
        foreach ($default_links as $link) {
            $insert_stmt->execute($link);
        }
    }
} catch (PDOException $e) {
    die("Erro ao conectar ao banco de dados: " . $e->getMessage());
}
?>
