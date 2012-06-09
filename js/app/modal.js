/*-------------------- MODAL WINDOWS --------------------*/

function initModal()
{
	/* Modal buttons click */
	$('.modal_btn').live('click',function(e)
	{
		e.preventDefault();
		
		var modal_window = $(this).attr('rel');
		openModal(".modal." + modal_window);
		
		return false;
	});
	
	/* Modal windows's close button click */
	$('.modal .close').live('click', function(e)
	{
		e.preventDefault();
		closeModal($(e.target).closest('.modal'));
		return false;
	});
	
	/* Mask's click (black bg) */
	$('#mask').live('click', function(e)
	{	
		if ($(e.target).attr('id') == "mask")
		{
			closeAllModal();
			return false;
		}
	});
	
	centerAllModal(); // Center all modal windows on the document's ready event
	$(window).resize(centerAllModal); // Center all modal windows on the window resize event
}

function openModal(modal_window)
{	
	modal_window = $(modal_window);
	
	modal_window.trigger('on_open');
	modal_window.children('div').addClass('hidden');
	modal_window.children('div').first().removeClass('hidden');
	modal_window.first().show();
	
	$('#mask').fadeIn(400);
	
	centerAllModal();
}

function closeModal(modal_window)
{	
	modal_window = $(modal_window);
	
	if (modal_window.siblings('.modal:visible').length == 0)
	{
		closeAllModal();
	}
	else
	{
		modal_window.fadeOut(400);
		
		setTimeout(function()
		{
			modal_window.removeErrors().removeClass('error').trigger('on_close');
		}, 400);
	}
}

function closeAllModal()
{
	$('#mask').fadeOut(400);
	
	setTimeout(function()
	{
		$('.modal').hide().trigger('on_close');
	}, 400);
}

function centerAllModal()
{
	$('.modal').each(function(i, e)
	{
		var modal_window = $(e);
		modal_window.css("top", (($(window).height() - modal_window.outerHeight()) / 2 ) + $(window).scrollLeft() + "px");
		modal_window.css("left", (($(window).width() - modal_window.outerWidth()) / 2) + $(window).scrollLeft() + "px");
	});
}
