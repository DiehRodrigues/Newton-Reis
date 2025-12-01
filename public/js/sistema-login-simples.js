/**
 * Sistema de Login Simples - EMEF Newton Reis
 * Arquivo: sistema-login-simples.js
 * Versão: 3.0 - Com Footer Dinâmico
 * 
 * Sistema sem modal, com proteção real:
 * - Navbar dinâmica 
 * - Footer dinâmico
 * - Página de login dedicada
 * - Proteção real na área do aluno
 */

(function() {
    'use strict';

    // Configurações centralizadas
    const CONFIG = {
        senhaPadrao: 'aluno2025',
        paginaLogin: 'login.html',
        paginaAreaAluno: 'area-aluno.html',
        sessionKey: 'newton_reis_auth',
        escola: {
            nome: 'Newton Reis',
            nomeCompleto: 'EMEF Newton Reis',
            endereco: 'R. José Alexandre Machado, 22 - Jardim Silva Teles, São Paulo - SP, 08160-460',
            telefone: '(11) 2561-7361',
            email: 'emefnreis@sme.prefeitura.sp.gov.br'
        }
    };

    // Template da Navbar
    const NAVBAR_TEMPLATE = `
        <div class="container-fluid p-0">
            <nav class="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
                <a href="index.html" class="navbar-brand ml-lg-3">
                    <h1 class="m-0 text-uppercase text-primary">
                        <i class="fa fa-school mr-3"></i>${CONFIG.escola.nome}
                    </h1>
                </a>
                <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
                    <div class="navbar-nav mx-auto py-0">
                        <a href="index.html" class="nav-item nav-link" id="nav-inicio">Início</a>
                        <a href="about.html" class="nav-item nav-link" id="nav-sobre">Sobre a escola</a>
                        <a href="contact.html" class="nav-item nav-link" id="nav-contato">Contato</a>
                        <a href="protagonismo-estudantil.html" class="nav-item nav-link" id="nav-protagonismo">Protagonismo estudantil</a>
                    </div>
                    <a href="${CONFIG.paginaLogin}" class="btn btn-primary py-2 px-4 d-none d-lg-block">Área do Aluno</a>
                </div>
            </nav>
        </div>
    `;

    // Template do Footer
    const FOOTER_TEMPLATE = `
        <!-- Footer Start -->
        <div class="container-fluid position-relative overlay-top bg-dark text-white-50 py-5" style="margin-top: 90px;">
            <div class="container mt-5 pt-5">
                <div class="row">
                    <div class="col-md-12 mb-5">
                        <a href="index.html" class="navbar-brand">
                            <h1 class="mt-n2 text-uppercase text-white"><i class="fa fa-school mr-3"></i>${CONFIG.escola.nomeCompleto}</h1>
                        </a>
                        <p class="m-0">Escola Municipal de Ensino Fundamental comprometida com a educação de qualidade e o
                            desenvolvimento integral dos nossos alunos. Nossos valores são: respeito, inclusão, excelência
                            acadêmica e cidadania.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 mb-5">
                        <h3 class="text-white mb-4">Entre em Contato</h3>
                        <p><i class="fa fa-map-marker-alt mr-2"></i>${CONFIG.escola.endereco}</p>
                        <p><i class="fa fa-phone-alt mr-2"></i>${CONFIG.escola.telefone}</p>
                        <p><i class="fa fa-envelope mr-2"></i>${CONFIG.escola.email}</p>
                    </div>
                    <div class="col-md-4 mb-5">
                        <h3 class="text-white mb-4">Protagonismo Estudantil</h3>
                        <div class="d-flex flex-column justify-content-start">
                            <a class="text-white-50 mb-2" href="sites-tematicos.html"><i class="fa fa-angle-right mr-2"></i>Criação de sites</a>
                            <a class="text-white-50 mb-2" href="robotica.html"><i class="fa fa-angle-right mr-2"></i>Robótica</a>
                            <a class="text-white-50 mb-2" href="criacao-jogos.html"><i class="fa fa-angle-right mr-2"></i>Criação de Jogos</a>
                            <span class="text-white-50 mb-2"><i class="fa fa-angle-right mr-2"></i>Clube de Leitura</span>
                            <span class="text-white-50 mb-2"><i class="fa fa-angle-right mr-2"></i>Xadrez</span>
                            <span class="text-white-50"><i class="fa fa-angle-right mr-2"></i>Dança</span>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <h3 class="text-white mb-4">Links Rápidos</h3>
                        <div class="d-flex flex-column justify-content-start">
                            <a class="text-white-50 mb-2" href="index.html"><i class="fa fa-angle-right mr-2"></i>Início</a>
                            <a class="text-white-50 mb-2" href="about.html"><i class="fa fa-angle-right mr-2"></i>Sobre a
                                escola</a>
                            <a class="text-white-50" href="contact.html"><i class="fa fa-angle-right mr-2"></i>Contato</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid bg-dark text-white-50 border-top py-4"
            style="border-color: rgba(256, 256, 256, .1) !important;">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 text-center text-md-left mb-3 mb-md-0">
                        <p class="m-0">Copyright &copy; <a class="text-white" href="#">${CONFIG.escola.nomeCompleto}</a>. Todos os
                            direitos reservados.
                        </p>
                    </div>
                    <div class="col-md-6 text-center text-md-right">
                        <p class="m-0">Secretaria Municipal de Educação de São Paulo</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer End -->
    `;

    /**
     * Funções de Autenticação
     */
    const Auth = {
        estaLogado: function() {
            const auth = sessionStorage.getItem(CONFIG.sessionKey);
            return auth === 'true';
        },

        login: function() {
            sessionStorage.setItem(CONFIG.sessionKey, 'true');
            console.log('✅ Login realizado');
        },

        logout: function() {
            sessionStorage.removeItem(CONFIG.sessionKey);
            console.log('🚪 Logout realizado');
        },

        protegerPagina: function() {
            if (!this.estaLogado()) {
                console.log('🛡️ Acesso negado - redirecionando para login');
                window.location.href = CONFIG.paginaLogin;
            }
        }
    };

    /**
     * Cria navbar dinâmica
     */
    function criarNavbar() {
        if (document.querySelector('nav.navbar')) {
            console.log('⚠️ Navbar já existe, pulando criação');
            return;
        }

        const navbarContainer = document.createElement('div');
        navbarContainer.innerHTML = NAVBAR_TEMPLATE;
        
        document.body.insertBefore(navbarContainer.firstElementChild, document.body.firstChild);
        
        console.log('✅ Navbar criada dinamicamente');
    }

    /**
     * Cria footer dinâmico
     */
    function criarFooter() {
        // Verifica se já existe footer
        if (document.querySelector('.container-fluid.bg-dark')) {
            console.log('⚠️ Footer já existe, pulando criação');
            return;
        }

        const footerContainer = document.createElement('div');
        footerContainer.innerHTML = FOOTER_TEMPLATE;
        
        // Insere o footer antes do último script ou no final do body
        const scripts = document.querySelectorAll('script');
        const lastScript = scripts[scripts.length - 1];
        
        if (lastScript) {
            document.body.insertBefore(footerContainer.firstElementChild, lastScript);
            document.body.insertBefore(footerContainer.firstElementChild, lastScript);
        } else {
            document.body.appendChild(footerContainer.firstElementChild);
            document.body.appendChild(footerContainer.firstElementChild);
        }
        
        console.log('✅ Footer criado dinamicamente');
    }

    /**
     * Marca página ativa na navbar
     */
    function marcarPaginaAtiva() {
        const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
        
        document.querySelectorAll('.nav-item.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        const mapeamento = {
            'index.html': 'nav-inicio',
            '': 'nav-inicio',
            'about.html': 'nav-sobre',
            'contact.html': 'nav-contato',
            'protagonismo-estudantil.html': 'nav-protagonismo'
        };

        const navId = mapeamento[paginaAtual];
        if (navId) {
            const linkAtivo = document.getElementById(navId);
            if (linkAtivo) {
                linkAtivo.classList.add('active');
                console.log(`📍 Página ativa: ${paginaAtual}`);
            }
        }
    }

    /**
     * Configura página de LOGIN
     */
    function configurarPaginaLogin() {
        const loginForm = document.getElementById('loginForm');
        const senhaInput = document.getElementById('senha');
        const btnLogin = document.getElementById('btnLogin');
        const loginError = document.getElementById('loginError');

        if (!loginForm) return; // Não está na página de login

        function mostrarErro(mensagem) {
            loginError.textContent = mensagem;
            loginError.style.display = 'block';
            senhaInput.classList.add('is-invalid');
            
            setTimeout(() => {
                loginError.style.display = 'none';
                senhaInput.classList.remove('is-invalid');
            }, 3000);
        }

        function validarLogin() {
            const senha = senhaInput.value.trim().toLowerCase();
            
            if (!senha) {
                mostrarErro('Por favor, digite a senha');
                return;
            }

            if (senha === CONFIG.senhaPadrao) {
                Auth.login();
                
                senhaInput.classList.add('is-valid');
                btnLogin.innerHTML = '<i class="fa fa-check"></i> Entrando...';
                btnLogin.disabled = true;
                
                setTimeout(() => {
                    window.location.href = CONFIG.paginaAreaAluno;
                }, 800);
                
            } else {
                mostrarErro('Senha incorreta');
                senhaInput.value = '';
                senhaInput.focus();
            }
        }

        // Event listeners
        btnLogin.addEventListener('click', validarLogin);
        
        senhaInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                validarLogin();
            }
        });

        senhaInput.addEventListener('input', function() {
            loginError.style.display = 'none';
            this.classList.remove('is-invalid', 'is-valid');
        });

        senhaInput.focus();
    }

    /**
     * Configura página ÁREA DO ALUNO (proteção)
     */
    function configurarAreaAluno() {
        const paginaAtual = window.location.pathname.split('/').pop();
        
        if (paginaAtual === CONFIG.paginaAreaAluno || paginaAtual === 'area-aluno.html') {
            Auth.protegerPagina();
            
            const btnSair = document.querySelector('a[href="index"], .btn-danger');
            if (btnSair && btnSair.textContent.includes('Sair')) {
                btnSair.addEventListener('click', function(e) {
                    e.preventDefault();
                    Auth.logout();
                    window.location.href = 'index.html';
                });
            }
        }
    }

    /**
     * Remove elementos duplicados do HTML original
     */
    function limparElementosDuplicados() {
        // Remove navbar manual se existir
        const navbarManual = document.querySelector('nav.navbar');
        if (navbarManual && navbarManual.innerHTML.includes('manual')) {
            navbarManual.remove();
        }
        
        // Remove footer manual se existir
        const footerManual = document.querySelector('.footer-manual');
        if (footerManual) {
            footerManual.remove();
        }
    }

    /**
     * Inicializa o sistema
     */
    function inicializar() {
        console.log('🚀 Inicializando sistema completo (navbar + footer + login)...');

        const paginaAtual = window.location.pathname.split('/').pop();
        
        // Não cria navbar/footer na área do aluno e página de login
        if (paginaAtual !== 'area-aluno.html' && paginaAtual !== 'login.html') {
            limparElementosDuplicados();
            criarNavbar();
            criarFooter();
            marcarPaginaAtiva();
        }

        // Configura funcionalidades específicas da página
        configurarPaginaLogin();
        configurarAreaAluno();

        console.log('✅ Sistema completo carregado com sucesso');
    }

    /**
     * API pública para configurações
     */
    window.SistemaEscola = {
        alterarSenha: function(novaSenha) {
            CONFIG.senhaPadrao = novaSenha.toLowerCase();
            console.log('🔑 Senha alterada');
        },
        
        alterarDadosEscola: function(dadosEscola) {
            Object.assign(CONFIG.escola, dadosEscola);
            console.log('🏫 Dados da escola atualizados');
        },
        
        logout: function() {
            Auth.logout();
            window.location.href = 'index.html';
        },
        
        estaLogado: function() {
            return Auth.estaLogado();
        },

        recriarNavbarFooter: function() {
            // Remove elementos atuais
            const navbar = document.querySelector('nav.navbar');
            const footer = document.querySelector('.container-fluid.bg-dark');
            
            if (navbar) navbar.remove();
            if (footer) footer.remove();
            
            // Recria com novos dados
            criarNavbar();
            criarFooter();
            marcarPaginaAtiva();
            
            console.log('🔄 Navbar e Footer recriados');
        }
    };

    // Aguarda DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializar);
    } else {
        inicializar();
    }

})();