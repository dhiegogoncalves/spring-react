import login from './pt-BR/login';
import user from './pt-BR/user';
import group from './pt-BR/group';
import department from './pt-BR/department';

export default {
	'required-field.validation': 'Este campo é obrigatório.',

	'authentication.failed.message':
		'Falha na autenticação. Por favor, verifique seu usuário e senha.',
	'error.message': 'Erro ao tentar executar a ação!',

	'menu.account.settings': 'Configurações da conta',
	'menu.account.logout': 'Sair',

	'loading.message': 'Aguarde...',

	'form.search.title': 'Pesquisar',
	'form.clear.button': 'Limpar',
	'form.search.button': 'Pesquisar',

	'table.column.action.title': 'Ações',
	'table.edit.action': 'Editar',
	'table.delete.action': 'Deletar',
	'table.confirmation.action.message': 'Você tem certeza disso?',
	'table.between.pagination': 'de',
	'table.total.pagination': 'itens',

	'title.created-by': 'Criado por',
	'title.date-created': 'Data da criação',
	'title.modified-by': 'Modificado por',
	'title.date-modified': 'Data da modificação',

	'modal.button.new': 'Novo',
	'modal.save.button': 'Salvar',
	'modal.update.button': 'Atualizar',
	'modal.cancel.button': 'Cancelar',

	'placeholder.select-language': 'Seleccione o idioma',
	'placeholder.select-department': 'Selecione o departamento',
	'placeholder.select-group': 'Selecione o grupo',
	'placeholder.select-groups': 'Selecione os grupos',

	'spanish.language': 'Espanhol',
	'portuguese.language': 'Português',

	...login,
	...user,
	...group,
	...department,
};
