/*-------------------- FORMS --------------------*/

function initForms()
{
	$.fn.extend({
		addError: addError,
		addErrors: addErrors,
		removeErrors: removeErrors,
		getPrefix: getPrefix,
		findForm: findForm,
		getVal: getVal,
		setVal: setVal,
	});
	
	/* Form labels click */
	$('label[for]').live('click', function(e)
	{
		var id = $(this).attr('for');
		var field = $("#" + id);
		field.focus();
	});
	
	/* Switch password mode */
	$('.switch_password').live('click', function(e)
	{
		e.preventDefault();
		
		var form = $(this).findForm();		
		var prefix = form.getPrefix();

		var password = form.find(prefix + 'password');
		var password_2 = form.find(prefix + 'password_2');
		
		password.toggleClass('hidden');
		password_2.toggleClass('hidden');
		
		form.find(prefix + 'password:not(.hidden), ' + prefix + 'password_2:not(.hidden)').focus();
		
		if ($(this).text() == 'Показать символы')
		{
			$(this).text('Скрыть символы');
			password_2.val(password.val());
		}
		else
		{
			$(this).text('Показать символы');
			password.val(password_2.val());
		}
		
		$(this).attr('title', $(this).text());
		
		return false;
	});
	
	/* Set selectBox value */
	$('select').live('changed', function(e)
	{
		var field = $(this);
		
		field.selectBox('value', field.val());
	});
	
	/* Text switching on focus and blur events */
	$('form .deftext').live(
	{
		focus: function(e)
		{
			if ($(this).val() == $(this).attr('title'))
			{
				$(this).removeClass('inactive').val('');
			}
		},
		blur: function(e)
		{
			if ( ! $(this).val().length)
			{
				$(this).addClass('inactive').val($(this).attr('title'));
			}
		}
	});
}

function addError(field, text)
{
	var form = $(this);
	var field_id;
	
	if (field == "message")
		field_id = form.getPrefix() + "login" + "," + form.getPrefix() + "password" + "," + form.getPrefix() + "password_2";
	if (field == "password")
		field_id = form.getPrefix() + "password" + "," + form.getPrefix() + "password_2";	
	else
		field_id = form.getPrefix() + field;
	
	$(field_id).addClass("error");
	
	if ($('.errors', form).length)
		$('.errors', form).append('<p>' + text + '</p>');
	else
		form.prepend('<div class="errors"><p>' + text + '</p></div>');
	
	centerAllModal();
	
	if ( ! $(this).parents('.wrapper.landing').length)
		addMessage('error', text);
	
	return form;
}

function addErrors(json)
{
	var form = $(this);

	for (var p in json.data)
	{
		if (json.data.hasOwnProperty(p))
		{
			form.addError(p, json.data[p]);
		}
	}

	return form;
}

function removeErrors()
{
	var form = $(this);
	
	form.find('.errors').remove();
	form.find('.error').removeClass('error');
	
	return form;
}

function findForm()
{
	var form;
	var base = $(this);
	
	if (base[0].nodeName.toLowerCase() != 'form')
		form = $(base).find('form');
	
	if (form != undefined)
	{
		if ( ! form.length)
			form = $(base).closest('form');
	}
	else
		form = $(base);
		
	return form;
}

function getPrefix()
{
	var form = $(this).findForm();
	
	var prefix = form.attr('id').split('_');
	prefix.pop();
	prefix = "#" + prefix.join('_') + "_";
	
	return prefix;
}

function getVal(field)
{
	var form = $(this);
	var prefix = form.getPrefix();
	var value = $(prefix + field, form).val();
	
	if (field == 'password' && !value)
		value = $(prefix + field + "_2", form).val();
	
	if ( ! value)
		value = '';
		
	return value;
}

function setVal(field, value)
{
	var form = $(this);
	var prefix = form.getPrefix();
	var field = $(prefix + field);
	
	field.trigger('change');
	
	field.val(value);
	
	field.trigger('changed');

	return form;
}
