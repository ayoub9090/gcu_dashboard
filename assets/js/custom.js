/* ------------------------------------------------------------------------------
*
*  # Custom JS code
*
*  Place here all your custom js. Make sure it's loaded after app.js
*
* ---------------------------------------------------------------------------- */
function restructureTheTitle(){
  if($(window).width() < 768){
    var page_title = $('.page-title h5 > i').clone();
    $('.page-title h5 > i').remove();
    $('.page-title h5 > span').prepend(page_title)
  }
}
restructureTheTitle();

$('#replace-1').click(function(){
  if($(this).parents('.replace-width').hasClass('col-md-3')){
    $(this).parents('.replace-width').addClass('col-md-9');
    $(this).parents('.replace-width').removeClass('col-md-3');
    $('#replace-2').parents('.replace-width').removeClass('col-md-9').addClass('col-md-3');
  }else{
    $(this).parents('.replace-width').addClass('col-md-3');
    $(this).parents('.replace-width').removeClass('col-md-9');
    $('#replace-2').parents('.replace-width').removeClass('col-md-3').addClass('col-md-9');
  }
})
$('#replace-2').click(function(){
  if($(this).parents('.replace-width').hasClass('col-md-3')){
    $(this).parents('.replace-width').addClass('col-md-9');
    $(this).parents('.replace-width').removeClass('col-md-3');
    $('#replace-1').parents('.replace-width').removeClass('col-md-9').addClass('col-md-3');
  }else{
    $(this).parents('.replace-width').addClass('col-md-3');
    $(this).parents('.replace-width').removeClass('col-md-9');
    $('#replace-1').parents('.replace-width').removeClass('col-md-3').addClass('col-md-9');
  }
})
function toggleClasses(e){
$('#replace-2').removeClass('col-md-9').addClass('col-md-3');


}
if($('.big-table').length > 0){
  $('.big-table').css('max-width',$('.big-table').outerWidth(true))
}
function activationRadio(){
  $('.activ-disactive').each(function(){
    if ($(this).find('input[type="radio"]').is(':checked')){

      $(this).find('input[type!="radio"]').prop('disabled',false);
      $(this).find('select').prop('disabled',false);
    }else{
      $(this).find('input[type!="radio"]').prop('disabled',true);
      $(this).find('select').prop('disabled',true);
    }
  })
}
$('.activ-disactive').click(function(){
  activationRadio()
})
activationRadio()
function editRoleGroup(e){
  $('.disabled').removeClass('disabled');
  $('[disabled]').prop('disabled',false);
  $('[readonly]').prop('readonly',false);
  $(e).parents('.edt-tbl-opt').removeClass('active')
}
function appendPopUpInfo(){
  if($('.has-info').length > 0){
    $('.has-info').each(function (index){
      if($(this).children().length < 1){
        $(this).append('<a href="#" data-toggle="modal"  data-target="#info_popup" class="ml-2 d-inline-block" title="Group Permission" class="tool-tip"  data-placement="top" data-popup="tooltip" ><i class="icon-exclamation"><\/i><\/a>')
      }
    })
  }
}
appendPopUpInfo()

function addFilters(e){
  filter_count= $('.filter').length;
  filter_row = e.parents('.filter').clone();
  all_filters = e.parents('.filters-parent');
  $(filter_row).find('.and-or').removeClass('hide');
  $(filter_row).find('.filter-option').remove();
  $(filter_row).find('.and-or input[type="radio"]').each(function(){
    var old_name = $(this).attr('name');
    $(this).attr('name',String(old_name+'-'+filter_count))
  });
  filter_row.insertBefore(all_filters.find('.filter').last())
}
//hide the info box for the active tab content on RENTAL SERCIVE
$(document).on('click', '.section-info button.close', function(e) {
  e.preventDefault();
  $(this)
  .parent()
  .slideUp();
});
//Show the info box for the active tab content on RENTAL SERCIVE
$(document).on('click', '.show-section-info', function(e) {
  e.preventDefault();
  $(this).parent().parent().find(".section-info").slideDown();
});

