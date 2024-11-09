$(document).ready(function() {
  
  (function() {
    // Input Events
    var $input = $('.form-control.fillable');

    $input.each(checkIfFilled);
    $input.on('blur', checkIfFilled);
    $input.on('keydown', checkIfFilled);

    function checkIfFilled() {
      var $self = $(this);
      var $parent = $self.parent();
      var selfHasValue = $.trim($self.val());
      var parentIsFilled = $parent.hasClass('filled');

      if (selfHasValue) {
        $parent.addClass('filled');
      } else if(parentIsFilled) {
        $parent.removeClass('filled');
      }
    }
    
    // Check Slots Controller
    var $addSlotForm = $('#add-check-slot');
    var $removeSlotButton = $('.remove-check-slot');
    var $slotsQuantity = $('.checks-quantity');
    var $slotsContainer = $('.payment__checks__detail__body');
    var $emptySlotHTML = $('.payment__checks__detail__body__slot').html();
    var emptySlot = '<div class="payment__checks__detail__body__slot fw-row">' + $emptySlotHTML + '</div>';
    
    $addSlotForm.on('submit', addSlots);
    $removeSlotButton.on('click', removeASlot);
    
    function refresh() {
      countSlots();
      refreshSelectors();
      refreshEventListeners();
    }
    
    function addSlots(event) {
      event.preventDefault();
      var $slotsToAddField = $('#checks-quantity');
      var slotsToAdd = $slotsToAddField.val();
      
      for (var i = 0; i < slotsToAdd; i += 1) {
        addASlot();
      }
      
      $slotsToAddField.val(1);
    }
    
    function addASlot() {
      var $lastSlot = $slotsContainer.children().last();
      var $lastSlotCells = $lastSlot.children();
      var lastSlotInputValues = [];
      var $emptySlotCells = $($(emptySlot)[0]).children();
      var slotElementContainer = document.createElement('div');
      
      slotElementContainer.classList.add('payment__checks__detail__body__slot', 'fw-row');
      
      $lastSlotCells.each(function() {
        var $lastSlotInput = $(this).find('.form-control');
        lastSlotInputValues.push($lastSlotInput.val());
      });
      
      $emptySlotCells.each(function(i) {
        $(this).find('.form-control').val(lastSlotInputValues[i]);
        var input = $(this).find('.form-control');
        var hasValue = $.trim(input.val());
        if (hasValue) input.parent().addClass('filled');
      });
      
      var $replicatedSlot = $(slotElementContainer).append($emptySlotCells);
      
      $slotsContainer.append($replicatedSlot);
      refresh();
    }
    
    function removeASlot() {
      var $selfSlot = $($(this).parents('.payment__checks__detail__body__slot'));
      $selfSlot.html('').remove();
      refresh();
    }
    
    function countSlots() {
      $slotsQuantity.text($slotsContainer.children().length);
    }
    
    function refreshSelectors() {
      // Inputs selector
      $input = $('.form-control.fillable');
      // Remove slot buttons selector
      $removeSlotButton = $('.remove-check-slot');
      $slotsContainer = $('.payment__checks__detail__body');
    }
    
    function refreshEventListeners() {
      // Inputs events
      $input.on('blur', checkIfFilled);
      $input.on('keydown', checkIfFilled);
      // Remove slots event
      $removeSlotButton.on('click', removeASlot);
    }
    
  })();
});