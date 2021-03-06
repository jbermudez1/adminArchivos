<div id="file-{{ $file->id }}" class="col-sm-4 col-lg-3">
    <div class="media-items animation-fadeInQuick2" data-category="{{ $file->id_category }}">
        <div class="media-items-options text-right">
            <a href="{{ action('FilesController@getDownload', $file->id) }}" class="btn btn-xs btn-success"><i class="fa fa-download"></i></a>
            @if(\Auth::user()->type=="administrator")
                <a href="#" data-id="{{ $file->id }}" class="btn btn-xs btn-danger delete-file"><i class="fa fa-trash-o"></i></a>
            @endif
        </div>
        <div class="media-items-content">
            <i class="fa fa-file-pdf-o fa-5x text-{{ $color }}"></i>
        </div>
        <h4>
            <strong>{!! $file->name !!}</strong>.{!! $file->type !!}<br>
            <small>{!! $file->category->name !!}</small><br/>
            <small>{!! $file->diff_create !!}</small>
        </h4>
    </div>
</div>