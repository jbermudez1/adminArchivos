
<div class="form-group">
    <label class="col-md-3 control-label">{{ $label }}</label>
    <div class="col-md-6">
        <div class="holder" style="background: url('{{ $src }}'); background-size: cover;">
            @if($src=='')
                <i class="fa fa-camera holder-image"></i>
            @endif
        </div>
        <div class="input-group">
            <span class="input-group-btn">
                <span class="btn btn-{{ $class }} btn-file">
                    Buscar&hellip; <input type="file" name="{{ $name}}" >
                </span>
            </span>
            <input type="text" class="form-control" value="{{ $src }}" readonly>
        </div>
    </div>
</div>