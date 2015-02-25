<div class="form-group">
    <label class="col-sm-3 control-label" for="{{ $name }}">{{ $label }}</label>
    <div class="col-sm-9">
        <label class="switch switch-{{ $class }}"><input type="checkbox" name="{{ $name }}"   @if($value) {{"checked"}} @endif><span></span></label>
    </div>
</div>