$(document).on('change', 'input[name="applyGCU"]', function() {
  var data_rel = $(this).attr("data-el");
  if (typeof data_rel !== typeof undefined && data_rel !== false) {
    // Element has this attribute
    if ($(this).is(":checked") && $(this).hasClass("related-input")) {
      $("." + data_rel).slideDown();
    }
  } else {
    $(".applyGCU-el").slideUp();
  }
});

$(document).on('click', '.toggleEditMode', function() {
  $(this).parent("div").find(".toggled_action").toggleClass("show-toggled_action");
});

$(document).on("click", ".toggled_action .edit", function() {
  if (!$(this).parents("tr").hasClass("inEditMode")) {
    $(this).parents("tr").addClass("inEditMode");
    $(this).parents("tr").find(".toggled_action").toggleClass("show-toggled_action");
    $(this).parents("tr").find("input,select,textarea").prop("disabled", false);
  }
});

$(document).on("click", ".addRow .save_editable_mode", function(e) {
  var warning_msg =
  '<p class="warning-msg text-danger-600 ">modifying any value will affect future transactions only , old transaction will remain associated with the old value registered at rental contract creation time</P>';
  var new_row = $(this).parents().eq(1).clone().removeClass("addRow").addClass("new-row");

  var edit_column =
  '<div class="toggle_table_icon"><a href="javascript:void(0)" class="toggleEditMode"><i class="fas fa-ellipsis-h mr-3 fa-2x"></i></a><div class="inEditModeAction"><a class="save_editable_mode" title="save" href="javascript:void(0)"><i class="icon-floppy-disk mr-1 fa-2x"></i></a><a href="javascript:void(0)" class="cancel_editable_mode" title="Cancel"><i class="icon-cancel-square fa-2x"></i></a></div><ul class="toggled_action"><li><a href="javascript:void(0)" title="remove" class="remove"><i class="far fa-trash-alt  fa-2x"></i></a></li><li><a href="javascript:void(0)" title="edit" class="edit"><i class="icon-stats-bars2  fa-2x"></i></a></li><li><a href="javascript:void(0)" title="edit" class="edit"><i class="far fa-edit  fa-2x"></i></a></li></ul></div>';

  if ($(this).parents().eq(1).find("td input").val() != "") {
    //Append the new Row
    $(this).closest(".editable_table").find("tbody").append(new_row);

    //replace the last column with edit toolbar
    $(".new-row .save_editable_mode").replaceWith(edit_column);
    $(".new-row .tax-save").append(warning_msg);

    //Make all input fileds disabled
    $(".new-row input").prop("disabled", true);

    //change the status behaviour  "FOR TAX TABLE"

    if ($(".tax-status input").is(":checked")) {
      $(".new-row .tax-status").children().remove();
      $(".new-row .tax-status").append('<input disabled  type="text" class="form-input-styled uniform-input text" value="Active " placeholder="status">');
    } else {
      $(".new-row .tax-status").children().remove();
      $(".new-row .tax-status").append('<input disabled  type="text" class="form-input-styled uniform-input text" value="Inactive " placeholder="status">');
    }
    $(".new-row").removeClass("new-row");
  }
  $(".warning-msg").css("width", $(this).parents("table").outerWidth(true));
});

$(document).ready(function() {
  function tableWarningMsg() {
    $(".warning-msg").each(function(e) {
      $(this).css("width", $(this).parents("table").width());
    });
  }
  tableWarningMsg();
  $(".fa-edit").click(function() {
    tableWarningMsg()
  });


  if($('.section-devider').length >0){
	$('.section-devider span.select2,.section-devider input').each(function(){
		$(this).parent('div').width($(this).width())
	})
}

});

$(document).on("click", " .cancel_editable_mode", function() {
  if ($(this).parents("tr").hasClass("inEditMode")) {
    $(this).parents("tr").removeClass("inEditMode");
    $(this).parents("tr").find("input,select,textarea").prop("disabled", true);
    //$(this).parents('tr').find('.toggled_action').fadeOut(150);
  }
});



