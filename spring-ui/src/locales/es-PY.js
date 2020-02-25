import login from './es-PY/login';
import user from './es-PY/user';
import group from './es-PY/group';
import department from './es-PY/department';

export default {
	'required-field.validation': 'Este campo es obligatorio.',

	'authentication.failed.message':
		'Autenticación fallida. Por favor verifique su nombre de usuario y contraseña.',
	'error.message': '¡Error al intentar realizar la acción!',

	'menu.account.settings': 'Configuraciones de cuenta',
	'menu.account.logout': 'Salir',

	'loading.message': 'Espera...',

	'form.search.title': 'Buscar',
	'form.clear.button': 'Limpiar',
	'form.search.button': 'Buscar',

	'table.column.action.title': 'Acciones',
	'table.edit.action': 'Editar',
	'table.delete.action': 'Eliminar',
	'table.confirmation.action.message': '¿Estás seguro de eso?',
	'table.between.pagination': 'de',
	'table.total.pagination': 'artículos',

	'title.created-by': 'Creado por',
	'title.date-created': 'Fecha de creación',
	'title.modified-by': 'Modificado por',
	'title.date-modified': 'Fecha de modificación',

	'modal.button.new': 'Nuevo',
	'modal.save.button': 'Guardar',
	'modal.update.button': 'Actualizar',
	'modal.cancel.button': 'Cancelar',

	'placeholder.select-language': 'Seleccionar idioma',
	'placeholder.select-department': 'Seleccionar departamento',
	'placeholder.select-group': 'eleccionar grupo',
	'placeholder.select-groups': 'eleccionar grupos',

	'spanish.language': 'Español',
	'portuguese.language': 'Portugues',

	...login,
	...user,
	...group,
	...department,
};
