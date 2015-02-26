<!-- Inner Sidebar -->
<div id="page-content-sidebar">
    <!-- Collapsible Options -->
    <a href="javascript:void(0)" class="btn btn-block btn-default visible-xs" data-toggle="collapse" data-target="#media-options">Categorias</a>
    <div id="media-options" class="collapse navbar-collapse remove-padding">
        <!-- Filter -->
        <div class="block-section">
            <h4 class="inner-sidebar-header">
                <a href="javascript:void(0)" class="btn btn-xs btn-default pull-right"><i class="fa fa-plus"></i></a>
                Categorias
            </h4>
            <!-- Filter by Type links -->
            <!-- Custom files functionality is initialized in js/pages/appMedia.js -->
            <!-- Add the category value you want each link in .media-filter to filter out in its data-category attribute. Add the value 'all' to show all items -->
            <ul class="nav nav-pills nav-stacked nav-icons media-filter">
                <li class="active">
                    <a href="javascript:void(0)" data-category="0">
                        <i class="fa fa-fw fa-folder text-primary icon-push"></i> <strong>Todos</strong>
                    </a>
                </li>
                @foreach($categories as $key => $value)
                    <li>
                        <a href="javascript:void(0)" data-category="{{ $key }}">
                            <i class="fa fa-fw fa-folder text-{{ $color_categories[$key] }} icon-push"></i> <strong>{{ $value }}</strong>
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
<div class="row media-filter-items">
    @foreach($files as $file )
        <div class="col-sm-4 col-lg-3">
            <div class="media-items animation-fadeInQuick2" data-category="{{ $file->id_category }}">
                <div class="media-items-options text-right">
                    <a href="javascript:void(0)" class="btn btn-xs btn-success"><i class="fa fa-download"></i></a>
                </div>
                <div class="media-items-content">
                    <i class="fa fa-file-archive-o fa-5x text-{{ $color_categories[$file->id_category] }}"></i>
                </div>
                <h4>
                    <strong>{!! $file->name !!}</strong>.{!! $file->type !!}<br>
                    <small>{!! $file->category->name !!}</small><br/>
                    <small>3 hours ago</small>
                </h4>
            </div>
        </div>
    @endforeach
</div>

@include('admin._files.upload')

<!-- END Media Box Content -->
{!! HTML::script('app/admin/admin_files.js') !!}
<script>
    $(function(){
        Files.init();
    })
</script>