//Radios Button RELATED ELEMENTS
$('input[type="radio"]').change(function() {
  var input_name = $(this).attr("name");
  var input_rel_data = $(this).attr("data-input");

  if ($(this).is(":checked") && $(this).hasClass("related-input")) {
    if ($('*:not(input)[data-input="' + input_rel_data + '"]').length > 0) {
      //disable all input field for the same radion name
      $("." + input_name).find("input").prop("disabled", true);
      $("." + input_name).removeClass("activate-sort");

      //enable  all input field for the clicked  radio
      $('div[data-input="' + input_rel_data + '"] input').prop("disabled", false);
      $('div[data-input="' + input_rel_data + '"]').addClass("activate-sort");
    }
    //not all radio has realted input field
  } else if (typeof input_rel_data === "undefined") {
    if ($('*:not(input)[data-input="' + input_name + '"]').length > 0) {
      $('*[data-input="' + input_name + '"] input').prop("disabled", true);
    }
  }
});

function addNumber(e) {

  var rowBody = e.parents('tbody');
  var appended_row = rowBody.find('tr.hidden').clone();
  var cloned_row = rowBody.find('tr.get-data').clone();
  $(appended_row).find('td').each(function(index) {
    if (cloned_row.find('td').eq(index).children().first().prop('tagName') == 'SELECT') {
      $(this).find('label').text($.trim(cloned_row.find('td').eq(index).find(' select option:selected').text()));
    } else {
      $(this).find('label').text($.trim(cloned_row.find('td').eq(index).children().val()));
    }

  });
  $(appended_row).removeClass('hidden').addClass('new-number');
  rowBody.append(appended_row)

}

function deleteNumber(e) {
  e.parents('tr').remove()
}

function changeSelectedManager() {
  $('.manager-select > option:selected').each(function(index, value) {
    var em_name = $(this).attr('value');
    var em_position = $(this).attr('data-position');
    var em_profile = $(this).attr('data-href');

    if (!$('.parent div.manager-profile[data-index="' + index + '"]').length > 0) {
      $(this).parents('.parent').append('<div data-id="' + em_name + ' ' + em_position + '" data-index="' + index + '" class="dis-flex p-2 manager-profile"> <a target="_blank" href="' + em_profile + '">  ' + em_name + '</a> , <span>' + em_position + '</span></div> ')
    }
  });

}
$(document).on("click", ".select2-selection__choice__remove", function(e) {
  var selected_title = $(this).parents('li').attr('title');
  $('.manager-profile').each(function() {

    if ($.trim(selected_title) == $.trim($(this).attr('data-id'))) {
      $(this).remove();
    }
  })

});
$(document).on("change", ".manager-select ", function(e) {
  changeSelectedManager();
})
// $(document).on("click", ".manager-profile span ", function (e) {
//   $(this).parent().parent().find('select').removeClass('hide-manager')
//   $(this).parent().remove();
// })

changeSelectedManager()

//NEW EDIT TABLE FUNCTIONS ;

// if the table has Add Row feature , and if user change the add row values
$('table').each(function() {
  $(this).find('tr.add-row td:not(last-child)').each(function(index, value) {
    //$('tr.add-row td:not(last-child)').each(function (index, value) {
    $(this).on('click', function() {

      $(this).find('input:not(.select2-search__field)').on('blur click', function() {
        var new_changed_value = $(this).val();
        $(this).parents('tr').siblings('tr.edt-row').find('td').eq(index).text(new_changed_value)
      })
      $(document).on('click', 'table .select2-selection__choice__remove', function() {

        $(this).parents('.select2-container').prev('select').change()

      });
      $(this).find('select').change(function() {
        // change the hidden table values that we insert it in the datatable table ;

        if ($(this).prop('multiple')) {
          var selected_option = "";
          for (i = 0; i < $(this).val().length; i++) {
            if (i > 0) {
              selected_option += ", " + $(this).val()[i];
            } else {
              selected_option += $(this).val()[i];
            }
          }
          $(this).parents('tr').siblings('tr.edt-row').find('td').eq(index).text(selected_option)
        } else {
          var selected_option = $(this).find('option:selected').text();
          $(this).parents('tr').siblings('tr.edt-row').find('td').eq(index).text(selected_option)
        }

      })

    })
  })
})

