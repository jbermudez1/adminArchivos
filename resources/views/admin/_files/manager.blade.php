<!-- Inner Sidebar -->
<div id="page-content-sidebar">
    <!-- Collapsible Options -->
    <a href="javascript:void(0)" class="btn btn-block btn-default visible-xs" data-toggle="collapse" data-target="#media-options">Categorias</a>
    <div id="media-options" class="collapse navbar-collapse remove-padding">
        <!-- Filter -->
        <div class="block-section">
            <h4 class="inner-sidebar-header">
                <a href="#modal-create" class="btn btn-xs btn-default pull-right" data-toggle="modal"><i class="fa fa-plus"></i></a>
                Categorias
            </h4>
            <!-- Filter by Type links -->
            <!-- Custom files functionality is initialized in js/pages/appMedia.js -->
            <!-- Add the category value you want each link in .media-filter to filter out in its data-category attribute. Add the value 'all' to show all items -->
            <ul class="nav nav-pills nav-stacked nav-icons media-filter">
                @foreach($categories as $key => $value)
                    <li>
                        <a href="javascript:void(0)" data-category="{{ $key }}">
                            <i data-category_id = "{{ $key }}" data-color="{{ $color_categories[$key] }}" class="fa fa-fw fa-folder text-{{ $color_categories[$key] }} icon-push"></i> <strong>{{ $value }}</strong>
                        </a>
                    </li>
                @endforeach
            </ul>
            <!-- END Filter by Type links -->
        </div>
        <!-- END Filter -->
    </div>
    <!-- END Collapsible Options -->
</div>
<!-- END Inner Sidebar -->

<!-- Media Box Content -->
<!-- Add the category value for each item in its data-category attribute (for the filter functionality to work) -->
<div id="list-files" class="row media-filter-items">
    @foreach($files as $file )
        @include('admin._files.file',[
            'file' => $file,
            'color' => $color_categories[$file->id_category]
        ])
    @endforeach
</div>

@include('admin._files.upload',compact('fields'))

<!-- END Media Box Content -->
{!! HTML::script('app/admin/admin_files.js') !!}
{!! HTML::script('app/admin/files.js') !!}
<script>
    $(function(){
        Files.init();
    });
</script>