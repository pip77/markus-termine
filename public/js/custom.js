$.fn.toggleAttr = function(attr, attr1, attr2) {
  return this.each(function() {
    var self = $(this);
    if (self.attr(attr) == attr1)
      self.attr(attr, attr2);
    else
      self.attr(attr, attr1);
  });
};

$(document).ready(function() {
		if ($('.create').length){
			$('select').material_select();
		}

		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15 // Creates a dropdown of 15 years to control year
		});

		$('textarea#desc').characterCounter();

		$('.search .chip').click(function() {
			$(this).toggleClass('active');

			if ($(this).parents('.wann').length) {
				$(this).siblings('.chip').removeClass('active');
				$('select.wann option').prop('selected', false);
				$('select.wann option[value="' + $(this).text() + '"]').toggleAttr("selected", "selected", false);
			}

			if ($(this).parents('.was').length) {
				$('select.was option[value="' + $(this).text() + '"]').toggleAttr("selected", "selected", false);
			}
		})
	});