$(document).on("click", ".editable-content", function(e) {

  // define the save and cancle options
  var edit_options = '<div class="save-edit-touch"><a class="save" title="save" onclick="saveRowTouch($(this))" href="javascript:void(0)"><i class="icon-floppy-disk mr-1 fa-2x"></i></a><a href="javascript:void(0)" class="cancel" onclick="cancleEditRowTouch($(this))" title="Cancel"><i class="icon-cancel-square fa-2x"></i></a></div>'
  var counter = 0;

  // check if the current td doesn't have any children "just text"
  if ($(this).find('input').length == 0) {

    var td_text = $.trim($(this).text())
    // to cancl editing functionality  we should add the old value as an attribute
    $(this).attr('data-before', td_text);
    // empty the td
    $(this).empty();
    // append input field cntain the old value
    $(this).append('<input value="' + td_text + '" class="form-control text-center"/>');
    // show the edit option's if the user change it
    $(this).find('input').on('keypress', function() {

      if (counter == 0) {
        $(this).parent().append(edit_options);
        counter++
      }

    })
  }
});

function editRow(e) {

  // DEfine the clicked row
  var current_row = e.parents("tr.edt-row");
  if(current_row.parents('table').hasClass('table-fixed')){
    current_row.parents('table').attr('data-before','table-fixed');
    current_row.parents('table').removeClass('table-fixed')
  }
  current_row.find('td:not(:last-child)').each(function(index, value) {
    $(this).attr('data-before', $(this).text())
  });
  // Add class edt-mode to enable the UI design
  current_row.addClass("edt-mode");
  // Removing the active class to hide the edit options
  $('.edt-tbl-opt').removeClass('active');
  current_row.find('td:not(.not-edtbl):not(:last-child)').each(function(index, value) {
    var new_val = $.trim($(this).text());
    if ($(this).parents('.current-data-table').find('.add-row').length > 0) {

      var get_td_type = $(this).parents('.current-data-table').find('.add-row td:not(:last-child)');
      var new_td = get_td_type.eq(index).html();
      if (get_td_type.eq(index).children().first().prop('tagName') == 'SELECT' &&
      get_td_type.eq(index).children().first().prop('multiple')) {

        var originalSelect = get_td_type.eq(index).children().first().clone();

        var multiValues = new_val.split(',').map(function(item) {
          return item.trim();
        });
        $(originalSelect).find("option").prop("selected", false);


        $(this).empty().append(originalSelect);
        $(this).find('select').select2();
        $(this).find('select').val(multiValues).trigger("change");

      } else if (get_td_type.eq(index).children().first().prop('tagName') == 'SELECT') {

        $(this).empty().append($(new_td).val(new_val));


      } else {
        if (get_td_type.eq(index).children().first().is(':checkbox')) {

          if (new_val == "on") {
            var newChecbox = get_td_type.eq(index).children().first().clone().attr('id', 'dynamic-' + index).attr('value', 'on').prop('checked', true);
          } else {
            var newChecbox = get_td_type.eq(index).children().first().clone().attr('id', 'dynamic-' + index).attr('value', 'off').prop('checked', false);
          }
          var newLable = get_td_type.eq(index).children().last().clone().attr('for', 'dynamic-' + index);

          $(this).empty().append(newChecbox).append(newLable);
        } else {
          new_td = $(new_td).val(new_val);
          $(this).empty().append(new_td);
        }

      }
    } else {
      $(this).empty();
      $(this).append('<input type="text" value="' + new_val + '" class="" >');

    }

  });

}

function cancleEditRow(e) {

  var current_row = e.parents("tr.edt-row");
  if(current_row.parents('table').attr('data-before') !=""){
    current_row.parents('table').addClass(current_row.parents('table').attr('data-before'))
  }
  current_row.find('td:not(.not-edtbl):not(:last-child)').each(function(index, value) {

    $(this).html($(this).attr('data-before'))
  })
  current_row.removeClass("edt-mode");
  appendPopUpInfo()
}

