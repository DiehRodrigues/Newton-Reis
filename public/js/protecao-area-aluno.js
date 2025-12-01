/**
 * Proteção da Área do Aluno - EMEF Newton Reis
 * Arquivo: protecao-area-aluno.js
 * Versão: 2.0 - Corrigida
 * 
 * Este script deve ser incluído APENAS na página area-aluno.html
 * Protege contra acesso direto via URL
 */

(function() {
    'use strict';

    const SESSION_KEY = 'newton_reis_auth';
    const LOGIN_PAGE = 'login.html';

    /**
     * Redireciona para login com feedback visual
     */
    function redirecionarParaLogin() {
        console.log('🛡️ Acesso negado - redirecionando para login');
        
        // Se DOM não estiver pronto, força redirecionamento imediato
        if (document.readyState === 'loading') {
            window.location.href = LOGIN_PAGE;
            return;
        }
        
        // Se DOM estiver pronto, mostra feedback visual
        if (document.body) {
            document.body.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    color: white;
                    font-family: Arial, sans-serif;
                    text-align: center;
                ">
                    <div>
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🔒</div>
                        <h2>Acesso Restrito</h2>
                        <p>Redirecionando para a página de login...</p>
                    </div>
                </div>
            `;
        }
        
        // Redireciona após breve delay
        setTimeout(() => {
            window.location.href = LOGIN_PAGE;
        }, 1500);
    }

    /**
     * Verifica se o usuário está autenticado
     */
    function verificarAutenticacao() {
        const auth = sessionStorage.getItem(SESSION_KEY);
        
        if (auth !== 'true') {
            redirecionarParaLogin();
            return false;
        }
        
        console.log('✅ Usuário autenticado - acesso permitido');
        return true;
    }

    /**
     * Configura botão de logout
     */
    function configurarLogout() {
        // Aguarda DOM estar pronto
        function tentarConfigurarLogout() {
            const botoesSair = document.querySelectorAll('a[href="index"], .btn-danger');
            
            if (botoesSair.length === 0) {
                // Se não encontrou botões, tenta novamente em 100ms
                setTimeout(tentarConfigurarLogout, 100);
                return;
            }
            
            botoesSair.forEach(botao => {
                if (botao.textContent.toLowerCase().includes('sair')) {
                    botao.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Remove autenticação
                        sessionStorage.removeItem(SESSION_KEY);
                        
                        // Feedback visual
                        botao.innerHTML = '<i class="fa fa-check"></i> Saindo...';
                        
                        // Redireciona
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 800);
                        
                        console.log('🚪 Logout realizado');
                    });
                }
            });
            
            console.log('🔘 Botões de logout configurados');
        }
        
        // Inicia tentativa de configuração
        tentarConfigurarLogout();
    }

    /**
     * Adiciona proteção contra teclas de desenvolvedor (opcional)
     */
    function adicionarProtecaoExtra() {
        // Desabilita F12, Ctrl+Shift+I, etc.
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'J') ||
                (e.ctrlKey && e.key === 'U')) {
                e.preventDefault();
                console.log('🚫 Ação bloqueada');
                return false;
            }
        });

        console.log('🛡️ Proteção extra ativada');
    }

    /**
     * Proteção imediata (executa antes mesmo do DOM)
     */
    function protecaoImediata() {
        // Verifica autenticação imediatamente
        const auth = sessionStorage.getItem(SESSION_KEY);
        
        if (auth !== 'true') {
            // Bloqueia a página imediatamente
            if (typeof window !== 'undefined') {
                // Para qualquer carregamento adicional
                window.stop && window.stop();
                
                // Redireciona imediatamente
                window.location.href = LOGIN_PAGE;
            }
            return false;
        }
        
        return true;
    }

    /**
     * Inicializa a proteção quando DOM estiver pronto
     */
    function inicializarQuandoDOMPronto() {
        console.log('🛡️ Inicializando proteção da área do aluno...');
        
        // Verifica autenticação novamente
        if (!verificarAutenticacao()) {
            return;
        }
        
        // Configura funcionalidades para usuários autenticados
        configurarLogout();
        
        // Proteção extra (opcional)
        adicionarProtecaoExtra();
        
        console.log('✅ Área do aluno protegida com sucesso');
    }

    // EXECUÇÃO IMEDIATA - Proteção antes de qualquer carregamento
    if (!protecaoImediata()) {
        return; // Para a execução se não autenticado
    }

    // Aguarda DOM estar pronto para configurações adicionais
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarQuandoDOMPronto);
    } else {
        // DOM já está pronto
        inicializarQuandoDOMPronto();
    }

    // API pública para a página
    window.AreaAlunoProtegida = {
        logout: function() {
            sessionStorage.removeItem(SESSION_KEY);
            window.location.href = 'index.html';
        },
        
        estaAutenticado: function() {
            return sessionStorage.getItem(SESSION_KEY) === 'true';
        },
        
        forcarVerificacao: function() {
            return verificarAutenticacao();
        }
    };

})();