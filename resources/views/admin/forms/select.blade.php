<div class="form-group">
    <label class="col-md-3 control-label" for="{{ $name }}">{{ $label }}</label>
    <div class="col-md-9">
        {!! Form::select($name,$list,$value,['class'=>'select-chosen form-control']) !!}
    </div>
</div>