function saveRow(e) {
  // DEfine the clicked row
  var current_row = e.parents("tr.edt-row");
  if(current_row.parents('table').attr('data-before') !=""){
    current_row.parents('table').addClass(current_row.parents('table').attr('data-before'))
  }

  current_row.find('td:not(.not-edtbl):not(:last-child) >*:first-child').each(function(index, value) {

    if ($(this).prop('multiple') && $(this).prop('tagName') == "SELECT") {
      var selected_option = "";
      for (i = 0; i < $(this).val().length; i++) {
        if (i > 0) {
          selected_option += ", " + $(this).val()[i];
        } else {
          selected_option += $(this).val()[i];
        }
      }
      $(this).parent().html(selected_option);

    } else if ($(this).prop('tagName') == "SELECT") {
      var selected_option = $(this).parent().find('select > option:selected').text();
      $(this).parent().html(selected_option);
      $(this).parent().children().remove();

    } else {
      if ($(this).is(':checkbox')) {
        if ($(this).is(':checked')) {
          $(this).parent().html('on');
          $(this).parent().children().remove()
        } else {
          $(this).parent().html('off');
          $(this).parent().children().remove()
        }

      } else {
        $(this).parent().html(value.value);
        $(this).parent().children().remove()
      }
    }

    appendPopUpInfo()

  });

  // Add class edt-mode to enable the UI design
  current_row.removeClass("edt-mode");

  current_row.parents('*[class="data-table-js"]').DataTable().row(current_row).invalidate().draw(true);



}



function deleteRow(e) {

  e.parents("tr").remove();
}

function cancleEditRowTouch(e) {

  var current_td = e.parents("td");
  var current_div = e.parents(".editable-content");
  current_div.html(current_div.attr('data-before'))
}

function saveRowTouch(e) {

  // DEfine the clicked row
  var current_row = e.parents("tr");
  var current_col = e.parents("td");
  var current_div = e.parents(".editable-content");

  current_div.find('*:first-child').each(function(index, value) {
    if ($(this).prop('tagName') == "SELECT") {
      var selected_option = $(this).parent().find('select > option:selected').text();
      $(this).parent().html(selected_option);
      $(this).parent().children().remove()
    } else {
      $(this).parent().html(value.value);
      $(this).parent().children().remove()
    }

  });

  $('.data-table-js').DataTable().row(current_row).invalidate().draw(true);

}

function editOption(e) {
  e.parents(".edt-tbl-opt").toggleClass("active");
}

/*********************************************/
if ($('.data-table-js').length > 0) {
  $('.data-table-js').init(function() {
    var tbl_cntrl = $('#table-control').clone();
    $('#table-control').remove();
    tbl_cntrl.insertAfter($('.dataTables_filter'));
  })
  var table;
  $(".data-table-js").on("mousedown", "td .fa-trash-alt", function(e) {
    table.row($(this).closest("tr")).remove().draw();
  })

  table = $('.data-table-js:not(.touch-edit)').DataTable({
    aoColumnDefs: [{
      bSortable: false,
      aTargets: [-1]
    }],
    "orderCellsTop" : true
  })
  $('.touch-edit').DataTable({})
  // add row
  $('#addRow').click(function(e) {
    e.preventDefault();
    var rowHtml = $(".data-table-js").find("tr")[1].outerHTML
    table.row.add($(rowHtml)).draw(true);
    appendPopUpInfo()
  });
}else{
  $('#addRow').click(function(e) {
    e.preventDefault();
    var rowHtml = $(this).parents('table').find('thead tr.hidden').clone();
    $(this).parents('table').find('tbody').append(rowHtml)
  });
}

//////////////////////////////////
if ($('.data-table-js-2').length > 0) {
  var table2;
  $(".data-table-js-2").on("mousedown", "td .fa-trash-alt", function(e) {
    table2.row($(this).closest("tr")).remove().draw();
  })

  table2 = $('.data-table-js-2:not(.touch-edit)').DataTable({
    aoColumnDefs: [{
      bSortable: false,
      aTargets: [-1]
    }]
  })

  // add row
  $('#addRow-2').click(function(e) {
    e.preventDefault();
    var rowHtml2 = $(this).parents("#newRow-2").find("tr")[0].outerHTML
    table2.row.add($(rowHtml2)).draw(true);
  });
}
function loadPartial() {
    Dropdowns.initComponents();
    $('.warning-msg').each(function (e) {
        $(this).css('width', $(this).parents('table').width())
    });

}



$(function () {
  //we need to replace the href to void(0) when using this class
  $('.dropdown-toggle-open').on('click', function (event) {
    $('.dropdown-menu-open').slideToggle();
    event.stopPropagation();
  });

  $('.dropdown-menu-open').on('click', function (event) {
    event.stopPropagation();
  });

  $(window).on('click', function () {
    $('.dropdown-menu-open').slideUp();
  });

});
