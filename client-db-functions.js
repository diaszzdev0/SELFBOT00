// Adicione estas funções ao final do script do cliente.html, antes do </script>

// Salvar configurações no banco de dados
async function saveConfigToDatabase() {
  if (!currentUser || !currentUser.key) {
    console.log('Usuário não autenticado');
    return false;
  }

  try {
    const response = await fetch(`/api/config/${currentUser.key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: config.token,
        serverId: config.serverId,
        categoryId: config.categoryId,
        threadMessage: config.threadMessage,
        imageUrl: config.imageUrl,
        useSalaCommand: config.useSalaCommand,
        imapServer: config.imapServer,
        emailUser: config.emailUser,
        emailPass: config.emailPass,
        salasAtivas: config.salasAtivas || 0,
        modosConfig: modosConfig
      })
    });

    if (response.ok) {
      console.log('✓ Configurações salvas no banco de dados');
      return true;
    } else {
      console.error('✗ Erro ao salvar configurações no banco');
      return false;
    }
  } catch (error) {
    console.error('✗ Erro ao conectar com o servidor:', error);
    return false;
  }
}

// Carregar configurações do banco de dados
async function loadConfigFromDatabase() {
  if (!currentUser || !currentUser.key) {
    console.log('Usuário não autenticado');
    return false;
  }

  try {
    const response = await fetch(`/api/config/${currentUser.key}`);
    
    if (response.ok) {
      const savedConfig = await response.json();
      
      if (savedConfig && savedConfig.user_key) {
        // Atualizar config
        config.token = savedConfig.discord_token || '';
        config.serverId = savedConfig.server_id || '';
        config.categoryId = savedConfig.category_id || '';
        config.threadMessage = savedConfig.thread_message || '';
        config.imageUrl = savedConfig.image_url || '';
        config.useSalaCommand = savedConfig.use_sala_command !== false;
        config.imapServer = savedConfig.imap_server || 'imap.gmail.com';
        config.emailUser = savedConfig.email_user || '';
        config.emailPass = savedConfig.email_pass || '';
        config.salasAtivas = savedConfig.salas_ativas || 0;
        
        if (savedConfig.modos_config) {
          modosConfig = savedConfig.modos_config;
        }
        
        // Atualizar campos do formulário
        document.getElementById('discord-token').value = config.token;
        document.getElementById('server-id').value = config.serverId;
        document.getElementById('category-id').value = config.categoryId;
        document.getElementById('thread-message').value = config.threadMessage;
        document.getElementById('image-url').value = config.imageUrl;
        document.getElementById('imap-server').value = config.imapServer;
        document.getElementById('email-user').value = config.emailUser;
        document.getElementById('email-pass').value = config.emailPass;
        
        if (modosConfig.geloNormal) {
          document.getElementById('modo-gelo-normal').value = modosConfig.geloNormal.join(', ');
        }
        if (modosConfig.gelInfinito) {
          document.getElementById('modo-gel-infinito').value = modosConfig.gelInfinito.join(', ');
        }
        
        toggleSalaCommand(config.useSalaCommand);
        const radio = config.useSalaCommand ? 'with-command' : 'without-command';
        document.querySelector(`input[value="${radio}"]`).checked = true;
        
        if (config.salasAtivas) {
          document.getElementById('salas-slider').value = config.salasAtivas;
          updateSalasValue(config.salasAtivas);
          updateSalasList(config.salasAtivas);
        }
        
        console.log('✓ Configurações carregadas do banco de dados');
        addLog('Configurações carregadas do servidor', 'success');
        return true;
      }
    }
  } catch (error) {
    console.error('✗ Erro ao carregar configurações:', error);
  }
  
  return false;
}

// Modificar as funções de salvar para incluir salvamento no banco

// Substituir saveTokenConfig
async function saveTokenConfig() {
  config.token = document.getElementById('discord-token').value.trim();
  config.serverId = document.getElementById('server-id').value.trim();
  config.categoryId = document.getElementById('category-id').value.trim();
  config.threadMessage = document.getElementById('thread-message').value.trim();
  
  const urlInput = document.getElementById('image-url').value.trim();
  if (urlInput) config.imageUrl = urlInput;

  if (!config.token || !config.serverId || !config.categoryId) {
    showToast('Preencha Token, Server ID e Category ID!', 'error');
    addLog('Erro: Campos obrigatórios não preenchidos.', 'error');
    return;
  }

  // Salvar localmente
  localStorage.setItem('cloudSelfbotConfig', JSON.stringify(config));
  
  if (currentUser) {
    const userData = { ...config, user: currentUser.user, key: currentUser.key };
    localStorage.setItem(`cloudSelfbot_${currentUser.key}`, JSON.stringify(userData));
  }
  
  // Salvar no banco de dados
  const saved = await saveConfigToDatabase();
  
  const formatMsg = config.useSalaCommand ? 'com comando !sala' : 'sem comando (direto)';
  
  if (saved) {
    showToast('Token e mensagem salvos no servidor!', 'success');
    addLog(`Token, mensagem e imagem salvos no servidor. Formato: ${formatMsg}`, 'success');
  } else {
    showToast('Salvo localmente (servidor indisponível)', 'info');
    addLog(`Token, mensagem e imagem salvos localmente. Formato: ${formatMsg}`, 'info');
  }
}

// Substituir saveModosConfig
async function saveModosConfig() {
  const geloNormal = document.getElementById('modo-gelo-normal').value.split(',').map(s => s.trim()).filter(s => s);
  const gelInfinito = document.getElementById('modo-gel-infinito').value.split(',').map(s => s.trim()).filter(s => s);
  
  if (!geloNormal.length || !gelInfinito.length) {
    showToast('Cada modo precisa ter pelo menos uma palavra-chave!', 'error');
    return;
  }
  
  modosConfig = { geloNormal, gelInfinito };
  localStorage.setItem('cloudSelfbotModos', JSON.stringify(modosConfig));
  
  // Salvar no banco de dados
  const saved = await saveConfigToDatabase();
  
  if (saved) {
    showToast('Configuração de modos salva no servidor!', 'success');
    addLog('Modos configurados e salvos no servidor: Gelo Normal, Gel Infinito', 'success');
  } else {
    showToast('Configuração salva localmente', 'info');
    addLog('Modos configurados localmente: Gelo Normal, Gel Infinito', 'info');
  }
}

// Substituir saveSalasConfig
async function saveSalasConfig() {
  const qtd = parseInt(document.getElementById('salas-slider').value);
  const auth = JSON.parse(localStorage.getItem('cloudSelfbotAuth') || '{}');
  const maxSalas = parseInt(auth.salas) || 0;

  if (qtd > maxSalas) {
    showToast(`Você só pode usar até ${maxSalas} salas!`, 'error');
    addLog(`Erro: Limite de ${maxSalas} salas excedido.`, 'error');
    return;
  }

  config.salasAtivas = qtd;
  localStorage.setItem('cloudSelfbotConfig', JSON.stringify(config));
  
  if (currentUser) {
    const userData = { ...config, user: currentUser.user, key: currentUser.key };
    localStorage.setItem(`cloudSelfbot_${currentUser.key}`, JSON.stringify(userData));
  }

  // Salvar no banco de dados
  const saved = await saveConfigToDatabase();

  if (saved) {
    showToast(`Configurado para usar ${qtd} salas (salvo no servidor)!`, 'success');
    addLog(`Limite de salas configurado e salvo no servidor: ${qtd}/${maxSalas}`, 'success');
  } else {
    showToast(`Configurado para usar ${qtd} salas (salvo localmente)!`, 'info');
    addLog(`Limite de salas configurado localmente: ${qtd}/${maxSalas}`, 'info');
  }
  
  updateSalasList(qtd);
}

// Substituir saveImapConfig
async function saveImapConfig() {
  config.imapServer = document.getElementById('imap-server').value.trim();
  config.emailUser = document.getElementById('email-user').value.trim();
  config.emailPass = document.getElementById('email-pass').value.trim();

  if (!config.emailUser || !config.emailPass) {
    showToast('Preencha e-mail e senha!', 'error');
    addLog('Erro: Campos IMAP obrigatórios não preenchidos.', 'error');
    return;
  }

  localStorage.setItem('cloudSelfbotConfig', JSON.stringify(config));
  
  if (currentUser) {
    const userData = { ...config, user: currentUser.user, key: currentUser.key };
    localStorage.setItem(`cloudSelfbot_${currentUser.key}`, JSON.stringify(userData));
  }
  
  // Salvar no banco de dados
  const saved = await saveConfigToDatabase();
  
  if (saved) {
    showToast('Configurações IMAP salvas no servidor!', 'success');
    addLog('Configurações IMAP salvas no servidor.', 'success');
  } else {
    showToast('Configurações IMAP salvas localmente', 'info');
    addLog('Configurações IMAP salvas localmente.', 'info');
  }
}

// Modificar checkAuth para carregar do banco
async function checkAuth() {
  const auth = localStorage.getItem('cloudSelfbotAuth');
  if (auth) {
    const data = JSON.parse(auth);
    currentUser = { user: data.user, key: data.key };
    userPlan = data.plan;
    expiryDate = data.expiryDate;
    
    document.getElementById('login-screen').remove();
    updateUserInfo(data);
    addLog(`Sessão restaurada: ${currentUser.user}`, 'info');
    
    // Carregar configurações do banco de dados
    await loadConfigFromDatabase();
  }
}

// Modificar window.addEventListener('load')
window.addEventListener('load', async () => {
  // Tenta sincronizar dados do servidor primeiro
  await syncFromServer();
  await checkAuth();
  
  // Se não carregou do banco, carrega do localStorage
  if (!currentUser || !(await loadConfigFromDatabase())) {
    loadConfig();
    loadModosConfig();
  }
  
  addLog('Painel Cloud SelfBot carregado.', 'success');
});
