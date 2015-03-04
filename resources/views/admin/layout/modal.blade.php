<div id=@yield('modal-id',' ') class="modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h3 class="modal-title"><strong>@yield('modal-title')</strong></h3>
            </div>
            <div class="modal-body">
                @yield('modal-body')
            </div>
            <div class="modal-footer">
                <div class="row ">
                    <div class="col-md-6 ">
                        <div class="alert not-visible"></div>
                    </div>
                    <div class="col-md-6 ">
                        @yield('modal-footer')
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>